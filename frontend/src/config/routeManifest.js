export const routeManifest = {
  home: { zh: '/', en: '/en', names: ['Home', 'HomeEn'] },
  'service.ai': { zh: '/ai-development', en: '/en/ai-development', names: ['AiDevelopment', 'AiDevelopmentEn'] },
  'service.mini': { zh: '/miniprogram-development', en: '/en/miniprogram-development', names: ['MiniprogramDevelopment', 'MiniprogramDevelopmentEn'] },
  'service.app': { zh: '/app-development', en: '/en/app-development', names: ['AppDevelopment', 'AppDevelopmentEn'] },
  'service.web': { zh: '/web-development', en: '/en/web-development', names: ['WebDevelopment', 'WebDevelopmentEn'] },
  'service.iot': { zh: '/iot-development', en: '/en/iot-development', names: ['IotDevelopment', 'IotDevelopmentEn'] },
  'service.creative': { zh: '/digital-creativity', en: '/en/digital-creativity', names: ['DigitalCreativity', 'DigitalCreativityEn'] },
  'service.custom': { zh: '/custom-development', en: '/en/custom-development', names: ['CustomDevelopment', 'CustomDevelopmentEn'] },
  cases: { zh: '/cases', en: '/en/cases', names: ['Cases', 'CasesEn'] },
  'case.detail': { zh: '/cases/:id', en: '/en/cases/:id', names: ['CaseDetail', 'CaseDetailEn'] },
  news: { zh: '/news', en: '/en/news', names: ['News', 'NewsEn'] },
  'news.detail': { zh: '/news/:id', en: '/en/news/:id', names: ['NewsDetail', 'NewsDetailEn'] },
  company: { zh: '/about', en: '/en/about', names: ['About', 'AboutEn'] },
  contact: { zh: '/contact', en: '/en/contact', names: ['Contact', 'ContactEn'] },
  ai: { zh: '/ai-consultation', en: '/en/ai-consultation', names: ['AiConsultation', 'AiConsultationEn'] },
  privacy: { zh: '/privacy-policy', en: '/en/privacy-policy', names: ['PrivacyPolicy', 'PrivacyPolicyEn'] },
  legal: { zh: '/legal-statement', en: '/en/legal-statement', names: ['LegalStatement', 'LegalStatementEn'] },
  notFound: { zh: '/:pathMatch(.*)*', en: '/en/:pathMatch(.*)*', names: ['NotFound', 'NotFoundEn'] }
}
export function localizeRoute ({ routeKey, params = {}, query = {}, hash = '', locale }) {
  const route = routeManifest[routeKey]
  if (!Object.hasOwn(routeManifest, routeKey) || !['zh-CN', 'en'].includes(locale)) throw new Error('Unknown route or locale')
  if (typeof hash !== 'string' || (hash && !hash.startsWith('#'))) throw new Error('Hash must be empty or start with #')
  return { name: route.names[locale === 'en' ? 1 : 0], params, query, hash }
}
