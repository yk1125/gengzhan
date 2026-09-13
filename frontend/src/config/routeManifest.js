export const routeManifest = {
  home: { zh: '/', en: '/en' },
  contact: { zh: '/contact', en: '/en/contact' },
  ai: { zh: '/ai-consultation', en: '/en/ai-consultation' }
}
export function localizeRoute ({ routeKey, params = {}, query = {}, hash = '', locale = 'zh-CN' }) {
  const route = routeManifest[routeKey]
  if (!route || !['zh-CN', 'en'].includes(locale)) throw new Error('Unknown route or locale')
  return { path: locale === 'en' ? route.en : route.zh, params, query, hash }
}
