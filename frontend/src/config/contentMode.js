const rawMode = String(import.meta.env.VITE_CONTENT_MODE || '').trim().toLowerCase()
const isPreview = import.meta.env.MODE === 'mock-preview'
const legacyMockEnabled = String(import.meta.env.VITE_ENABLE_MOCK || '').toLowerCase() === 'true'

if (import.meta.env.PROD && rawMode === 'mock' && !isPreview) {
  throw new Error('VITE_CONTENT_MODE=mock is only allowed in an explicit preview build')
}

export const contentMode = rawMode === 'mock' || (isPreview && legacyMockEnabled) ? 'mock' : 'api'
export const isMockMode = contentMode === 'mock'
export const contentSourceLabel = isMockMode
  ? { 'zh-CN': '演示数据：仅用于预览，未连接生产接口', en: 'Demo data: preview only, production APIs are not connected' }
  : null

export function hasMockResource (resource) {
  const configured = String(import.meta.env.VITE_MOCK_RESOURCES || '').split(',').map(item => item.trim()).filter(Boolean)
  return isMockMode && (!configured.length || configured.includes(resource))
}
