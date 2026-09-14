/**
 * ServiceLanding 双语内容（归属 Session A，本轮按用户 2026-09-15「多语言完善」落地）。
 *
 * 页面级数据与 01 分区文案分别存放：
 * - `serviceLandingEnByPath`：按服务路径覆盖英文 title/subtitle/capabilities/process 等页面数据；
 * - `serviceSectionZh` / `serviceSectionEn`：01 分区里原本写在模板里的标题、卡片与示意看板文案。
 *
 * 中文原文仍以 `views/ServiceLanding.vue` 的 `pages` 为唯一事实来源；
 * 本文件只做英文覆盖与模板静态文案的集中化。
 */

export const serviceLandingEnByPath = {
  '/ai-development': {
    title: 'AI Development',
    subtitle: 'Put intelligent capability into real business, not just demos.',
    capabilityTitle: 'From model capability to business results.',
    statement: 'Turn large models, knowledge and workflows into product capability your organization can keep using.',
    description: 'From use-case discovery and knowledge governance to agent design, launch and iteration, we make AI valuable in real processes.',
    modules: ['Enterprise knowledge base', 'Agent orchestration', 'Model integration', 'Business workflows'],
    capabilities: [
      { title: 'LLM applications', text: 'Connect mainstream models to build conversational, writing, Q&A and content-generation applications.', tags: ['ChatGPT', 'ERNIE Bot', 'Tongyi Qianwen', 'Claude'] },
      { title: 'Enterprise knowledge agents', text: 'Make policies, documents and experience retrievable, citable and continuously maintained.', tags: ['RAG retrieval', 'Document parsing', 'Access control', 'Knowledge ops'] },
      { title: 'Intelligent customer service', text: 'Provide 7×24 intelligent responses for pre-sales, after-sales and internal service.', tags: ['Smart Q&A', 'Intent recognition', 'Multi-turn dialogue', 'Knowledge base'] },
      { title: 'AI image recognition', text: 'Deliver usable recognition around OCR, image classification and object detection.', tags: ['Computer vision', 'OCR', 'Face recognition', 'Object detection'] }
    ],
    process: [
      ['Requirements analysis', 'Understand the business context and define the AI direction and acceptance criteria.'],
      ['Solution design', 'Choose the right model, knowledge source and integration approach.'],
      ['Model development', 'Build prompt and workflow capabilities, then train, fine-tune and tune performance.'],
      ['System integration', 'Connect AI capability to existing business systems and data flows.'],
      ['Testing & launch', 'Assess quality and stability, then launch safely and confidently.'],
      ['Continuous optimization', 'Monitor outcomes and iterate with business feedback.']
    ]
  },
  '/miniprogram-development': {
    title: 'Mini Program Development',
    subtitle: 'Reach users faster with a lighter product experience.',
    capabilityTitle: 'Turn services into effortless experiences.',
    statement: 'From first touch to completed service, every step should feel light, fast and clear.',
    description: 'We build sustainable mini program touchpoints around WeChat, business workflows and operations.',
    modules: ['Enter service', 'Complete booking', 'Pay online', 'Build loyalty'],
    capabilities: [
      { title: 'Multi-platform mini programs', text: 'Cover mainstream platforms and reach users through one business across multiple channels.', tags: ['WeChat Mini Program', 'Alipay Mini Program', 'Douyin Mini Program', 'Baidu Mini Program'] },
      { title: 'E-commerce transaction loop', text: 'Connect products, orders, payments, marketing and after-sales in one flow.', tags: ['Product management', 'Payment system', 'Order tracking', 'Marketing tools'] },
      { title: 'Industry applications', text: 'Mature scenarios for retail, dining, education and local services.', tags: ['E-commerce retail', 'Food delivery', 'Education & training', 'Local services'] },
      { title: 'WeChat ecosystem integration', text: 'Deep integration with official accounts, WeCom, payments and messaging.', tags: ['Official Account', 'WeCom', 'WeChat Pay', 'Subscription messages'] }
    ],
    process: [
      ['Requirements review', 'Define business goals, user roles and the first release scope.'],
      ['Prototype & visual design', 'Design page structure and interactive prototypes, and confirm brand visuals.'],
      ['Development', 'Develop front end and back end in parallel and deliver testable milestones.'],
      ['Integration testing', 'Complete real-device testing and payment/messaging integration.'],
      ['Submission & launch', 'Prepare credentials and assets, then support platform review and release.'],
      ['Operations & iteration', 'Keep optimizing features and content with traffic and conversion data.']
    ]
  },
  '/app-development': {
    title: 'App Development',
    subtitle: 'Build mobile products that combine experience quality with engineering stability.',
    capabilityTitle: 'From the first screen to long-term use.',
    statement: 'A mobile product is valuable not only when it is installed, but when it becomes part of a user’s daily routine.',
    description: 'From user journeys and interaction design to development and launch, we deliver complete, reliable and iterable applications.',
    modules: ['Real-time service', 'Task center', 'Multi-device sync'],
    capabilities: [
      { title: 'Native app development', text: 'iOS and Android products for high performance and deep system capability.', tags: ['iOS', 'Android', 'Swift', 'Kotlin'] },
      { title: 'Cross-platform delivery', text: 'Run one codebase across platforms while balancing experience and cost.', tags: ['Flutter', 'React Native', 'Uni-app'] },
      { title: 'Mobile experience design', text: 'Clear, smooth and on-brand interfaces and interactions.', tags: ['Interaction design', 'Visual system', 'Prototype validation'] },
      { title: 'Store release & operations', text: 'Cover app store release, monitoring, iteration and version maintenance.', tags: ['App store release', 'Version iteration', 'Performance monitoring', 'Crash analysis'] }
    ],
    process: [
      ['Requirements analysis', 'Understand customer needs and define product planning and release cadence.'],
      ['UI design', 'Design interfaces and interactions, and produce buildable design specs.'],
      ['Feature development', 'Build against design specs and API contracts while maintaining code quality.'],
      ['Testing & optimization', 'Test functionality and performance, then optimize experience and stability.'],
      ['Release', 'Support app store submission and release materials.'],
      ['Maintenance & upgrades', 'Provide ongoing technical support and feature iteration.']
    ]
  },
  '/web-development': {
    title: 'Web Development',
    subtitle: 'Make your website the most credible expression of your brand in the digital world.',
    capabilityTitle: 'Not just seen, but remembered.',
    statement: 'A good brand website should express, explain and build trust at the same time.',
    description: 'We bring brand strategy, content structure, visual experience and engineering together so the website becomes a long-term business asset.',
    modules: ['Brand story', 'Product value'],
    capabilities: [
      { title: 'Brand website development', text: 'Integrated expression of positioning, content, visuals and interaction.', tags: ['Vue 3', 'React', 'TailwindCSS', 'SEO'] },
      { title: 'E-commerce & business platforms', text: 'Balance complex information, transactions and conversion.', tags: ['Next.js', 'Node.js', 'MySQL', 'Payment integration'] },
      { title: 'Enterprise management systems', text: 'Internal admin and business systems with permissions and data dashboards.', tags: ['Element Plus', 'Spring Boot', 'Access control', 'Data dashboard'] },
      { title: 'Multilingual & long-term maintenance', text: 'Support multi-region content and search while protecting performance and security.', tags: ['Multilingual sites', 'CDN', 'Security', 'Content updates'] }
    ],
    process: [
      ['Requirements', 'Clarify website positioning, structure and functional needs.'],
      ['Solution design', 'Define the technical approach, information architecture and page prototypes.'],
      ['UI design', 'Design brand-aligned visual interfaces and component standards.'],
      ['Front-end development', 'Build pages, motion and responsive layouts with modern frameworks.'],
      ['Back-end development', 'Build stable content and business admin with data security in mind.'],
      ['Testing & launch', 'Test thoroughly, deploy, and deliver usage documentation.']
    ]
  },
  '/iot-development': {
    title: 'IoT Solutions',
    subtitle: 'Connect devices, data and decisions to keep the site continuously visible.',
    capabilityTitle: 'Turn field data into operational insight.',
    statement: 'From one device to an entire campus, data links should be stable, clear and traceable.',
    description: 'We cover device access, data collection, real-time monitoring, alert analysis and business platform development as a complete IoT loop.',
    modules: ['Field devices', 'Edge gateway', 'Data dashboard', 'Alert center'],
    capabilities: [
      { title: 'Smart hardware & collection', text: 'Design field data collection and support various sensors and controllers.', tags: ['Sensor access', 'Controller', 'Edge gateway', 'Multi-protocol'] },
      { title: 'Cloud platform', text: 'Build device management and data storage platforms to manage terminals.', tags: ['Device management', 'Data storage', 'Access control', 'Open API'] },
      { title: 'Real-time monitoring & alerts', text: 'Unify device status, operational data and maintenance tickets.', tags: ['Status monitoring', 'Alert center', 'Maintenance tickets', 'Remote config'] },
      { title: 'Data analysis & visualization', text: 'Identify trends and anomalies in field data and present them visually.', tags: ['Trend analysis', 'Anomaly detection', 'Visual dashboard', 'Business reports'] }
    ],
    process: [
      ['Field research', 'Map devices, networks and current workflows, then define the access scope.'],
      ['Solution design', 'Decide hardware selection, communication protocols and platform architecture.'],
      ['Device access', 'Configure gateways, connect protocols and debug data collection.'],
      ['Platform development', 'Build device management, monitoring, alerts and data dashboards.'],
      ['Integration & launch', 'Run field integration and stress validation, then onboard devices in batches.'],
      ['Operations & optimization', 'Continuously monitor device online rates and data quality, then iterate.']
    ]
  },
  '/custom-development': {
    title: 'Custom Software Development',
    subtitle: 'Make software fit the business instead of forcing the organization to fit the software.',
    capabilityTitle: 'Built for the way your organization actually works.',
    statement: 'Turn scattered processes, data and collaboration into a system that is genuinely easy to use.',
    description: 'We work inside the business to break down requirements, design products, deliver engineering and integrate systems while enabling smooth evolution of existing legacy software.',
    modules: ['Business mapping', 'Product blueprint', 'Engineering delivery', 'Continuous iteration'],
    moduleNotes: [
      'Start by understanding how the organization works.',
      'Turn complex requirements into a clear structure.',
      'Deliver every critical step with stable engineering.',
      'Keep optimizing as the business changes.'
    ],
    capabilities: [
      { title: 'Enterprise management systems', text: 'Custom development for ERP, CRM, OA and other internal systems.', tags: ['Process automation', 'Data integration', 'Access control'] },
      { title: 'Industry solutions', text: 'Business systems and workflow solutions for specific industries.', tags: ['Industry depth', 'Specialist team', 'Proven cases'] },
      { title: 'Data analysis platforms', text: 'Integrated collection, governance, analysis and visualization.', tags: ['Data governance', 'Intelligent analysis', 'Visualization'] },
      { title: 'New product R&D', text: 'Take products from 0 to 1 through design and implementation.', tags: ['Technical innovation', 'Rapid validation', 'MVP development'] }
    ],
    process: [
      ['Requirements research', 'Understand the business context, sort out requirements and define project goals.'],
      ['Solution design', 'Define the technical approach, system architecture and development roadmap.'],
      ['Prototype confirmation', 'Design interactive prototypes, confirm workflows and validate understanding.'],
      ['Development', 'Iterate with agile delivery, report progress and adjust in time.'],
      ['Testing & acceptance', 'Control quality rigorously, test functionality and ensure delivery quality.'],
      ['Launch & maintenance', 'Support go-live, provide technical support and keep optimizing.']
    ]
  },
  '/digital-creativity': {
    title: 'Digital Creative',
    subtitle: 'Make technology part of content expression and brand experience.',
    capabilityTitle: 'Create brand moments worth participating in.',
    statement: 'When technology truly serves content, experiences are remembered.',
    description: 'We provide interactive websites, digital exhibitions, creative H5 and visual experience design for brand communication, exhibition and cultural content.',
    modules: ['Interactive experience', 'Digital exhibition', 'Creative H5', 'Data visualization'],
    capabilities: [
      { title: 'Interactive brand experiences', text: 'Use motion and interaction to deepen participation and shareability.', tags: ['Creative H5', 'Motion design', 'Brand narrative', 'Interactive installation'] },
      { title: 'Digital exhibition design', text: 'Connect space, screens, content and audience in one experience.', tags: ['Immersive hall', 'Virtual exhibition', 'Content staging', 'Interactive screen'] },
      { title: '3D, VR & AR', text: 'Three-dimensional modeling, virtual reality and augmented reality applications.', tags: ['3D modeling', 'VR applications', 'AR interaction', 'Digital sandbox'] },
      { title: 'Information visualization', text: 'Turn complex data into clear, persuasive visual expressions.', tags: ['Data visualization', 'Motion graphics', 'Large-screen design', 'Infographics'] }
    ],
    process: [
      ['Creative discussion', 'Clarify communication goals, audience and content themes.'],
      ['Concept design', 'Produce creative concepts, visual style and experience scripts.'],
      ['Prototype validation', 'Validate interaction and key technical feasibility with prototypes or demos.'],
      ['Content production', 'Produce visuals, motion, 3D and content assets.'],
      ['Development & integration', 'Build interactions and multi-device adaptation, and support on-site integration.'],
      ['Launch & operations', 'Support campaign launch and on-site operations, then review and archive content.']
    ]
  }
}

