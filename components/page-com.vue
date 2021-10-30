<template>
  <div style="margin: 10px; overflow: hidden">
    <div style="float: left">共{{ totalNum }}条</div>
    <div style="float: right">
      <Page
        :total="totalNum"
        size="small"
        show-elevator
        show-sizer
        :page-size="pageSize"
        @on-change="handlePageChange"
        @on-page-size-change="handlePageSizeChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "PageCom",
  props: {
    totalNum: {
      type: Number,
      require: true,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
  },

  created(){
    console.log('this',this)
  },
  methods: {
    /**
     * 页码改变的回调，返回改变后的页码
     */
    handlePageChange(curPage) {
      this.$emit("handlePageChange", curPage);
    },

    /**
     * 切换每页条数时的回调，返回切换后的每页条数
     */
    handlePageSizeChange(num) {
      this.$emit("handlePageSizeChange", num);
    },
  },
};
</script>