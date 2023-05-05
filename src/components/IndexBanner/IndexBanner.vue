<template>
  <div class="banner">
    <div>
      <div class="one" @click="detail">{{ props.item[0].name }}</div>
      <div class="two">今日精选推荐</div>
      <div class="three" @click="addToCart(props.item[0])">加入购物车</div>
    </div>
    <div>
      <img :src="'http://localhost:1314/' + props.item[0].cover" width="350" height="350" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHomeStore } from '@/stores/home.store'
import Detail from '../Detail/Detail.vue'
const homeStore = useHomeStore()
const props = defineProps<{
  item: Array<{
    id: number
    name: string
    cover: string
    image1: string
    image2: string
    price: number
    intro: string
    stock: number
    typeId: number
  }>
}>()

const detail = () => {
  homeStore.detail = props.item[0]
  homeStore.currentComponent = Detail
}
const addToCart = (good: (typeof props.item)[0]) => {
  if (homeStore.cart.length && homeStore.cart.filter((el) => el.id == good.id)) {
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
.banner {
  position: relative;
  background-color: #f2f6f7;
  padding: 12em 0 0;
  min-height: 600px;
  display: flex;
  justify-content: space-evenly;
}
.one {
  font-size: 6em;
  font-family: 'Marvel-Regular';
  color: #5d4b33;
  font-weight: 800;
  transition: 0.5s all ease;
  cursor: pointer;
}
.one:hover,
.three:hover {
  color: #f07818;
}
.three:hover {
  border: 7px solid #f07818;
}
.two {
  font-size: 1.3em;
  margin: 1em 0 3em;
  letter-spacing: 7px;
  font-weight: 700;
  color: #f07818;
}
.three {
  font-size: 1.5em;
  color: #5d4b33;
  font-weight: 800;
  padding: 0.5em 3em;
  border: 7px solid #5d4b33;
  transition: 0.5s all ease;
  cursor: pointer;
}
</style>
