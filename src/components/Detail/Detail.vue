<template>
  <div class="content">
    <div style="width: 50%">
      <a-carousel
        style="width: 60%; margin: 0 auto; background-color: rgba(168, 168, 168, 0.226)"
        effect="fade"
        autoplay
      >
        <img :src="getImgUrl(homeStore.detail.cover)" />
        <img :src="getImgUrl(homeStore.detail.image1)" />
        <img :src="getImgUrl(homeStore.detail.image2)" />
      </a-carousel>
    </div>
    <div style="width: 20%">
      <div style="font-size: 2em; line-height: 1.6em; color: #5d4b33; margin-bottom: 0.5em">
        {{ homeStore.detail.name }}
      </div>
      <div>
        分类:
        <span style="color: #999">
          {{ homeStore.typeList.find((type) => type.id === homeStore.detail.typeId)?.name }}
        </span>
      </div>
      <div>
        介绍:
        <span style="color: #999">
          {{ homeStore.detail.intro }}
        </span>
      </div>
      <div style="font-size: 1.5em; color: #000; margin: 20px 0">
        ￥{{ homeStore.detail.price }}
      </div>
      <a-button type="primary">加入购物车</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHomeStore } from '@/stores/home.store'
const homeStore = useHomeStore()
const baseUrl = 'http://localhost:1314/'
const getImgUrl = (pic: string) => {
  return baseUrl + pic
}
</script>

<style scoped>
.content {
  min-height: 850px;
  background-color: #f0f2f5;
  display: flex;
  padding: 120px;
}
</style>
