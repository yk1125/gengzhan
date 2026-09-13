<template>
  <div class="news-detail">
    <!-- 粒子背景 -->
    <ParticleBackground />
    
    <div class="container">
      <el-button @click="$router.back()" class="back-btn" type="primary">
        <el-icon><ArrowLeft /></el-icon> 返回列表
      </el-button>

      <div class="detail-loading" v-if="loading">
        <div class="loading-dot" v-for="n in 3" :key="n"></div>
        <p>资讯加载中...</p>
      </div>

      <div class="detail-content glass-effect" v-else-if="newsData.title">
        <div class="article-header">
          <div class="category-tag">{{ newsData.category }}</div>
          <h1>{{ newsData.title }}</h1>
          <div class="meta-info">
            <span class="meta-item">
              <el-icon><Calendar /></el-icon>
              {{ newsData.date }}
            </span>
            <span class="meta-item">
              <el-icon><User /></el-icon>
              {{ newsData.author }}
            </span>
            <span class="meta-item">
              <el-icon><View /></el-icon>
              {{ newsData.views }}
            </span>
          </div>
        </div>

        <div class="main-image">
          <img :src="newsData.image" :alt="newsData.title">
        </div>

        <div class="article-content" v-html="newsData.content"></div>

        <div class="article-footer">
          <div class="source" v-if="newsData.source">来源：{{ newsData.source }}</div>
          <div class="tags" v-if="newsData.tags.length">
            <el-tag v-for="tag in newsData.tags" :key="tag" type="info">{{ tag }}</el-tag>
          </div>
        </div>
      </div>

      <div class="detail-empty" v-else>
        <p>暂无资讯</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowLeft, Calendar, User, View } from '@element-plus/icons-vue'
import ParticleBackground from '@/components/ParticleBackground.vue'

const route = useRoute()
const loading = ref(false)
const newsData = ref({
  title: '',
  category: '',
  date: '',
  author: '',
  views: 0,
  image: '',
  tags: [],
  content: '',
  source: ''
})

