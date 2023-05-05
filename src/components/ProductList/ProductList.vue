<template>
  <div class="wrap">
    <div class="wrapc">
      <div class="card" v-for="product in homeStore.productList">
        <img
          style="cursor: pointer"
          :src="'http://localhost:1314/' + product.cover"
          width="240"
          @click="detail(product)"
        />
        <div class="name">{{ product.name }}</div>
        <div class="price">￥{{ product.price }}</div>
        <a-button style="float: right" @click="addToCart(product)">加入购物车</a-button>
      </div>
    </div>
    <div class="pagination">
      <a-config-provider :locale="zhCN">
        <a-pagination
          v-model:current="current"
          show-quick-jumper
          :total="homeStore.productList.length"
          @change="onChange"
        />
      </a-config-provider>
    </div>
  </div>
</template>

<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { useHomeStore } from '@/stores/home.store'
import { ref } from 'vue'
import Detail from '../Detail/Detail.vue'
const homeStore = useHomeStore()

const current = ref<number>(1)

const onChange = (pageNumber: number) => {
  homeStore.handlePage(pageNumber)
}

const detail = (product: any) => {
  homeStore.detail = product
  homeStore.currentComponent = Detail
}

const addToCart = (good: any) => {
  if (homeStore.cart.length && homeStore.cart.filter((el) => el.id == good.id)[0]) {
    homeStore.cart[homeStore.cart.findIndex((el) => el.id == good.id)].num += 1
  } else {
    homeStore.cart.push({
      id: good.id,
      name: good.name,
      price: good.price,
      num: 1
    })
  }
}
</script>

<style scoped>
.wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 5% 15%;
  min-height: 850px;
}
.wrapc {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
}
.card {
  margin: 10px;
  transition: 0.5s all;
  border: 2px solid #fff;
  padding: 5px;
  height: fit-content;
}
.card:hover {
  z-index: 1;
  border-color: #40a9ff;
}
.name {
  color: #999;
  font-size: 0.95em;
  margin: 10px 0 5px;
  text-transform: uppercase;
}
.price {
  color: #000;
  font-size: 1em;
  font-weight: 600;
  margin: 10px 0 5px;
  display: block;
}
.pagination {
  margin: 20px 0;
}
</style>
