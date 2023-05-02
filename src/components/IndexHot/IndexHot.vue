<template>
  <div class="hot">
    <a-alert style="height: 60px; margin: 20px 0" message="热销推荐" type="error" />
    {{ hotList }}
  </div>
</template>

<script setup lang="ts">
import { onUpdated, reactive, ref } from 'vue'
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
}

const hotList = ref<Item[]>()

onUpdated(() => {
  hotList.value = props.item
})
const props = defineProps<{
  item?: Array<Item>
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
