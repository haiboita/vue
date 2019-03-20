import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/welcome',
    name: 'Welcome',
    hidden: true,
    children: [{
      path: 'welcome',
      // meta: { title: '全球家庭共享平台', icon: 'international' },
      component: () => import('@/views/welcome/index')
    }]
  },

  {
    path: '/home',
    component: Layout,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home/home'),
        meta: { title: '首页', icon: 'yb' }
      }
    ]
  },

  {
    path: '/news',
    component: Layout,
    redirect: '/news/1',
    name: 'News',
    meta: { title: '新闻公告', icon: 'xw' },
    children: [
      {
        path: '1',
        name: 'companyNews',
        component: () => import('@/views/news/companyNews'),
        meta: { title: '公司新闻' }
      },
      {
        path: '2',
        name: 'newsInformation',
        component: () => import('@/views/news/newsInformation'),
        meta: { title: '新闻资讯' }
      },
      {
        path: '3',
        name: 'newsEditor',
        hidden: true,
        component: () => import('@/views/news/newsEditor'),
        meta: { title: '新闻编辑' }
      },
      {
        path: '4',
        name: 'newsSort',
        hidden: true,
        component: () => import('@/views/news/newsSort'),
        meta: { title: '新闻排序' }
      }
    ]
  },

  {
    path: '/members',
    component: Layout,
    redirect: '/members/1',
    name: 'Members',
    meta: { title: '会员管理', icon: 'hy' },
    children: [
      {
        path: '1',
        name: 'membersList',
        component: () => import('@/views/members/membersList'),
        meta: { title: '会员列表' }
      },
      {
        path: '2',
        name: 'freeMembersList',
        component: () => import('@/views/members/freeMembersList'),
        meta: { title: '免费会员' }
      },
      {
        path: '3',
        name: 'memberActivation',
        component: () => import('@/views/members/memberActivation'),
        meta: { title: '会员激活' }
      },
      {
        path: '5',
        name: 'freeRegistration',
        component: () => import('@/views/members/freeRegistration'),
        meta: { title: '会员注册' }
      },
      {
        path: '6',
        name: 'recommendTopology',
        component: () => import('@/views/members/recommendTopology'),
        meta: { title: '推荐拓扑' }
      },
      {
        path: '7',
        name: 'nodeTopology',
        component: () => import('@/views/members/nodeTopology'),
        meta: { title: '节点拓扑' }
      },
      {
        path: '8',
        name: 'memberMessage',
        component: () => import('@/views/members/memberMessage'),
        meta: { title: '会员留言' }
      },
      {
        path: '9',
        name: 'memberMore',
        hidden: true,
        component: () => import('@/views/members/memberMore'),
        meta: { title: '更多操作' }
      },
      {
        path: '10',
        name: 'resetPassword',
        hidden: true,
        component: () => import('@/views/members/resetPassword'),
        meta: { title: '重置密码' }
      },
      {
        path: '11',
        name: 'updateInfo',
        hidden: true,
        component: () => import('@/views/members/updateInfo'),
        meta: { title: '修改信息' }
      }
    ]
  },

  {
    path: '/finance',
    component: Layout,
    redirect: '/finance/1',
    name: 'Finance',
    meta: { title: '财务管理', icon: 'cw' },
    children: [
      {
        path: '1',
        name: 'bonusStatistics',
        component: () => import('@/views/finance/bonusStatistics'),
        meta: { title: '奖金统计' }
      },
      {
        path: '2',
        name: 'financialFlow',
        component: () => import('@/views/finance/financialFlow'),
        meta: { title: '财务流水' }
      },
      {
        path: '3',
        name: 'companyRecharge',
        component: () => import('@/views/finance/companyRecharge'),
        meta: { title: '公司充值' }
      },
      {
        path: '4',
        name: 'companyCoinDeduction',
        component: () => import('@/views/finance/companyCoinDeduction'),
        meta: { title: '公司扣币' }
      },
      {
        path: '5',
        name: 'companyFinance',
        component: () => import('@/views/finance/companyFinance'),
        meta: { title: '公司财务' }
      },
      {
        path: '9',
        name: 'withdrawRequest',
        component: () => import('@/views/finance/withdrawRequest'),
        meta: { title: '提现申请' }
      },
      {
        path: '6',
        name: 'rechargeRequest',
        component: () => import('@/views/finance/rechargeRequest'),
        meta: { title: '充值申请' }
      },
      {
        path: '7',
        name: 'rechargeRecord',
        component: () => import('@/views/finance/rechargeRecord'),
        meta: { title: '充值记录' }
      }
    ]
  },

  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/1',
    name: 'Admin',
    meta: { title: '管理员列表', icon: 'gly' },
    children: [
      {
        path: '1',
        name: 'adminList',
        component: () => import('@/views/admin/adminList'),
        meta: { title: '管理员列表' }
      },
      {
        path: '2',
        name: 'adminUpdate',
        component: () => import('@/views/admin/adminUpdate'),
        meta: { title: '管理员修改' }
      },
      {
        path: '3',
        name: 'authority',
        component: () => import('@/views/admin/authority'),
        meta: { title: '权限管理' }
      },
      {
        path: '4',
        name: 'empower',
        hidden: true,
        component: () => import('@/views/admin/empower'),
        meta: { title: '用户组授权' }
      },
      {
        path: '5',
        name: 'adminEmpower',
        hidden: true,
        component: () => import('@/views/admin/adminEmpower'),
        meta: { title: '管理员授权' }
      }
    ]
  },

  {
    path: '/shop',
    component: Layout,
    redirect: '/shop/1',
    name: 'Shop',
    meta: { title: '购物商场', icon: 'sc' },
    children: [
      {
        path: '1',
        name: 'shopSetting',
        component: () => import('@/views/shop/shopSetting'),
        meta: { title: '商城设置' }
      },
      {
        path: '2',
        name: 'goodsCategory',
        component: () => import('@/views/shop/goodsCategory'),
        meta: { title: '商品分类' }
      },
      {
        path: '3',
        name: 'goodsList',
        component: () => import('@/views/shop/goodsList'),
        meta: { title: '商品列表' }
      },
      {
        path: '4',
        name: 'waitOrder',
        component: () => import('@/views/shop/waitOrder'),
        meta: { title: '待发货订单' }
      },
      {
        path: '5',
        name: 'deliveredOrder',
        component: () => import('@/views/shop/deliveredOrder'),
        meta: { title: '已发货订单' }
      },
      {
        path: '6',
        name: 'signedOrder',
        component: () => import('@/views/shop/signedOrder'),
        meta: { title: '已签收订单' }
      },
      {
        path: '7',
        name: 'freightTemplate',
        component: () => import('@/views/shop/freightTemplate'),
        meta: { title: '运费模板' }
      },
      {
        path: '8',
        name: 'appraiseList',
        component: () => import('@/views/shop/appraiseList'),
        meta: { title: '评价列表' }
      },
      {
        path: '9',
        name: 'expressCompany',
        component: () => import('@/views/shop/expressCompany'),
        meta: { title: '快递公司' }
      },
      {
        path: '10',
        name: 'banner',
        component: () => import('@/views/shop/banner'),
        meta: { title: '首页轮播图' }
      },
      {
        path: '11',
        name: 'advertisement',
        component: () => import('@/views/shop/advertisement'),
        meta: { title: '广告&排版' }
      },
      {
        path: '12',
        name: 'shopNav',
        component: () => import('@/views/shop/shopNav'),
        meta: { title: '商城导航' }
      },
      {
        path: '13',
        name: 'friendlyLink',
        component: () => import('@/views/shop/friendlyLink'),
        meta: { title: '友情链接' }
      }
    ]
  },

  {
    path: '/setting',
    component: Layout,
    redirect: '/setting/1',
    name: 'Setting',
    meta: { title: '系统设置', icon: 'sz' },
    children: [
      {
        path: '1',
        name: 'bonusSetting',
        component: () => import('@/views/setting/bonusSetting'),
        meta: { title: '奖金设置', affix: false }
      },
      {
        path: '2',
        name: 'websiteSetting',
        component: () => import('@/views/setting/websiteSetting'),
        meta: { title: '网站设置' }
      },
      {
        path: '3',
        name: 'walletSetting',
        component: () => import('@/views/setting/walletSetting'),
        meta: { title: '钱包设置' }
      },
      {
        path: '4',
        name: 'menuManager',
        component: () => import('@/views/setting/menuManager'),
        meta: { title: '菜单管理' }
      },
      {
        path: '6',
        name: 'dataManager',
        component: () => import('@/views/setting/dataManager'),
        meta: { title: '数据管理' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
