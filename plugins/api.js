/**
 * 项目中所有接口对象
 * http://yapi.tfgg5.com/project/264/interface/api/18641
 */


export default ({ app: { $request } }, inject) => {
  inject('api', {
    /**
     * 品牌列表 /brand - GET 
     * @param {*}  
     * @returns 
     */
    brand(data) {
      return $request.get('/brand', data)
    },

    /**
     * 添加品牌 /brand - POST 
     * @param {*} data 
     */
    addBrand(data) {
      return $request.post('/brand', data)
    },

    /**
     * 删除品牌 /brand/{id} - DELETE
     * @param {*} data 
     */
    deleteBrand(data) {
      return $request.delete(`/brand/${data.id}`)
    },

    /**
     * 更新品牌 /brand/{id} - PATCH
     * @param {*} data 
     */
    updateShop(data) {
      return $request.patch(`/brand/${data.id}`, data)
    },

    /**
     * 品备货计划管理 - 计划列表 - GET
     * @param {*}  
     * @returns 
     */
    plan(data) {
      return $request.get('/plan', data)
    },

    /**
     * 备货计划管理 - 添加店铺计划 - POST
     * @param {*}  
     * Query：
     *      brandId
     * @returns 
     */
     addStorePlan(uuid,data) {
       console.log('uuid,data',uuid,data)
      return $request.post(`/plan/${uuid}/shop`, data)
    },

    /**
     * 店铺搜索 - 创建计划 - GET
     * @param {*}  
     * Query：
     *      brandId
     * @returns 
     */
    searchShop(data) {
      return $request.get(`/search/shop`, data)
    },

    /**
     * 备货计划管理 - 创建计划 - POST
     * @param {*}  
     * @returns 
     */
    createPlan(data) {
      return $request.post('/plan', data)
    },

    /**
     * 备货计划管理 - 搜索计划 GET
     * @param {*} data 
     * @returns 
     */
    searchPlanFun(data) {
      return $request.get('/plan/search', data)
    },

    /**
     * 备货计划管理 - 查看计划 - GET
     * @param {*} data 
     * @returns 
     */
     viewPlanFun(data) {
      return $request.get(`/plan/${data.uuid}`)
    },
  })
}