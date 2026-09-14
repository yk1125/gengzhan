import { defineStore } from 'pinia'

/**
 * 主题（亮 / 暗）—— 全站唯一入口。
 *
 * AGENTS 不变量：当地时间 19:00—07:00 为暗、页头两态按钮；手动选择生效到**下一个边界**
 * 到期，不照抄参考站的 08:00 规则。于是有两个来源：
 *   - clock：按当地时间算（>= 19:00 或 < 07:00 为暗）
 *   - manual：用户在页头两态按钮上选的，记 localStorage，到下一个边界（07:00 / 19:00）失效
 * 手动选择到期后自动交回当地时间（见 syncFromClock + armBoundaryRefresh）。
 */

/** 当地时间几点转暗 / 转亮。 */
export const DARK_FROM_HOUR = 19
export const LIGHT_FROM_HOUR = 7

const STORAGE_KEY = 'yz-theme'
const HOUR_MS = 60 * 60 * 1000
const DAY_MS = 24 * HOUR_MS

/** 按当地时间判断此刻应该是暗还是亮。 */
export function themeFromClock (now = new Date()) {
  const hour = now.getHours()
  return hour >= DARK_FROM_HOUR || hour < LIGHT_FROM_HOUR ? 'dark' : 'light'
}

/** 下一个边界（今天/明天的 07:00 或 19:00）的时间戳——手动选择在这一刻到期。 */
export function nextBoundary (now = new Date()) {
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  if (now.getHours() < LIGHT_FROM_HOUR) return midnight + LIGHT_FROM_HOUR * HOUR_MS
  if (now.getHours() < DARK_FROM_HOUR) return midnight + DARK_FROM_HOUR * HOUR_MS
  return midnight + DAY_MS + LIGHT_FROM_HOUR * HOUR_MS
}

function readSaved () {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const saved = JSON.parse(raw)
    const okTheme = saved && (saved.theme === 'dark' || saved.theme === 'light')
    return okTheme && typeof saved.expiresAt === 'number' ? saved : null
  } catch (error) {
    // 隐私模式 / 损坏的存档：忽略，回落当地时间。
    return null
  }
}

function writeSaved (value) {
  try {
    if (value) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
    else window.localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    // 同上：写不进去也不影响本次会话。
  }
}

/** 到边界时自动换挡用的定时器（模块级，避免塞进 store state）。 */
let boundaryTimer = null

export const useThemeStore = defineStore('theme', {
  state: () => ({
    theme: 'light',
    /** 'clock' = 跟随当地时间；'manual' = 用户手选、等到 expiresAt。 */
    source: 'clock',
    /** 手动选择的到期时间戳（毫秒）。source === 'clock' 时是下一个边界。 */
    expiresAt: 0,
    initialized: false
  }),
  actions: {
    apply (theme) {
      this.theme = theme
      document.documentElement.dataset.theme = theme
    },
    /** 到边界后把控制权交回当地时间（手动选择未到期则不动）。 */
    syncFromClock () {
      if (this.source === 'manual' && this.expiresAt > Date.now()) return
      writeSaved(null)
      this.source = 'clock'
      this.expiresAt = nextBoundary()
      this.apply(themeFromClock())
    },
    /** 页头两态按钮：亮 ⇄ 暗，写存档，到下个边界到期。 */
    toggle () {
      const theme = this.theme === 'light' ? 'dark' : 'light'
      this.apply(theme)
      this.source = 'manual'
      this.expiresAt = nextBoundary()
      writeSaved({ theme, expiresAt: this.expiresAt })
      this.armBoundaryRefresh()
    },
    /** 挂载前调用（main.js），避免首屏先闪一下错的颜色。 */
    init () {
      const saved = readSaved()
      if (saved && saved.expiresAt > Date.now()) {
        this.apply(saved.theme)
        this.source = 'manual'
        this.expiresAt = saved.expiresAt
      } else {
        writeSaved(null)
        this.apply(themeFromClock())
        this.source = 'clock'
        this.expiresAt = nextBoundary()
      }
      this.initialized = true
    },
    /** 在下一个边界准点再同步一次；每次调用都会重排定时器。 */
    armBoundaryRefresh () {
      if (boundaryTimer) window.clearTimeout(boundaryTimer)
      const delay = Math.max(1000, this.expiresAt - Date.now() + 1000)
      boundaryTimer = window.setTimeout(() => {
        this.syncFromClock()
        this.armBoundaryRefresh()
      }, delay)
    }
  }
})
