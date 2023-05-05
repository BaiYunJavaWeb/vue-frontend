<template>
  <div class="content">
    <div class="title">我的购物车</div>
    <div class="cart" v-if="homeStore.cart.length && homeStore.userLogged">
      <div style="display: flex; float: right; margin: 30px">
        <a-button danger @click="submit">去结算</a-button>
      </div>
      <a-table :dataSource="homeStore.cart" :columns="columns">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'price'"> ￥{{ record.price * record.num }} </template>

          <template v-else-if="column.key === 'num'">
            <a-input-number id="inputNumber" v-model:value="record.num" />
            当前数量：{{ record.num }}
          </template>

          <template v-else-if="column.key === 'action'">
            <a-button danger @click="remove(record.id)">删除</a-button>
          </template>
        </template>
      </a-table>
    </div>
    <a-empty v-else description="空空如也" />
  </div>
</template>

<script setup lang="ts">
import { useHomeStore } from '@/stores/home.store'
import Order from '../Order/Order.vue'
const homeStore = useHomeStore()
const columns = [
  {
    title: '商品ID',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '商品名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '商品总价',
    dataIndex: 'price',
    key: 'price'
  },
  { title: '商品数量', dataIndex: 'num', key: 'num' },
  {
    title: '操作',
    key: 'action'
  }
]
const remove = (goodid: number) => {
  homeStore.cart = homeStore.cart.filter((el) => el.id != goodid)
}
const submit = async () => {
  const tmpcart: any = []
  homeStore.cart.forEach((el) => {
    tmpcart.push({
      total: el.price * el.num,
      amount: el.num,
      name: homeStore.userInfo.name,
      phone: homeStore.userInfo.phone,
      address: homeStore.userInfo.address,
      userId: homeStore.userInfo.id,
      goodId: el.id
    })
  })
  await fetch('http://localhost:1314/order/add', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(tmpcart)
  }).then((res) => {
    if (res.status == 200) {
      homeStore.cart = []
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
}
</style>
