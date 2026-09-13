import request from '@/utils/request'

// ============ 服务相关 ============
export const getServices = (config = {}) => {
  return request({
    url: '/services',
    method: 'get',
    ...config
  })
}

export const getServiceDetail = (id) => {
  return request({
    url: `/services/${id}`,
    method: 'get'
  })
}

// ============ 案例相关 ============
export const getCases = (params, config = {}) => {
  return request({
    url: '/cases',
    method: 'get',
    params,
    ...config
  })
}

export const getCaseDetail = (id) => {
  return request({
    url: `/cases/${id}`,
    method: 'get'
  })
}

export const getNews = (params, config = {}) => {
  return request({
    url: '/news',
    method: 'get',
    params,
    ...config
  })
}

export const getNewsDetail = (id) => {
  return request({
    url: `/news/${id}`,
    method: 'get'
  })
}

// ============ 轮播图相关 ============
export const getBanners = (position = 'home', config = {}) => {
  return request({
    url: '/banners',
    method: 'get',
    params: { position },
    ...config
  })
}

// ============ 公司信息相关 ============
export const getAboutInfo = () => {
  return request({
    url: '/about',
    method: 'get'
  })
}

// ============ 网站配置相关 ============
export const getSiteConfig = () => {
  return request({
    url: '/config',
    method: 'get'
  })
}

// ============ 联系我们 ============
export const submitContact = (data) => {
  return request({
    url: '/contact',
    method: 'post',
    data
  })
}

// ============ AI 咨询 ==========
export const chatWithAssistant = (data) => {
  return request({
    url: '/ai/chat',
    method: 'post',
    data,
    silent: true,
    timeout: 60000
  })
}

// ============ 统计相关 ============
export const addView = (type, id) => {
  return request({
    url: '/stats/view',
    method: 'post',
    data: { type, id }
  })
}
