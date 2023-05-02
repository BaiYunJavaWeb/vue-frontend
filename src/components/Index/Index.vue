<template>
  <div>
    <a-skeleton active :loading="!(jbanner && jhot && jnew)">
      <IndexBanner :item="jbanner" />
      <IndexRecom title="当前热销" alert="error" :item="jhot" width="350" />
      <IndexRecom title="新品推荐" alert="info" :item="jnew" width="250" />
    </a-skeleton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import IndexBanner from '../IndexBanner/IndexBanner.vue'
import IndexRecom from '../IndexRecom/IndexRecom.vue'

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
