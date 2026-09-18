import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home/index.vue'),
        meta: { title: '首页', headerTransparent: true, headerInk: 'light' }
      },
      {
        path: '/en',
        name: 'HomeEn',
        component: () => import('@/views/Home/index.vue'),
        meta: { title: 'Home', headerTransparent: true, headerInk: 'light' }
      },
      {
        path: '/ai-development',
        name: 'AiDevelopment',
        component: () => import('@/views/ServiceLanding.vue'),
        meta: { title: 'AI开发', headerInk: 'dark' }
      },
      {
        path: '/ai-consultation',
        name: 'AiConsultation',
        component: () => import('@/views/AiConsultation/index.vue'),
        meta: { title: 'AI咨询', headerInk: 'dark' }
      },
      {
        path: '/app-development',
        name: 'AppDevelopment',
        component: () => import('@/views/ServiceLanding.vue'),
        meta: { title: 'App 开发', headerInk: 'dark' }
      },
      {
        path: '/iot-development',
        name: 'IotDevelopment',
        component: () => import('@/views/ServiceLanding.vue'),
        meta: { title: '物联网开发', headerInk: 'dark' }
      },
      {
        path: '/miniprogram-development',
        name: 'MiniprogramDevelopment',
        component: () => import('@/views/ServiceLanding.vue'),
        meta: { title: '小程序开发', headerInk: 'dark' }
      },
      {
        path: '/web-development',
        name: 'WebDevelopment',
        component: () => import('@/views/ServiceLanding.vue'),
        meta: { title: 'WEB 网站开发', headerInk: 'dark' }
      },
      {
        path: '/digital-creativity',
        name: 'DigitalCreativity',
        component: () => import('@/views/ServiceLanding.vue'),
        meta: { title: '数字创意', headerInk: 'dark' }
      },
      {
        path: '/cases',
        name: 'Cases',
        component: () => import('@/views/Cases/index.vue'),
        meta: { title: '公司案例', headerInk: 'dark' }
      },
      {
        path: '/cases/:id',
        name: 'CaseDetail',
        component: () => import('@/views/Cases/detail.vue'),
        meta: { title: '案例详情', headerInk: 'light' }
      },
      {
        path: '/custom-development',
        name: 'CustomDevelopment',
        component: () => import('@/views/ServiceLanding.vue'),
        meta: { title: '定制开发', headerInk: 'dark' }
      },
      { path: '/en/ai-consultation', name: 'AiConsultationEn', component: () => import('@/views/AiConsultation/index.vue'), meta: { title: 'AI consultation', headerInk: 'dark' } },
      ...[
        ['ai-development','AiDevelopmentEn','AI development'],['miniprogram-development','MiniprogramDevelopmentEn','Mini program development'],['app-development','AppDevelopmentEn','App development'],['web-development','WebDevelopmentEn','Web development'],['iot-development','IotDevelopmentEn','IoT solutions'],['digital-creativity','DigitalCreativityEn','Digital creative'],['custom-development','CustomDevelopmentEn','Custom software']
      ].map(([slug,name,title]) => ({ path: `/en/${slug}`, name, component: () => import('@/views/ServiceLanding.vue'), meta: { title, headerInk: 'dark' } })),
      ...[
        ['/en/cases','CasesEn','Cases','dark',() => import('@/views/Cases/index.vue')],
        ['/en/cases/:id','CaseDetailEn','Case detail','light',() => import('@/views/Cases/detail.vue')],
        ['/en/news','NewsEn','News','dark',() => import('@/views/News/index.vue')],
        ['/en/news/:id','NewsDetailEn','News detail','light',() => import('@/views/News/detail.vue')],
        ['/en/about','AboutEn','About','dark',() => import('@/views/About/index.vue')],
        ['/en/contact','ContactEn','Contact','dark',() => import('@/views/Contact/index.vue')],
        ['/en/privacy-policy','PrivacyPolicyEn','Privacy policy','dark',() => import('@/views/PrivacyPolicy.vue')],
        ['/en/legal-statement','LegalStatementEn','Legal statement','dark',() => import('@/views/LegalStatement.vue')]
      ].map(([path,name,title,headerInk,component]) => ({ path, name, component, meta: { title, headerInk } })),
      {
        path: '/news',
        name: 'News',
        component: () => import('@/views/News/index.vue'),
        meta: { title: '行业资讯', headerInk: 'dark' }
      },
      {
        path: '/news/:id',
        name: 'NewsDetail',
        component: () => import('@/views/News/detail.vue'),
        meta: { title: '资讯详情', headerInk: 'light' }
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/views/About/index.vue'),
        meta: { title: '关于我们', headerInk: 'dark' }
      },
      {
        path: '/contact',
        name: 'Contact',
        component: () => import('@/views/Contact/index.vue'),
        meta: { title: '联系我们', headerInk: 'dark', headerTransparent: true }
      },
      {
        path: '/privacy-policy',
        name: 'PrivacyPolicy',
        component: () => import('@/views/PrivacyPolicy.vue'),
        meta: { title: '隐私政策', headerInk: 'dark' }
      },
      {
        path: '/legal-statement',
        name: 'LegalStatement',
        component: () => import('@/views/LegalStatement.vue'),
        meta: { title: '法律声明', headerInk: 'dark' }
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/NotFound.vue'),
        meta: { title: '页面不存在', headerInk: 'dark' }
      },
      {
        path: '/en/:pathMatch(.*)*',
        name: 'NotFoundEn',
        component: () => import('@/views/NotFound.vue'),
        meta: { title: 'Page not found', headerInk: 'dark' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  if (to.path.length > 1 && to.path.endsWith('/')) {
    next({ path: to.path.replace(/\/+$/, ''), query: to.query, hash: to.hash, replace: true })
    return
  }
  const isEnglish = to.path === '/en' || to.path.startsWith('/en/')
  if (to.meta.title) {
    document.title = `${to.meta.title} - ${isEnglish ? 'Beijing Yunzhan Technology' : '北京耘栈科技'}`
  }
  document.documentElement.lang = isEnglish ? 'en' : 'zh-CN'
  next()
})

export default router
