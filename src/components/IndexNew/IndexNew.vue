<template>
  <div class="new">
    <a-alert style="height: 60px; margin: 20px 0" message="新品推荐" type="info" />
    {{ newList }}
  </div>
</template>

<script setup lang="ts">
import { onUpdated, ref } from 'vue'

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

const newList = ref<Item[]>()

onUpdated(() => {
  newList.value = props.item
})
const props = defineProps<{
  item?: Array<Item>
}>()
</script>

<style scoped>
.new {
  padding: 0 200px;
  background-color: white;
  margin-top: 100px;
  padding-top: 10px;
}
</style>
