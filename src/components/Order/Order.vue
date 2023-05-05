<template>
  <div class="content">
    <div class="title">我的订单</div>
    <div>
      <a-table :dataSource="homeStore.orders" :columns="columns">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'paytype'">
            {{ record.paytype == 1 ? '支付宝' : record.paytype == 2 ? '微信' : '货到付款' }}
          </template>

          <template v-else-if="column.key === 'amount'">
            {{ record.goodName }}x{{ record.amount }}
          </template>

          <template v-else-if="column.key === 'address'">
            收货人: {{ record.name }}
            <br />
            联系电话: {{ record.phone }}
            <br />
            收货地址: {{ record.address }}
          </template>

          <template v-else-if="column.key === 'status'">
            <span v-if="record.status == 1" style="color: red">未支付</span>
            <span v-if="record.status == 2" style="color: green">已支付</span>
          </template>

          <template v-else-if="column.key === 'action'">
            <a-button v-if="record.status == 1" type="primary" @click="pay(record.id)"
              >支付</a-button
            >
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHomeStore } from '@/stores/home.store'
import Pay from '@/components/Pay/Pay.vue'
const homeStore = useHomeStore()
homeStore.initOrder()

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    align: 'center'
  },
  {
    title: '总价',
    dataIndex: 'total',
    key: 'total'
  },
  {
    title: '商品详情',
    dataIndex: 'amount',
    key: 'amount'
  },
  {
    title: '收货信息',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: '订单状态',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: '支付方式',
    dataIndex: 'paytype',
    key: 'paytype'
  },
  {
    title: '下单时间',
    dataIndex: 'systime',
    key: 'systime'
  },
  {
    title: '操作',
    key: 'action',
    width: 300
  }
]

const pay = (orderid: number) => {
  homeStore.orderid = orderid
  homeStore.currentComponent = Pay
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
