<template>
  <Sider
    hide-trigger
    collapsible
    :collapsed-width="100"
    v-model="isCollapsed"
    width="240"
    ref="Sider"
  >
    <div class="logo-con">
      <img
        src="http://inventorytest.fandow.com/_nuxt/img/logo.0e73bdf.png"
        v-show="changeLogoFlag"
      />
      <img
        src="http://inventorytest.fandow.com/_nuxt/img/logo-min.f30334b.png"
        v-show="!changeLogoFlag"
      />
    </div>
    <Menu
      :open-names="['1']"
      active-name="1-2"
      theme="dark"
      width="auto"
      :class="menuitemClasses"
    >
      <!-- 一级导航 -->
      <div v-for="(item, index) in submenus" :key="item.id">
        <Submenu
          :name="item.id"
          v-if="item.children && item.children.length > 1"
        >
          <template slot="title">
            <Icon :type="item.type"></Icon>
            {{ item.content }}
          </template>
          <!-- 二级导航 -->
          <div v-for="(subItem, i) in item.children" :key="index + i">
            <Submenu v-if="subItem.children" :name="subItem.id">
              <template slot="title">
                <Icon :type="subItem.type"></Icon>
                <span class="text-over">{{ subItem.content }}</span>
              </template>
              <!-- 三级导航 -->
              <MenuItem
                class="menu-level-3"
                v-for="(threeItem, k) in subItem.children" 
                :name="threeItem.id"
                :key="index + i + k"
                :to="{name:threeItem.name}"
              >
                <span>{{ threeItem.content }}</span>
              </MenuItem>
            </Submenu>
            <MenuItem v-else :name="subItem.name" :to="{name:subItem.name}">
              <Icon :type="subItem.type"></Icon>
              <span class="text-over">{{ subItem.content }}</span>
            </MenuItem>
          </div>
        </Submenu>

        <!-- 没有下级导航 -->
        <MenuItem :name="item.id" v-else :to="{name:item.name}">
          <Icon :type="item.type"></Icon>
          <span>{{ item.content }}</span>
        </MenuItem>
      </div>
    </Menu>
  </Sider>
</template>

<script>
import { MENU } from "~/constants/menu.js";
export default {
  name: "SiderCom",
  data() {
    return {
      changeLogoFlag: true, //切换logo
      isCollapsed: false,
      submenus: MENU, //侧边栏数据
    };
  },
  computed: {
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    },
  },
  methods: {
    toggleCollapse() {
      this.$refs.Sider.toggleCollapse();
      this.changeLogoFlag = !this.changeLogoFlag;
    },
  },
};
</script>

<style scoped>
.ivu-layout-sider,
.ivu-menu-dark {
  background: #2f4050;
}

.layout-logo-left {
  width: 100%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}
.logo-con {
  padding: 25px 8px;
  text-align: center;
}
.logo-con img {
  height: 44px;
  width: auto;
}
.menu-icon {
  transition: all 0.3s;
}

.rotate-icon {
  transform: rotate(-90deg);
}

.menu-item span {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}

.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}

.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}

.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>