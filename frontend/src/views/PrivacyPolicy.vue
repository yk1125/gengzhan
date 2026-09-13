<template>
  <section class="policy-page">
    <article class="policy-document">
      <router-link to="/" class="policy-back">返回首页</router-link>
      <p class="policy-eyebrow">YUNZHAN TECHNOLOGY</p>
      <h1>隐私政策</h1>
      <p class="policy-date">最后更新：2026 年 8 月 3 日</p>

      <section>
        <h2>一、适用范围</h2>
        <p>本政策适用于北京耘栈科技通过本网站提供的信息展示、项目咨询与联系服务。使用本网站或提交咨询信息前，请仔细阅读并理解本政策。</p>
      </section>
      <section>
        <h2>二、我们收集的信息</h2>
        <p>当您提交项目咨询时，我们会收集您主动提供的姓名、公司名称、电子邮箱、联系电话及需求描述，用于识别咨询主体、沟通项目需求并提供后续服务。</p>
      </section>
      <section>
        <h2>三、信息的使用</h2>
        <p>我们仅在提供咨询、制定方案、安排服务沟通、改善网站服务及履行法律法规要求的范围内使用您的信息，不会将您的个人信息出售或出租给第三方。</p>
      </section>
      <section>
        <h2>四、信息的保护</h2>
        <p>我们采取合理的管理与技术措施保护信息安全，并限制无关人员访问咨询资料。请注意，任何互联网传输均无法保证绝对安全。</p>
      </section>
      <section>
        <h2>五、您的权利与联系我们</h2>
        <p>您可以要求查询、更正或删除您主动提交的咨询信息。有关隐私问题，请通过微信 YunZhanKk 或邮箱 yunzhan1129@163.com 联系我们。</p>
      </section>
    </article>
  </section>
</template>

<style scoped>
.policy-page { padding: 84px 24px; background: #f4f7fb; }
.policy-document { width: min(100%, 860px); margin: 0 auto; padding: 56px 64px; color: #40546a; background: #fff; border: 1px solid #e0e7f0; }
.policy-back { color: #1f55bf; font-size: 14px; font-weight: 700; text-decoration: none; }
.policy-eyebrow { margin: 42px 0 12px; color: #5272ba; font-size: 12px; font-weight: 800; letter-spacing: .14em; }
h1 { margin: 0; color: #152945; font-size: 42px; letter-spacing: 0; }
.policy-date { margin: 14px 0 46px; color: #758599; font-size: 14px; }
section + section { margin-top: 34px; }
h2 { margin: 0 0 12px; color: #1e3658; font-size: 20px; }
section p { margin: 0; font-size: 16px; line-height: 1.9; }
@media (max-width: 640px) { .policy-page { padding: 36px 16px; } .policy-document { padding: 36px 24px; } h1 { font-size: 32px; } section p { font-size: 15px; } }
</style>
