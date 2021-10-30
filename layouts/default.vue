<template>
  <div class="layout">
    <Layout class="layout-container">
      <!-- 左侧导航栏目 -->
      <v-sider ref="vSider" />
      <Layout>
        <!-- 头部 -->
        <v-header @collapsedSider="collapsedSider" />
        <!-- 内容区 -->
        <Content
          :style="{
            margin: '10px',
            background: '#fff',
            minHeight: '260px',
            padding: '20px',
          }"
        >
          <nuxt />
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import vSider from "~/components/sider-com";
import vHeader from "~/components/header-com";

export default {
  components: {
    vSider,
    vHeader,
  },

  methods: {
    collapsedSider() {
      this.$refs.vSider.toggleCollapse();
    },
  },
};
</script>

<style scoped>
.layout {
  background: #f5f7f9;
  position: relative;
  overflow: hidden;
}

.layout-container {
  display: flex;
  flex-direction: row;
  min-height: 100vh;
}
</style>