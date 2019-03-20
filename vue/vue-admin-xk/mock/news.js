import Mock from 'mockjs'

export default {
  getCompanyNews: () => {
    const items = Mock.mock({
      'items|6': [{
        id: '@integer(1,1000)',
        sort: '@integer(1,10)',
        title: '@csentence(8, 12)',
        author: 'CompanyNews',
        publishTime: '@datetime',
        updateTime: '@datetime',
        looks: '@integer(60,100)',
        status: '@integer(0,1)'
      }]
    })
    return {
      code: 20000,
      total: 6,
      items: items
    }
  },
  getNewsInformation: () => {
    const items = Mock.mock({
      'items|6': [{
        id: '@integer(1,1000)',
        sort: '@integer(1,10)',
        title: '@csentence(8, 12)',
        author: 'NewsInformation',
        publishTime: '@datetime',
        updateTime: '@datetime',
        looks: '@integer(60,100)',
        status: '@integer(0,1)'
      }]
    })
    return {
      code: 20000,
      total: 6,
      items: items
    }
  }
}
