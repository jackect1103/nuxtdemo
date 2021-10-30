export const stockingPlan = [
  {
    type: "selection",
    width: 60,
    align: "center",
  },
  {
    title: "序号",
    type: "index",
    width: 80,
    align: "center",
  },
  {
    title: "品牌",
    key: "brand",
  },
  {
    title: "计划名称",
    key: "planName",
  },
  {
    title: "店铺名称",
    key: "shop",
  },
  {
    title: "需求时间",
    key: "demandAt",
  },
  {
    title: "状态",
    key: "status",
    sortable: true
  },
  {
    title: "上级审核",
    key: "superiorReviewer",
  },
  {
    title: "经理审核",
    key: "managerReviewer",
  },
  {
    title: "创建时间",
    key: "createdAt",
  },
  {
    title: "提交截止时间",
    key: "readlineAt",
  },
  {
    title: "创建人",
    key: "createdBy",
  },
]

export const statusEnum = {
  'unSubmitted': '未提交',
  'superiorAuditPending': '待上级审核',
  'submitPending': '待提交',
  'managerAuditPending': '待经理审核',
  'overdue': '逾期未提交',
  'success': '通过',
}