<template>
  <div class="brand-management">
    <Card :bordered="true">
      <div class="play-button-wrap" slot="title">
        <Button type="primary" @click="addBrand">添加品牌</Button>
      </div>

      <!-- 表单 -->
      <Table border :columns="columns" :data="shopData"></Table>

      <!-- 分页 -->
      <page-com
        :totalNum="shopCount"
        :pageSize="pageSize"
        @handlePageChange="handlePageChange"
        @handlePageSizeChange="handlePageSizeChange"
      ></page-com>
    </Card>

    <Modal v-model="modalFlag" :title="modalText" mask footer-hide>
      <Form
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        :label-width="100"
      >
        <FormItem
          label="品牌名称"
          prop="brandName"
          v-if="modelType === 'UPDATE'"
        >
          <Input
            v-model="formValidate.brandName"
            maxlength="32"
            disabled
          ></Input>
        </FormItem>
        <FormItem :label="brandLabel" prop="name">
          <Input v-model="formValidate.name" maxlength="32"></Input>
        </FormItem>
        <FormItem label="备注">
          <Input
            v-model="formValidate.remark"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 8 }"
          ></Input>
        </FormItem>
        <FormItem>
          <Button style="margin-left: 8px" @click="handleReset('formValidate')"
            >取消</Button
          >
          <Button type="primary" @click="handleSubmit('formValidate')"
            >确认</Button
          >
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import pageCom from "~/components/page-com";
import PlanManagement from "~/common-class/plan-management";
import { brandRuleValidate } from "~/utils/rule-validate.js";

export default {
  components: {
    pageCom,
  },
  validate(validate) {
    return true; // 如果参数有效
  },
  data() {
    return {
      curPage: 1, //当前第几页
      pageSize: 10, //每页显示多少条数据
      planManagementClass: null,
      columns: [
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center",
        },
        {
          title: "品牌名称",
          key: "name",
        },
        {
          title: "创建人",
          key: "createdBy",
        },
        {
          title: "创建时间",
          key: "createdAt",
        },
        {
          title: "备注",
          key: "remark",
        },
        {
          title: "店铺管理",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            let that = this;
            return h("div", [
              h(
                "a",
                {
                  style: {
                    textDecoration: "underline",
                  },
                  on: {
                    click: () => {
                      console.log("店铺管理");
                    },
                  },
                },
                "查看店铺"
              ),
            ]);
          },
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            let that = this;
            return h("div", [
              h("span", {
                style: {
                  fontSize: "25px",
                  marginRight: "15px",
                  color: "#559DF9",
                },
                domProps: {
                  // 添加标签,使用自己引入的iconfont图标
                  innerHTML: "<i class='iconfont icon-edit'></i>",
                },
                on: {
                  click: () => {
                    that.updateBrand(params);
                  },
                },
              }),
              h("span", {
                style: {
                  fontSize: "25px",
                  color: "#000",
                },
                domProps: {
                  // 添加标签,使用自己引入的iconfont图标
                  innerHTML: "<i class='iconfont icon-delete'></i>",
                },
                on: {
                  click: () => {
                    that.deleteBrand(params);
                  },
                },
              }),
            ]);
          },
        },
      ],

      formValidate: {
        id: "",
        brandName: "", //只读
        name: "", //必填
        remark: "", //选填
      },

      modalFlag: false, //弹出窗
      modalText: "",
      modelType: "ADD", //模态框类型 添加(ADD) / 编辑(UPDATE)
      // 弹出窗校验规则
      ruleValidate: brandRuleValidate,
      brandLabel: "品牌名称", //添加品牌(品牌名称)/编辑品牌(新品牌名称)
    };
  },
  created(){
    console.log('created',this.$router,this.$route)
  },
  /**
   * 能够通过服务端的方式将数据生成html文档格式（服务端进行拼接并返回前端渲染）
   * 优点：方便seo
   */
  async asyncData(context) {
    let { app } = context;
    const { data } = await app.$api.brand({
      page: 1,
      perPage: 10,
    });
    console.log("优点：方便seo",data);
    return {
      shopCount: data.count,
      shopData: data.list,
    };
  },
  created() {
    this.planManagementClass = new PlanManagement(this);
  },

  methods: {
    ...mapMutations("brandMessage", ["SET_isLogin"]),

    /**
     * 添加品牌
     **/
    addBrand() {
      this.modalFlag = true;
      this.modalText = "添加品牌";
      this.modelType = "ADD";
      this.brandLabel = "品牌名称";
      this.formValidate = {
        brandName: "", //只读
        name: "", //必填
        remark: "", //选填
      };
      this.SET_isLogin(true);
    },

    /**
     * 更新品牌
     **/
    async updateBrand(params) {
      console.log("params.row", params.row);
      this.modalFlag = true;
      this.modalText = "编辑品牌";
      this.modelType = "UPDATE";
      this.brandLabel = "新品牌名称";
      this.formValidate = {
        id: params.row.id,
        brandName: params.row.name, //只读
        name: "", //必填
        remark: params.row.remark, //选填
      };
    },

    /**
     * 删除品牌
     */
    deleteBrand(params) {
      this.$Modal.confirm({
        title: "删除品牌",
        content: "确定删除该品牌吗？",
        onOk: async () => {
          const res = await this.$api.deleteBrand({
            id: params.row.id,
          });
          if (res) {
            this.$Message.success("删除成功！");
            const { data } = await this.$api.brand();
            this.shopCount = data.count;
            this.shopData = data.list;
          }
        },
      });
    },

    /**
     * 提交
     **/
    handleSubmit(name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          this.planManagementClass.barndPlanFun();
        }
      });
    },

    handleReset(name) {
      this.$refs[name].resetFields();
      this.modalFlag = false;
    },

    /**
     * 页码改变的回调，返回改变后的页码
     */
    async handlePageChange(curPage) {
      const { data } = await this.$api.brand({
        page: curPage,
        perPage: this.pageSize,
      });
      this.curPage = curPage;
      this.shopCount = data.count;
      this.shopData = data.list;
    },

    /**
     * 切换每页条数时的回调，返回切换后的每页条数
     */
    handlePageSizeChange(num) {
      this.pageSize = num;
      this.handlePageChange(this.curPage);
    },
  },
};
</script>


<style scoped>
.play-button-wrap {
  margin-bottom: 25px;
}
/deep/ .ivu-form-item-content {
  display: flex;
  justify-content: flex-end;
}
/deep/ .ivu-btn-default {
  margin-right: 20px;
}
</style>