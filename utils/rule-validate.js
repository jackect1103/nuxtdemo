/**
 * 创建计划/添加店铺计划 表单规则
 */
export const addPlanRuleValidate = {
  name: [
    {
      required: true,
      message: "请输入计划名称",
      trigger: "blur",
    },
  ],
  demandAt: {
    required: true,
    type: "date",
    message: "请选择需求时间",
    trigger: "blur",
  },
  readlineAt: {
    required: true,
    type: "date",
    message: "请选择提交截止时间",
    trigger: "blur",
  },
  brandId: [
    {
      required: true,
      type: 'number', 
      message: "请选择发送品牌",
      trigger: "change",
    }
  ],
  listShopName: [
    {
      required: true,
      type: "array",
      min: 1,
      message: "至少选择一个店铺",
      trigger: "blur",
    },
  ],
}

/**
 * 创建计划/添加店铺 表单规则
 */
export const brandRuleValidate = {
  name: [
    {
      required: true,
      message: "请输入品牌名称",
      trigger: "blur",
    },
  ],
}