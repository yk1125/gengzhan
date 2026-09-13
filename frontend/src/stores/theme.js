import { defineStore } from 'pinia'
export const useThemeStore = defineStore('theme', { state: () => ({ theme: 'light' }), actions: { toggle () { this.theme = this.theme === 'light' ? 'dark' : 'light'; document.documentElement.dataset.theme = this.theme } } })
