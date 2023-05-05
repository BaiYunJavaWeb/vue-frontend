<template>
  <div class="content">
    <div class="title">选择支付方式</div>
    <div style="display: flex">
      <img
        style="margin: 10px; border: 1px solid rgba(0, 0, 0, 0.137)"
        src="http://localhost:1314/alipay.jpg"
        @click="pay(1)"
        width="250"
      />
      <img
        style="margin: 10px; border: 1px solid rgba(0, 0, 0, 0.137)"
        src="http://localhost:1314/wechat.jpg"
        @click="pay(2)"
        width="250"
      />
      <img
        style="margin: 10px; border: 1px solid rgba(0, 0, 0, 0.137)"
        src="http://localhost:1314/offline.jpg"
        @click="pay(3)"
        width="250"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useHomeStore } from '@/stores/home.store'
import Order from '../Order/Order.vue'
const homeStore = useHomeStore()
const pay = (paytype: number) => {
  const requestBody = {
    id: homeStore.orderid,
    paytype: paytype
  }

  fetch(`http://localhost:1314/order/pay`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  }).then((res) => {
    if (res.status == 200) {
      homeStore.currentComponent = Order
    }
  })
}
</script>
<style scoped>
.content {
  min-height: 850px;
  background-color: #ffffff;
  padding: 20px 200px;
}
.title {
  font-size: 3.5em;
  margin-bottom: 30px;
}
</style>