const newsDatabase = {
  1: {
    id: 1,
    title: 'AI赋能软件开发：趋势与实践',
    category: 'AI技术',
    date: '2025-03-15',
    author: 'AI研究员',
    views: '2.3k',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200',
    tags: ['AI', '软件开发', '趋势'],
    source: '',
    content: `
      <h2>三、典型应用场景</h2>
      <h3>3.1 企业知识库问答</h3>
      <p>将企业文档、手册等资料向量化后存储，用户提问时检索相关内容，结合大模型生成答案。</p>
      
      <h3>3.2 代码辅助开发</h3>
      <p>AI可以帮助开发者生成代码片段、查找bug、优化性能，显著提升开发效率。</p>

      <h2>总结</h2>
      <p>AI技术正在重塑软件开发行业。企业应积极拥抱AI，探索AI+业务的创新模式，在激烈的市场竞争中占据先机。</p>
    `
  },
  2: {
    id: 2,
    title: '小程序云开发：新一代开发模式',
    category: '小程序',
    date: '2025-03-12',
    author: '小程序专家',
    views: '1.8k',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200',
    tags: ['小程序', '云开发', '微信', '后端'],
    content: `
      <h2>什么是小程序云开发</h2>
      <p>小程序云开发是微信官方提供的云端一体化解决方案，开发者无需搭建服务器，即可使用云函数、云数据库、云存储等能力。</p>

      <h2>核心能力</h2>
      <h3>1. 云函数</h3>
      <p>在云端运行的代码，支持Node.js，可处理业务逻辑、调用第三方API等。无需关心服务器运维，自动扩缩容。</p>

      <h3>2. 云数据库</h3>
      <p>基于MongoDB的JSON数据库，支持复杂查询、聚合操作，权限控制灵活，开发体验友好。</p>

      <h3>3. 云存储</h3>
      <p>存储和管理文件，支持图片、音视频等多种格式，提供CDN加速，访问速度快。</p>

      <h2>开发流程</h2>
      <ol>
        <li>开通云开发环境</li>
        <li>初始化云能力</li>
        <li>编写云函数处理业务逻辑</li>
        <li>设计数据库集合结构</li>
        <li>小程序端调用云能力</li>
      </ol>

      <h2>最佳实践</h2>
      <p><strong>数据库设计</strong>：合理设计集合结构，避免深层嵌套，建立必要的索引提升查询性能。</p>
      <p><strong>云函数优化</strong>：避免冷启动，合理拆分函数，控制函数执行时长。</p>
      <p><strong>安全规则</strong>：配置数据库权限规则，防止数据泄露。</p>

      <h2>总结</h2>
      <p>小程序云开发大幅降低了开发门槛，让前端工程师也能快速构建全栈应用，是小程序开发的首选方案。</p>
    `
  },
  3: {
    id: 3,
    title: 'React 19新特性详解与实践',
    category: 'Web开发',
    date: '2025-03-10',
    author: 'React团队',
    views: '3.1k',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200',
    tags: ['React', 'Web开发', '前端框架', 'JavaScript'],
    content: `
      <h2>React 19核心特性</h2>
      <p>React 19带来了诸多令人兴奋的新特性，将进一步提升开发效率和应用性能。</p>

      <h2>1. Server Components</h2>
      <p>服务端组件允许在服务器上渲染组件，减少客户端JavaScript体积，提升首屏加载速度。</p>
      <pre><code>// ServerComponent.js (服务端组件)
async function BlogPost({ id }) {
  const post = await db.posts.find(id)
  return &lt;Article data={post} /&gt;
}</code></pre>

      <h2>2. Actions</h2>
      <p>Actions简化了表单处理和数据变更操作，内置loading、错误处理等状态管理。</p>
      <pre><code>function CommentForm() {
  async function submitComment(formData) {
    'use server'
    await api.addComment(formData)
  }
  
  return &lt;form action={submitComment}&gt;...&lt;/form&gt;
}</code></pre>

      <h2>3. 新Hooks</h2>
      <h3>use Hook</h3>
      <p>统一处理Promise、Context等资源的读取，简化异步逻辑。</p>

      <h3>useOptimistic</h3>
      <p>实现乐观更新，在服务器响应前先显示预期结果，提升用户体验。</p>

      <h2>性能优化</h2>
      <p>React 19在编译器层面做了大量优化，自动memorization，减少不必要的重渲染。</p>

      <h2>迁移指南</h2>
      <ul>
        <li>检查第三方库兼容性</li>
        <li>逐步迁移，从新功能模块开始</li>
        <li>充分测试，关注性能指标</li>
        <li>阅读官方迁移文档</li>
      </ul>

      <h2>总结</h2>
      <p>React 19是一次重大升级，Server Components等特性将改变React应用的开发模式，值得开发者深入学习。</p>
    `
  },
  4: {
    id: 4,
    title: 'Flutter 3.x跨平台开发实战',
    category: '移动开发',
    date: '2025-03-08',
    author: '移动开发者',
    views: '2.7k',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200',
    tags: ['Flutter', '跨平台', '移动开发', 'Dart'],
    content: `
      <h2>为什么选择Flutter</h2>
      <p>Flutter是Google推出的跨平台UI框架，一套代码可以构建iOS、Android、Web、Desktop应用，开发效率高，性能接近原生。</p>

      <h2>核心特性</h2>
      <h3>1. 热重载</h3>
      <p>修改代码后无需重新编译，毫秒级刷新界面，极大提升开发效率。</p>

      <h3>2. 丰富的Widget</h3>
      <p>Material和Cupertino两套组件库，覆盖常见UI需求，还可自定义Widget。</p>

      <h3>3. 高性能渲染</h3>
      <p>使用Skia图形引擎直接绘制，60fps流畅体验，无JavaScript Bridge性能损耗。</p>

      <h2>状态管理方案</h2>
      <h3>Provider</h3>
      <p>官方推荐的状态管理方案，简单易用，适合中小型项目。</p>

      <h3>Riverpod</h3>
      <p>Provider的升级版，编译时安全，支持自动刷新，代码更简洁。</p>

      <h3>Bloc</h3>
      <p>基于Stream的状态管理，适合复杂业务场景，可测试性强。</p>

      <h2>原生交互</h2>
      <p>通过Platform Channel与原生代码通信，调用相机、蓝牙等原生能力。</p>
      <pre><code>// Flutter端
const platform = MethodChannel('samples.flutter.dev/battery');
final batteryLevel = await platform.invokeMethod('getBatteryLevel');</code></pre>

      <h2>性能调优</h2>
      <ul>
        <li>使用const constructor减少rebuild</li>
        <li>避免在build方法中创建对象</li>
        <li>大列表使用ListView.builder</li>
        <li>图片使用缓存和压缩</li>
      </ul>

      <h2>总结</h2>
      <p>Flutter 3.x已经非常成熟，是跨平台开发的优秀选择，值得投入学习。</p>
    `
  },
  5: {
    id: 5,
    title: '大语言模型应用开发入门',
    category: 'AI技术',
    date: '2025-03-05',
    author: 'AI工程师',
    views: '4.2k',
    image: 'https://images.unsplash.com/photo-1676299081847-c0326f1f8c7c?w=1200',
    tags: ['AI', 'GPT', 'LLM', 'API'],
    content: `
      <h2>什么是大语言模型</h2>
      <p>大语言模型（Large Language Model, LLM）是基于深度学习训练的AI模型，能够理解和生成人类语言，如GPT-4、Claude等。</p>

      <h2>如何接入大模型</h2>
      <h3>1. OpenAI API</h3>
      <p>OpenAI提供了GPT系列模型的API接口，开发者可以直接调用。</p>
      <pre><code>import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const completion = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [{ role: "user", content: "你好" }]
})</code></pre>

      <h3>2. 国产大模型</h3>
      <p>文心一言、通义千问、讯飞星火等也提供API服务，可根据需求选择。</p>

      <h2>核心概念</h2>
      <h3>Prompt Engineering</h3>
      <p>通过精心设计提示词，引导模型输出期望的结果。</p>
      <ul>
        <li><strong>角色设定</strong>：告诉AI扮演什么角色</li>
        <li><strong>明确任务</strong>：清晰描述要完成的任务</li>
        <li><strong>提供示例</strong>：Few-shot learning提升效果</li>
        <li><strong>设置约束</strong>：限制输出格式和长度</li>
      </ul>

      <h3>Token管理</h3>
      <p>API按token计费，需要合理控制上下文长度，避免超出限制。</p>

      <h2>典型应用场景</h2>
      <h3>智能对话</h3>
      <p>构建聊天机器人，提供7×24小时在线服务。</p>

      <h3>内容生成</h3>
      <p>自动生成文案、摘要、翻译等内容。</p>

      <h3>文档分析</h3>
      <p>提取文档关键信息，回答用户提问。</p>

      <h2>注意事项</h2>
      <p><strong>数据安全</strong>：不要将敏感信息发送给第三方API。</p>
      <p><strong>内容审核</strong>：对生成内容进行过滤，避免不当输出。</p>
      <p><strong>成本控制</strong>：监控API调用量，避免超支。</p>

      <h2>总结</h2>
      <p>大语言模型为开发者提供了强大的AI能力，掌握其使用方法将成为未来开发者的必备技能。</p>
    `
  },
  6: {
    id: 6,
    title: 'Next.js 14 App Router最佳实践',
    category: 'Web开发',
    date: '2025-03-03',
    author: 'Web架构师',
    views: '2.9k',
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=1200',
    tags: ['Next.js', 'React', 'SSR', 'Web开发'],
    content: `
      <h2>App Router简介</h2>
      <p>Next.js 14的App Router是基于React Server Components构建的全新路由系统，提供了更强大的功能和更好的性能。</p>

      <h2>核心特性</h2>
      <h3>1. 文件系统路由</h3>
      <p>通过文件夹结构定义路由，layout.js、page.js、loading.js等特殊文件名有不同作用。</p>

      <h3>2. Server Actions</h3>
      <p>在服务端直接处理表单提交和数据变更，无需编写API路由。</p>
      <pre><code>// app/actions.js
'use server'

export async function createPost(formData) {
  const post = {
    title: formData.get('title'),
    content: formData.get('content')
  }
  await db.posts.insert(post)
}</code></pre>

      <h3>3. Streaming</h3>
      <p>支持流式渲染，页面部分内容可以先显示，提升感知速度。</p>

      <h2>数据获取</h2>
      <h3>服务端数据获取</h3>
      <p>在Server Component中直接调用数据库，无需API层。</p>
      <pre><code>async function Page() {
  const data = await db.posts.findMany()
  return &lt;PostList posts={data} /&gt;
}</code></pre>

      <h3>客户端数据获取</h3>
      <p>使用SWR或React Query在客户端组件中获取数据。</p>

      <h2>性能优化</h2>
      <ul>
        <li><strong>路由预加载</strong>：Link组件自动预加载目标页面</li>
        <li><strong>图片优化</strong>：使用Next/Image自动优化图片</li>
        <li><strong>代码分割</strong>：自动按路由分割代码</li>
        <li><strong>缓存策略</strong>：合理配置fetch缓存</li>
      </ul>

      <h2>SEO优化</h2>
      <p>通过generateMetadata函数生成动态meta标签，提升搜索引擎可见性。</p>
      <pre><code>export async function generateMetadata({ params }) {
  const post = await db.posts.find(params.id)
  return {
    title: post.title,
    description: post.summary
  }
}</code></pre>

      <h2>部署建议</h2>
      <p>推荐部署到Vercel获得最佳体验，也可以使用Docker自行部署。</p>

      <h2>总结</h2>
      <p>Next.js 14 App Router代表了React应用开发的未来方向，值得深入学习和实践。</p>
    `
  }
}

