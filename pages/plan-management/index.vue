<template>
  <Card :bordered="true">
    <div class="play-button-wrap" slot="title">
      <Button type="primary" @click="addScheduledEvent('create-plan')"
        >创建计划</Button
      >
      <Button type="primary" @click="addScheduledEvent('add-store-plan')"
        >添加店铺计划</Button
      >
    </div>
    <Table border ref="selection" :columns="columns" :data="planData"></Table>
    <!-- 分页 -->
    <page-com
      :totalNum="planCount"
      :pageSize="pageSize"
      @handlePageChange="handlePageChange"
      @handlePageSizeChange="handlePageSizeChange"
    ></page-com>
  </Card>
</template>

<script>
import pageCom from "~/components/page-com";
import { stockingPlan, statusEnum } from "~/constants/stocking-plan.js";
export default {
  name: "PlanManagement",
  components: {
    pageCom,
  },
  async asyncData(context) {
    let { app } = context;
    const { data } = await app.$api.plan({
      page: 1,
      perPage: 10,
    });
    data.list.forEach((item) => {
      item.status = statusEnum[item.status];
    });
    return {
      planCount: data.count,
      planData: data.list,
    };
  },
  data() {
    return {
      curPage: 1, //当前第几页
      pageSize: 10, //每页显示多少条数据
      columns: stockingPlan,
    };
  },
  methods: {
    /**
     * 添加计划按钮事件
     * 创建计划 ：create-plan
     * 添加店铺计划 ： add-store-plan
     **/
    addScheduledEvent(type) {
      this.$router.push({
        path: `/plan-management/${type}`,
      });
    },
    /**
     * 页码改变的回调，返回改变后的页码
     */
    async handlePageChange(curPage) {
      const { data } = await this.$api.plan({
        page: curPage,
        perPage: this.pageSize,
      });
      data.list.forEach((item) => {
        item.status = statusEnum[item.status];
      });
      this.curPage = curPage;
      this.planCount = data.count;
      this.planData = data.list;
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
</style>