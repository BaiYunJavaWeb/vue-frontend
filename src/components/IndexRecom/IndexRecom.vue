<template>
  <div class="wrap">
    <div class="recom">
      <a-alert style="height: 60px; margin: 20px 0" :message="props.title" :type="props.alert" />
      <div class="list">
        <div style="margin: 10px" v-for="item in props.item" :key="item.name">
          <img
            :src="'http://localhost:1314/' + item.cover"
            :width="props.width"
            @mouseenter="show($event)"
            @mouseleave="hide($event)"
          />
          <div
            :style="{ width: props.width + 'px' }"
            class="detail"
            @mouseenter="show($event)"
            @mouseleave="hide($event)"
          >
            <div style="cursor: pointer" @click="detail(item.id)"><eye-outlined />查看详情</div>
            <div style="cursor: pointer" @click="addToCart(item)" class="inchart">加入购物车</div>
          </div>
          <div>
            <div class="misc" v-if="homeStore.typeList">
              {{ homeStore.typeList.find((type) => type.id === item.typeId)?.name }}
              >
              {{ item.name }}
            </div>
            <div style="font-size: 1.5em; color: #999">￥{{ item.price }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { EyeOutlined } from '@ant-design/icons-vue'
import { useHomeStore } from '@/stores/home.store'
import Detail from '../Detail/Detail.vue'
const homeStore = useHomeStore()
interface Item {
  id: number
  name: string
  cover: string
  image1: string
  image2: string
  price: number
  intro: string
  stock: number
  typeId: number
  type?: string
}

const props = defineProps<{
  item: Array<Item>
  width: string
  title: string
  alert: string
}>()

const show = (e: any) => {
  e.target.parentNode.querySelector('.detail').style.display = 'flex'
}

const hide = (e: any) => {
  e.target.parentNode.querySelector('.detail').style.display = 'none'
}

const detail = (id: number) => {
  homeStore.detail = props.item.filter((el) => el.id == id)[0]
  homeStore.currentComponent = Detail
}

const addToCart = (good: (typeof props.item)[0]) => {
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
  background-color: white;
  margin-top: 100px;
  padding-top: 10px;
}
.recom {
  width: 1140px;
  margin: 0 auto;
}
.list {
  display: flex;
  flex-wrap: wrap;
}
.misc {
  font-size: 1em;
  color: #000;
  margin: 1em 0 0;
  font-weight: 600;
}
.detail {
  display: none;
  justify-content: space-around;
  height: 36px;
  align-items: center;
  color: white;
  background-color: rgba(0, 0, 0, 0.499);
  position: absolute;
  transform: translateY(-36px);
}
.inchart {
  border: 2px solid #fff;
  font-size: 0.8em;
  padding: 0.3em 1.5em;
  transition: 0.5s all ease;
}
.inchart:hover {
  border-color: #f07818;
  color: #f07818;
}
</style>
