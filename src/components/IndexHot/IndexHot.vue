<template>
  <div class="hot">
    <a-alert style="height: 60px; margin: 20px 0" message="热销推荐" type="error" />
    <div>
      {{ props.item }}
    </div>
  </div>
</template>

<script setup lang="ts">
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
}>()
</script>

<style scoped>
.hot {
  padding: 0 200px;
  background-color: white;
  margin-top: 100px;
  padding-top: 10px;
}
</style>
