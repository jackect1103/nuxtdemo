// import commonBaseClass from '~/common.js'
/**
 * 添加品牌
 * 
 * 修改品牌
 * 
 * 创建计划
 * 
 * 添加店铺计划
 */
import { formatDateTime } from "~/utils/data-utils.js";
class PlanManagement {
  constructor(context) {
    // super()
    this.context = context
  }

  /**
   * 添加品牌 - 修改品牌
   */
  async barndPlanFun() {
    let res = null;
    let { _data, $api, $Message } = this.context
    let { id, name, remark } = _data.formValidate;
    if (_data.modelType === "ADD") {
      //添加品牌
      res = await $api.addBrand({
        name,
        remark,
      });
    } else {
      //更新品牌
      res = await $api.updateShop({
        id,
        name,
        remark,
      });
    }
    _data.modalFlag = false;
    if (res) {
      const { data } = await $api.brand();
      _data.shopCount = data.count;
      _data.shopData = data.list;
      $Message.success("修改成功！");
    }
  }

  /**
   * 创建计划
   */
  async createPlanFun() {
    let stores = [];
    let shopList = [];
    let { _data, $api, $Message, $router } = this.context
    let { formItem, shopListData } = _data;
    stores = formItem.listShopName.map(shopItem => {
      return (shopListData.filter(item => shopItem == item.shopName))[0].id
    })
    shopList = stores.map(item => ({ id: item }))
    const res = await $api.createPlan({
      name: formItem.name,
      brandId: Number(formItem.brandId),
      demandAt: formatDateTime(formItem.demandAt, 'yyyy-mm'),
      readlineAt: formatDateTime(formItem.readlineAt, 'yyyy-mm-dd h:m'),
      shopList,
      stores,
    });
    this.routeJumpFun(res, '/plan-management')
  }

  /**
   * 加店铺计划
   */
  async addStorePlanFun() {
    let shopList = [];
    let { _data, $api, $Message, $router } = this.context
    let { formItem, shopListData, uuid } = _data;
    shopList = formItem.listShopName.map(shopItem => {
      return { id: (shopListData.filter(item => shopItem == item.shopName))[0].id }
    })

    const res = await $api.addStorePlan(uuid, {
      readlineAt: formItem.readlineAt,
      shopList
    });
    this.routeJumpFun(res, '/plan-management')
  }

  /**
   * 路由跳转
   * @param {*} res 
   */
  routeJumpFun(res, pagePath) {
    let { $Message, $router } = this.context
    if (res.status === 0) {
      $router.push({
        path: pagePath,
      })
      $Message.success(res.message)
    } else {
      $Message.warn(res.message)
    }
  }


}


export default PlanManagement;