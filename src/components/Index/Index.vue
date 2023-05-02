<template>
  <div v-if="jbanner && jhot && jnew">
    <IndexBanner :item="jbanner" />
    <IndexHot :item="jhot" />
    <IndexNew :item="jnew" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import IndexBanner from '../IndexBanner/IndexBanner.vue'
import IndexHot from '../IndexHot/IndexHot.vue'
import IndexNew from '../IndexNew/IndexNew.vue'

const jbanner = ref()
const jhot = ref()
const jnew = ref()

fetch('http://localhost:1314/index/index')
  .then((res) => res.json())
  .then((data: { msg: { ibanner: []; ihot: []; inew: [] } }) => {
    const { ibanner, ihot, inew } = data.msg
    jbanner.value = ibanner
    jhot.value = ihot
    jnew.value = inew
  })
</script>

<style scoped></style>
