import Mock from 'mockjs'

export default {
  getMembers: () => {
    const items = Mock.mock({
      'items|6': [{
        num: '@integer(1,1000)',
        name: '@cname()',
        jb: '一级会员',
        cz: '@integer(1000,10000)' + '.00',
        d: '@integer(1000,10000)' + '.00',
        gxd: '@integer(1000,10000)' + '.00',
        dfh: '@integer(1000,10000)' + '.00',
        kfh: '@integer(1000,10000)' + '.00',
        inviter: 'admin',
        updateTime: '@datetime',
        status: '@integer(1,2)',
        iswithdraw: '@integer(0,1)',
        type: '1'
      }]
    })
    return {
      code: 20000,
      total: 6,
      items: items
    }
  },
  getFreeMembers: () => {
    const items = Mock.mock({
      'items|6': [{
        num: '@integer(1,1000)',
        name: '@cname()',
        jb: '免费会员',
        cz: '@integer(1000,10000)' + '.00',
        d: '@integer(1000,10000)' + '.00',
        gxd: '@integer(1000,10000)' + '.00',
        dfh: '@integer(1000,10000)' + '.00',
        kfh: '@integer(1000,10000)' + '.00',
        inviter: 'admin',
        updateTime: '@datetime',
        status: '@integer(1,2)',
        iswithdraw: '@integer(0,1)',
        type: '0'
      }]
    })
    return {
      code: 20000,
      total: 6,
      items: items
    }
  }
}