onMounted(() => {
  const id = parseInt(route.params.id)
  if (newsDatabase[id]) {
    newsData.value = newsDatabase[id]
  } else {
    // 如果没有找到对应ID，显示默认内容
    newsData.value = newsDatabase[1]
  }
})
</script>

<style scoped>
.news-detail {
  position: relative;
  min-height: 100vh;
  padding: 120px 0 80px;
  background: linear-gradient(180deg, #0a0e27 0%, #1a1f3a 100%);
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 40px;
}

.back-btn {
  margin-bottom: 40px;
}

.detail-content {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 48px;
  animation: fadeInUp 0.6s ease-out;
}

.article-header {
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.category-tag {
  display: inline-block;
  padding: 6px 16px;
  background: linear-gradient(135deg, #00d4ff 0%, #9d4edd 100%);
  color: white;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 20px;
}

.article-header h1 {
  font-size: 40px;
  font-weight: 800;
  color: white;
  margin-bottom: 24px;
  line-height: 1.3;
}

.meta-info {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
}

.meta-item .el-icon {
  font-size: 16px;
  color: #00d4ff;
}

.main-image {
  margin: 32px 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.main-image img {
  width: 100%;
  display: block;
}

.article-content {
  font-size: 16px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.8);
}

.article-content :deep(h2) {
  font-size: 28px;
  font-weight: 700;
  color: white;
  margin: 40px 0 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid rgba(0, 212, 255, 0.3);
}

.article-content :deep(h3) {
  font-size: 22px;
  font-weight: 600;
  color: white;
  margin: 32px 0 16px;
}

.article-content :deep(p) {
  margin-bottom: 16px;
  line-height: 1.8;
}

.article-content :deep(ul),
.article-content :deep(ol) {
  margin: 16px 0;
  padding-left: 24px;
}

.article-content :deep(li) {
  margin-bottom: 12px;
  line-height: 1.8;
}

.article-content :deep(strong) {
  color: #00d4ff;
  font-weight: 600;
}

.article-content :deep(code) {
  background: rgba(0, 0, 0, 0.3);
  padding: 2px 8px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  color: #00d4ff;
}

.article-content :deep(pre) {
  background: rgba(0, 0, 0, 0.3);
  padding: 20px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 20px 0;
  border: 1px solid rgba(0, 212, 255, 0.2);
}

.article-content :deep(pre code) {
  background: none;
  padding: 0;
  color: rgba(255, 255, 255, 0.9);
}

.article-footer {
  margin-top: 48px;
  padding-top: 32px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.tags {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.tags :deep(.el-tag) {
  background: rgba(0, 212, 255, 0.1);
  border-color: rgba(0, 212, 255, 0.3);
  color: #00d4ff;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .news-detail {
    padding: 100px 0 60px;
  }
  
  .detail-content {
    padding: 32px 24px;
  }
  
  .article-header h1 {
    font-size: 28px;
  }
  
  .article-content :deep(h2) {
    font-size: 24px;
  }
  
  .article-content :deep(h3) {
    font-size: 20px;
  }
}
</style>
