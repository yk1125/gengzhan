<template>
  <section class="policy-page">
    <article class="policy-document">
      <router-link to="/" class="policy-back">返回首页</router-link>
      <p class="policy-eyebrow">YUNZHAN TECHNOLOGY</p>
      <h1>法律声明</h1>
      <p class="policy-date">最后更新：2026 年 8 月 3 日</p>

      <section>
        <h2>一、网站内容</h2>
        <p>本网站所展示的服务、案例、资讯及其他资料仅用于介绍北京耘栈科技的业务能力。页面内容不构成任何承诺、报价、要约或对具体项目结果的保证。</p>
      </section>
      <section>
        <h2>二、知识产权</h2>
        <p>除另有说明外，本网站的文字、界面设计、图形、标识及程序内容均受相关法律保护。未经书面许可，不得以复制、转载、镜像或其他方式使用。</p>
      </section>
      <section>
        <h2>三、第三方链接</h2>
        <p>网站可能包含第三方网站或服务链接。该等链接仅为便利访问而提供，我们不对第三方网站的内容、隐私政策或服务承担责任。</p>
      </section>
      <section>
        <h2>四、服务调整</h2>
        <p>我们可根据业务需要对网站内容、服务范围或访问方式进行更新、调整或停止。涉及具体合作的权利义务，以双方另行签署的书面协议为准。</p>
      </section>
      <section>
        <h2>五、联系我们</h2>
        <p>如您对本声明有任何疑问，请通过微信 YunZhanKk 或邮箱 yunzhan1129@163.com 联系我们。</p>
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
