<template>
  <div class="create-plan">
    <Card :bordered="true">
      <h2 slot="title">{{ title }}</h2>
      <Row class="create-plan-from">
        <Col span="10" offset="6">
          <Form
            ref="formValidate"
            :model="formItem"
            :rules="ruleValidate"
            :label-width="150"
          >
            <!-- 计划名称 -->
            <FormItem label="计划名称：" prop="name">
              <Input
                v-model="formItem.name"
                placeholder="请输入计划名称"
                v-if="title === '创建计划'"
              ></Input>
              <Select
                placeholder="请输入计划名称"
                v-else
                v-model="formItem.name"
                filterable
                clearable
                :remote-method="handelRemote"
                :loading="loading"
                @on-change="handelSelectRemote"
              >
                <Option
                  v-for="option in planNameList"
                  :value="option.uuid"
                  :key="option.uuid"
                  >{{ option.label }}</Option
                >
              </Select>
            </FormItem>

            <!-- 需求时间 -->
            <FormItem label="需求时间：" prop="demandAt">
              <DatePicker
                :disabled="disabled"
                :options="monthOptions"
                type="month"
                placeholder="请输入需求时间"
                v-model="formItem.demandAt"
                style="width: 100%"
              ></DatePicker>
            </FormItem>

            <!-- 提交截止时间 -->
            <FormItem label="提交截止时间：" prop="readlineAt">
              <DatePicker
                :options="timeOptions"
                type="date"
                format="yyyy-MM-dd HH:mm:ss"
                placeholder="请选择提交截止时间"
                v-model="formItem.readlineAt"
                style="width: 100%"
              ></DatePicker>
            </FormItem>

            <!-- 发送品牌 -->
            <FormItem label="发送品牌：" prop="brandId">
              <Select
                placeholder="请选择发送品牌"
                v-model="formItem.brandId"
                style="width: 100%"
                :disabled="disabled"
                @on-change="handelSelect"
              >
                <Option
                  v-for="item in sendBrandData"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
            </FormItem>

            <!-- 店铺 -->
            <FormItem label="店铺：" prop="listShopName">
              <div
                v-show="shopListData.length > 0"
                style="
                  border-bottom: 1px solid #e9e9e9;
                  padding-bottom: 6px;
                  margin-bottom: 6px;
                "
              >
                <Checkbox
                  :value="shopListCheckAll"
                  @click.prevent.native="handleCheckAll"
                  >全选</Checkbox
                >
              </div>
              <CheckboxGroup
                v-model="formItem.listShopName"
                @on-change="checkAllGroupChange"
              >
                <Checkbox
                  :label="item.label"
                  :value="item.id"
                  v-for="item in shopListData"
                  :key="item.id"
                  :disabled="item.disabled"
                ></Checkbox>
              </CheckboxGroup>
            </FormItem>

            <!-- 按钮组 -->
            <FormItem>
              <Button
                style="margin-left: 8px"
                class="create-plan-button"
                @click="handleReset('formValidate')"
                >返回</Button
              >
              <Button
                type="primary"
                class="create-plan-button"
                @click="handleSubmit('formValidate')"
                >提交</Button
              >
            </FormItem>
          </Form>
        </Col>
      </Row>
    </Card>
  </div>
</template>

<script>
import { debounce } from "~/utils";
import PlanManagement from "~/common-class/plan-management";
import { addPlanRuleValidate } from "~/utils/rule-validate.js";
import {
  monthOptions,
  timeOptions,
  formatDateTime,
} from "~/utils/data-utils.js";

export default {
  data() {
    return {
      planManagementClass: null,
      title: "创建计划",
      // 表单内容
      formItem: {
        name: "", // 计划名称
        demandAt: "", // 需求时间
        readlineAt: "", // 提交截止时间
        brandId: "品牌", // 发送品牌
        listShopName: [], // 店铺
      },
      // 表单规则
      ruleValidate: addPlanRuleValidate,
      // 设置需求时间可选项
      monthOptions: {
        disabledDate: monthOptions,
      },
      // 设置提交截止时间可选项
      timeOptions: {
        disabledDate: timeOptions,
      },

      // 发送品牌数组
      sendBrandData: [],
      // 店铺
      shopListData: [],
      indeterminate: true,
      shopListCheckAll: false, //全选

      // 是否可选
      disabled: false,

      loading: false, //远程搜索
      planNameList: [], //计划名称
      uuid:null,
    };
  },

  created() {
    let routeName = this.$route.params.page;
    switch (routeName) {
      // 创建计划
      case "create-plan":
        this.title = "创建计划";
        break;
      // 添加店铺计划
      case "add-store-plan":
        this.title = "添加店铺";
        this.disabled = true;
        break;
    }
    this.planManagementClass = new PlanManagement(this);
    this.getBrandList();
  },

  methods: {
    /**
     * 获取所有品牌数据
     */
    async getBrandList() {
      const { data } = await this.$api.brand();
      data.list.forEach((item) => {
        item.value = item.id;
        item.label = item.name;
      });
      this.sendBrandData = data.list;
    },

    /**
     * 返回
     */
    handleReset(name) {
      this.$refs[name].resetFields();
      this.$router.back();
    },

    /**
     * 提交
     */
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.title === "创建计划") {
            this.planManagementClass.createPlanFun();
          } else {
            this.planManagementClass.addStorePlanFun();
          }
        }
      });
    },

    /**
     * 下拉框事件
     */
    handelSelect(brandId) {
      this.searchShop(brandId);
    },

    /**
     * 店铺搜索
     */
    async searchShop(brandId) {
      const { data } = await this.$api.searchShop({
        brandId,
      });
      data.list.forEach((item) => {
        item.label = item.shopName;
      });
      this.shopListData = data.list;
    },

    /**
     * 全选按钮
     */
    async handleCheckAll() {
      this.shopListCheckAll = !this.shopListCheckAll;
      this.formItem.listShopName = this.shopListCheckAll
        ? this.shopListData.map((item) => item.shopName)
        : [];
    },

    /**
     * 点击单个checkbox按钮
     */
    checkAllGroupChange() {
      this.shopListCheckAll =
        this.formItem.listShopName.length >= this.shopListData.length;
    },

    /**
     * 远程搜索
     */
    handelRemote(planName) {
      let that = this;
      if (planName !== "") {
        this.loading = true;
        debounce(async function () {
          that.loading = false;
          let { data } = await that.$api.searchPlanFun({ planName });
          const list = data.list.map((item) => {
            return {
              label: item.name,
              uuid: item.uuid,
            };
          });
          that.planNameList = list.filter(
            (item) =>
              item.label.toLowerCase().indexOf(planName.toLowerCase()) > -1
          );
        }, 200)();
      } else {
        this.planNameList = [];
      }
    },

    /**
     * 远程搜索选中项事件
     */
    async handelSelectRemote(uuid) {
      const { data } = await this.$api.viewPlanFun({ uuid });
      this.formItem.demandAt = data.demandAt;
      this.formItem.readlineAt = data.readlineAt;
      this.formItem.brandId = data.brandId;
      this.uuid = uuid;
      
      await this.searchShop(data.brandId);

      this.formItem.listShopName = data.shopList.map((item) => {
        return (this.shopListData.filter(
          (curItem) => curItem.id == item.id
        )[0].disabled = true);
      });
    },
  },
};
</script>

<style scoped>
.create-plan-from {
  margin-top: 25px;
}

.create-plan-button {
  width: 100px;
}
</style>