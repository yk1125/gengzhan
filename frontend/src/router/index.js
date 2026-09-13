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
        meta: { title: '首页' }
      },
      {
        path: '/ai-development',
        name: 'AiDevelopment',
        component: () => import('@/views/ServiceLanding.vue'),
        meta: { title: 'AI开发' }
      },
      {
        path: '/ai-consultation',
        name: 'AiConsultation',
        component: () => import('@/views/AiConsultation/index.vue'),
        meta: { title: 'AI咨询' }
      },
      {
        path: '/app-development',
        name: 'AppDevelopment',
        component: () => import('@/views/ServiceLanding.vue'),
        meta: { title: 'App开发' }
      },
      {
        path: '/iot-development',
        name: 'IotDevelopment',
        component: () => import('@/views/ServiceLanding.vue'),
        meta: { title: '物联网开发' }
      },
      {
        path: '/miniprogram-development',
        name: 'MiniprogramDevelopment',
        component: () => import('@/views/ServiceLanding.vue'),
        meta: { title: '小程序开发' }
      },
      {
        path: '/web-development',
        name: 'WebDevelopment',
        component: () => import('@/views/ServiceLanding.vue'),
        meta: { title: 'WEB网站开发' }
      },
      {
        path: '/digital-creativity',
        name: 'DigitalCreativity',
        component: () => import('@/views/ServiceLanding.vue'),
        meta: { title: '数字文创' }
      },
      {
        path: '/cases',
        name: 'Cases',
        component: () => import('@/views/Cases/index.vue'),
        meta: { title: '公司案例' }
      },
      {
        path: '/cases/:id',
        name: 'CaseDetail',
        component: () => import('@/views/Cases/detail.vue'),
        meta: { title: '案例详情' }
      },
      {
        path: '/custom-development',
        name: 'CustomDevelopment',
        component: () => import('@/views/ServiceLanding.vue'),
        meta: { title: '定制开发' }
      },
      { path: '/en/ai-consultation', name: 'AiConsultationEn', component: () => import('@/views/AiConsultation/index.vue'), meta: { title: 'AI consultation' } },
      ...[
        ['ai-development','AiDevelopmentEn','AI development'],['miniprogram-development','MiniprogramDevelopmentEn','Mini program development'],['app-development','AppDevelopmentEn','App development'],['web-development','WebDevelopmentEn','Web development'],['iot-development','IotDevelopmentEn','IoT solutions'],['digital-creativity','DigitalCreativityEn','Digital creative'],['custom-development','CustomDevelopmentEn','Custom software']
      ].map(([slug,name,title]) => ({ path: `/en/${slug}`, name, component: () => import('@/views/ServiceLanding.vue'), meta: { title } })),
      {
        path: '/news',
        name: 'News',
        component: () => import('@/views/News/index.vue'),
        meta: { title: '行业资讯' }
      },
      {
        path: '/news/:id',
        name: 'NewsDetail',
        component: () => import('@/views/News/detail.vue'),
        meta: { title: '资讯详情' }
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/views/About/index.vue'),
        meta: { title: '关于我们' }
      },
      {
        path: '/privacy-policy',
        name: 'PrivacyPolicy',
        component: () => import('@/views/PrivacyPolicy.vue'),
        meta: { title: '隐私政策' }
      },
      {
        path: '/legal-statement',
        name: 'LegalStatement',
        component: () => import('@/views/LegalStatement.vue'),
        meta: { title: '法律声明' }
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
  if (to.meta.title) {
    document.title = `${to.meta.title} - 北京耘栈科技`
  }
  next()
})

export default router
