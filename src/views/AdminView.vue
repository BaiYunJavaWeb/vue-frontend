<template>
  <a-layout>
    <a-layout-header class="layout">
      <div class="title">Shopping后台管理</div>
      <a-menu
        style="width: 100%"
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1">订单管理</a-menu-item>
        <a-menu-item key="2">客户管理</a-menu-item>
        <a-menu-item key="3">商品管理</a-menu-item>
        <a-menu-item key="4">类目管理</a-menu-item>
        <a-menu-item key="5">修改密码</a-menu-item>
        <a-menu-item key="6">退出</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content></a-layout-content>
    <a-layout-footer style="text-align: center">
      Shopping ©2023 Created by 2020软件工程2班第13组
    </a-layout-footer>
  </a-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedKeys = ref<string[]>(['1'])
</script>

<style scoped>
.layout {
  display: flex;
}

.layout .title {
  color: white;
  font-size: 30px;
  margin-right: 20px;
  cursor: default;
}
</style>
