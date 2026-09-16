// Facts: PRD section 1. Local asset provenance: handoffs/B.md, T05.
export const companyMedia = {
  office: '/assets/home/statement-bg.jpg',
  certificate: '/services-showcase.jpg'
}

export const companyContent = {
  'zh-CN': {
    name: '耘栈科技',
    fullName: '北京耘栈科技有限公司',
    since: '始于 2015 · 北京',
    tagline: '专注软件研发，让技术服务于真实业务。',
    photoAlt: '北京耘栈科技有限公司办公室品牌墙实拍',
    explore: '认识耘栈',
    intro: {
      eyebrow: '01 / 关于我们',
      title: '从业务出发，\n让每一次交付\n经得起长期使用。',
      paragraphs: [
        '北京耘栈科技成立于 2015 年，是一家专注于软件开发的科技公司。我们为企业提供 AI 应用、小程序、App、网站及业务系统的设计与研发服务。',
        '一个好用的产品，来自对业务的理解，也来自设计与工程的协作。从需求梳理、产品设计到开发测试，我们把复杂的问题拆解成清晰、可验证的交付。',
        '已服务 200+ 企业客户。我们关注产品上线后的持续使用，以规范的研发过程与长期技术支持，陪伴企业推进数字化建设。'
      ]
    },
    facts: [
      { value: '2015', label: '公司成立' },
      { value: '200+', label: '企业客户' },
      { value: '98%', label: '客户满意度' },
      { value: '24/7', label: '技术支持' }
    ],
    services: {
      eyebrow: '02 / 技术服务',
      title: '把业务想法，\n做成可以使用的产品。',
      description: '从智能应用到移动服务，从品牌官网到业务系统，让不同技术能力协同落地。',
      items: [
        { routeKey: 'service.ai', title: 'AI 应用开发', description: '企业知识库、智能助手与业务流程集成，让智能能力进入日常工作。' },
        { routeKey: 'service.mini', title: '小程序开发', description: '围绕微信生态，连接展示、预约、交易与会员服务。' },
        { routeKey: 'service.app', title: 'App 开发', description: '从产品原型到研发上线，构建体验完整的移动应用。' },
        { routeKey: 'service.web', title: '网站与业务系统', description: '品牌官网、企业门户及定制业务平台，兼顾表达与使用效率。' }
      ]
    },
    quality: {
      eyebrow: '03 / 研发质量',
      title: '专业，\n也体现在每一个过程。',
      description: 'CMMI 3 级认证，是公司研发过程管理能力的体现。我们重视需求、项目管理与工程质量控制，让交付过程有章可循，让后续维护有据可依。',
      label: '软件开发能力成熟度三级',
      alt: '耘栈科技 CMMI for Development Maturity Level 3 认证证书',
      caption: 'CMMI for Development · Maturity Level 3',
      open: '查看 CMMI 3 认证证书大图',
      close: '关闭证书大图'
    },
    customers: {
      eyebrow: '04 / 合作伙伴',
      title: '每一次合作，\n都是信任的积累。',
      label: '合作客户标识，共 24 家'
    },
    values: {
      eyebrow: '05 / 合作理念',
      title: '技术有尺度，\n合作有温度。',
      items: [
        { title: '先理解，再创造', description: '理解业务目标、使用场景与现实约束，在动手之前，一起把要解决的问题说清楚。' },
        { title: '设计与技术并行', description: '把用户体验与工程实现放在同一张桌上，让产品既好用，也能稳定运行。' },
        { title: '让过程保持透明', description: '明确需求范围、交付节奏与验收标准，让关键决策和项目进展都有共同依据。' },
        { title: '为长期使用负责', description: '从上线到维护与迭代，关注产品在真实业务中的表现，为未来变化留下空间。' }
      ]
    },
    cta: {
      eyebrow: '与耘栈合作',
      title: '下一步，\n聊聊你的业务。',
      description: '从一个问题、一项需求，或一个正在酝酿的想法开始。',
      action: '开始沟通'
    }
  },
  en: {
    name: 'Yunzhan Technology',
    fullName: 'BEIJING YUNZHAN TECHNOLOGY CO., LTD.',
    since: 'SINCE 2015 · BEIJING',
    tagline: 'Software engineering grounded in real business needs.',
    photoAlt: 'The company brand wall at the Beijing Yunzhan Technology office',
    explore: 'Meet Yunzhan',
    intro: {
      eyebrow: '01 / ABOUT US',
      title: 'Built around your business.\nMade for the long term.',
      paragraphs: [
        'Founded in 2015, Beijing Yunzhan Technology is a software development company. We design and build AI applications, mini programs, mobile apps, websites and business systems for enterprises.',
        'Useful products start with understanding the business and bringing design and engineering together. From requirements and product design to development and testing, we turn complex problems into clear, verifiable deliverables.',
        'We have served more than 200 enterprise clients. With a disciplined development process and ongoing technical support, we help businesses build digital products that remain useful after launch.'
      ]
    },
    facts: [
      { value: '2015', label: 'Founded' },
      { value: '200+', label: 'Enterprise clients' },
      { value: '98%', label: 'Client satisfaction' },
      { value: '24/7', label: 'Technical support' }
    ],
    services: {
      eyebrow: '02 / WHAT WE BUILD',
      title: 'From a business idea\nto a working product.',
      description: 'AI, mobile services, brand websites and business systems, brought together around your goals.',
      items: [
        { routeKey: 'service.ai', title: 'AI applications', description: 'Enterprise knowledge bases, intelligent assistants and workflow integrations for everyday work.' },
        { routeKey: 'service.mini', title: 'Mini programs', description: 'Connect discovery, bookings, transactions and membership services within the WeChat ecosystem.' },
        { routeKey: 'service.app', title: 'Mobile apps', description: 'Complete mobile experiences, from product prototypes through development and launch.' },
        { routeKey: 'service.web', title: 'Websites & business systems', description: 'Brand websites, enterprise portals and custom platforms that balance communication and usability.' }
      ]
    },
    quality: {
      eyebrow: '03 / ENGINEERING QUALITY',
      title: 'Professional standards.\nAt every stage.',
      description: 'Our CMMI Level 3 appraisal reflects our development process management capability. We bring structure to requirements, project management and engineering quality, supporting both delivery and ongoing maintenance.',
      label: 'Development Maturity Level 3',
      alt: 'Yunzhan Technology CMMI for Development Maturity Level 3 appraisal certificate',
      caption: 'CMMI for Development · Maturity Level 3',
      open: 'View the CMMI Level 3 certificate',
      close: 'Close certificate'
    },
    customers: {
      eyebrow: '04 / OUR CLIENTS',
      title: 'Trust, built\none project at a time.',
      label: 'Logos of 24 client companies'
    },
    values: {
      eyebrow: '05 / HOW WE WORK',
      title: 'Thoughtful engineering.\nLasting partnerships.',
      items: [
        { title: 'Understand before building', description: 'We start with business goals, everyday use and practical constraints, agreeing on the problem before creating the solution.' },
        { title: 'Design with engineering', description: 'User experience and technical delivery develop together, so products are both useful and dependable.' },
        { title: 'Keep the process transparent', description: 'Clear scope, delivery milestones and acceptance criteria give everyone a shared basis for decisions and progress.' },
        { title: 'Take the long view', description: 'From launch to maintenance and iteration, we focus on real use and leave room for the business to evolve.' }
      ]
    },
    cta: {
      eyebrow: 'WORK WITH YUNZHAN',
      title: 'Let’s talk about\nyour business.',
      description: 'Start with a problem, a requirement or an idea taking shape.',
      action: 'Start a conversation'
    }
  }
}
