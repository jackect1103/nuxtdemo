export const MENU = [{
  id: 1,
  name: 'basic-information',
  content: '基础信息',
  path: '/',
  children: [{
    id: 1 - 1,
    name: 'goods-management',
    content: '货品管理',
    children: [{
      id: 1 - 1 - 1,
      name: 'regular-goods',
      content: '常规货品',
      path: '/',
      name:'index'
    }, {
      id: 1 - 1 - 2,
      name: 'special-goods',
      content: '特殊货品',
      path: '/',
      name:'index'
    }]
  }, {
    id: 1 - 2,
    name:'brand-management',
    content: '品牌 - 店铺管理',
    path: '/brand-management',
  }, {
    id: 1 - 3,
    name: 'channel-business-management',
    content: '渠道 - 商家管理',
    path: '/',
    name:'index'
  },]
}, {
  id: 2,
  name: 'stocking-plan',
  content: '备货计划',
  children: [{
    id: 2 - 1,
    name: 'plan-management',
    content: '计划管理',
    path: '/plan-management',
  }, {
    id: 2 - 2,
    name: 'goods-application',
    content: '计划申请',
    path: '',
  }, {
    id: 2 - 3,
    name: 'goods-audit',
    content: '计划审核',
    path: '',
  }, {
    id: 2 - 4,
    name: 'entry-record',
    content: '入仓记录',
    path: '',
  }]
}, {
  id: 3,
  name: 'external-transfer-plan',
  content: '外调管理',
  children: [{
    id: 3 - 1,
    name: 'outbound-demand-management',
    content: '外调需求管理',
    path: '',
  }, {
    id: 3 - 2,
    name: 'logistics-outsourcing',
    content: '物流外调',
    path: '',
  }, {
    id: 3 - 3,
    name: 'express-stocking',
    content: '快递备货',
    path: '',
  }]
}, {
  id: 4,
  name: 'statistics',
  content: '数据统计',
  children: [{
    id: 4 - 1,
    name: 'external-transfer-statistics',
    content: '外调统计',
    path: '',
  }, {
    id: 4 - 2,
    name: 'ldata-report',
    content: '数据报表',
    path: '',
  }]
}]