export const serviceSectionZh = {
  ai: {
    headingA: '把企业已有资料，',
    headingB: '变成随时可用的智能助手。',
    lead: '不必从零开始。制度、产品资料、历史案例和业务流程，经过整理后就能成为 AI 的可靠依据。',
    flow: [
      { alt: '整理企业资料', label: '第一步', title: '整理企业资料', text: '制度、文档、产品手册、历史工单' },
      { alt: '建立专属知识库', label: '第二步', title: '建立专属知识库', text: '统一归档、持续更新、准确检索' },
      { alt: '接入 AI 助手', label: '第三步', title: '接入 AI 助手', text: '问答、写作、分析与任务协同' },
      { alt: '服务真实岗位', label: '实际使用', title: '服务真实岗位', text: '客服、销售、运营和内部员工' }
    ]
  },
  mini: { headingA: '把服务放进用户', headingB: '最顺手的入口。', phoneLabel: '品牌服务' },
  app: { headingA: '让每一次触达，', headingB: '都有完整的产品体验。', dataLabel: '数据总览', messageLabel: '消息' },
  web: { headingA: '让品牌第一眼，', headingB: '就值得被相信。', lead: '从内容逻辑到视觉系统，再到稳定、易维护的技术实现，品牌网站应是一项长期资产。' },
  iot: {
    headingA: '设备有了语言，',
    headingB: '现场才真正可见。',
    mainLabel: '设备运行总览',
    mainNote: '今日设备在线率',
    alertLabel: '实时告警',
    alertNote: '待处理异常',
    ticketLabel: '运维工单',
    ticketNote: '今日任务',
    trendLabel: '数据趋势',
    trendNote: '近 24 小时',
    trendValue: '稳定'
  },
  custom: { headingA: '不迁就软件，', headingB: '让软件适配组织。' },
  creative: {
    headingA: '让内容、空间和技术',
    headingB: '成为一次完整体验。',
    panels: [
      { label: '01 / BRAND', alt: '品牌活动体验', title: '品牌活动体验', text: '让品牌故事不止被看见，也能被参与。' },
      { label: '02 / SPACE', alt: '数字展陈现场', title: '数字展陈现场', text: '把空间、屏幕与内容组织成一个现场。' },
      { label: '03 / MOBILE', alt: '移动互动传播', title: '移动互动传播', text: '为一次活动或传播，创造可分享的互动入口。' }
    ]
  }
}

