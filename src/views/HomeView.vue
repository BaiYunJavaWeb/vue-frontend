<template>
  <div class="bg"></div>
  <a-layout>
    <a-layout-header class="layout">
      <div class="title">Shopping</div>
      <a-menu
        v-model:selectedKeys="homeStore.selectedKeys"
        mode="horizontal"
        :style="{ lineHeight: '64px', backgroundColor: 'white', width: '100%' }"
        @click="homeStore.handleMenuClick"
      >
        <a-menu-item key="1">首页</a-menu-item>
        <a-sub-menu popupClassName="submen" key="2">
          <template #icon>
            <expand-alt-outlined />
          </template>
          <template #title>商品分类</template>
          <a-menu-item-group title="商品分类">
            <a-menu-item
              :type="foodtype.id"
              v-for="foodtype in homeStore.typeList"
              :key="`good/goodList/${foodtype.id}`"
            >
              {{ foodtype.name }}
            </a-menu-item>
          </a-menu-item-group>
        </a-sub-menu>
        <a-menu-item key="top/topList/2">热销</a-menu-item>
        <a-menu-item key="top/topList/3">新品</a-menu-item>
        <template v-if="homeStore.userLogged">
          <a-menu-item key="5">我的订单</a-menu-item>
          <a-menu-item key="6">个人中心</a-menu-item>
          <a-menu-item key="7">退出</a-menu-item>
        </template>
        <template v-else>
          <a-menu-item key="8">注册</a-menu-item>
          <a-menu-item key="9">登录</a-menu-item>
        </template>
        <a-menu-item key="10" @click="$router.push('adminlogin')">后台管理</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content>
      <div class="content">
        <Component :is="homeStore.currentComponent" />
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Shopping ©2023 Created by 2020软件工程2班第13组
    </a-layout-footer>
  </a-layout>
</template>
<script setup lang="ts">
import { ExpandAltOutlined } from '@ant-design/icons-vue'
import { useHomeStore } from '@/stores/home.store'
const homeStore = useHomeStore()
homeStore.initPage()
</script>
<style scoped>
.bg {
  background: url('http://localhost:1314/slid2.jpg');
  background-size: 100% 100%;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: -999;
}
.ant-layout {
  background-color: rgba(0, 0, 0, 0);
}
.layout {
  display: flex;
  background-color: white;
}

.layout .title {
  font-size: 30px;
  margin-right: 20px;
}
</style>