export const serviceSectionEn = {
  ai: {
    headingA: 'Turn your existing materials',
    headingB: 'into an always-on intelligent assistant.',
    lead: 'No need to start from zero. Policies, product materials, past cases and business processes can become reliable AI context after they are organized.',
    flow: [
      { alt: 'Organize enterprise materials', label: 'Step 1', title: 'Organize enterprise materials', text: 'Policies, documents, product manuals, historical tickets' },
      { alt: 'Build a dedicated knowledge base', label: 'Step 2', title: 'Build a dedicated knowledge base', text: 'Unified archiving, continuous updates, accurate retrieval' },
      { alt: 'Connect an AI assistant', label: 'Step 3', title: 'Connect an AI assistant', text: 'Q&A, writing, analysis and task collaboration' },
      { alt: 'Serve real roles', label: 'In use', title: 'Serve real roles', text: 'Customer service, sales, operations and internal staff' }
    ]
  },
  mini: { headingA: 'Put services in the entry point', headingB: 'your users already reach for.', phoneLabel: 'Brand service' },
  app: { headingA: 'Make every touchpoint', headingB: 'a complete product experience.', dataLabel: 'Data overview', messageLabel: 'Messages' },
  web: { headingA: 'Make your brand look credible', headingB: 'at first sight.', lead: 'From content logic to visual systems, then to stable and maintainable engineering, a brand website should be a long-term asset.' },
  iot: {
    headingA: 'When devices have a language,',
    headingB: 'your site becomes visible.',
    mainLabel: 'Device overview',
    mainNote: 'Online rate today',
    alertLabel: 'Live alerts',
    alertNote: 'Pending exceptions',
    ticketLabel: 'Maintenance tickets',
    ticketNote: 'Tasks today',
    trendLabel: 'Data trend',
    trendNote: 'Last 24 hours',
    trendValue: 'Stable'
  },
  custom: { headingA: 'Do not bend your organization to software;', headingB: 'make software fit how you work.' },
  creative: {
    headingA: 'Make content, space and technology',
    headingB: 'one complete experience.',
    panels: [
      { label: '01 / BRAND', alt: 'Brand activation experience', title: 'Brand activation experience', text: 'Let brand stories be experienced, not just seen.' },
      { label: '02 / SPACE', alt: 'Digital exhibition on site', title: 'Digital exhibition on site', text: 'Bring space, screens and content together as one experience.' },
      { label: '03 / MOBILE', alt: 'Mobile interactive communication', title: 'Mobile interactive communication', text: 'Create shareable interactive entry points for campaigns and communication.' }
    ]
  }
}
