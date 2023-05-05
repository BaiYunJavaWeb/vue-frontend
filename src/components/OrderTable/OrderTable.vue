<template>
  <a-table :dataSource="props.item" :columns="columns">
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
        <span v-if="record.status == 1" style="color: red">未付款</span>
        <span v-if="record.status == 2" style="color: blue">已付款</span>
        <span v-if="record.status == 3" style="color: orange">配送中</span>
        <span v-if="record.status == 4" style="color: green">已完成</span>
      </template>

      <template v-else-if="column.key === 'action'">
        <a-button @click="manageStore.setStatus(record.id, 1)" style="margin: 5px">
          未支付
        </a-button>
        <a-button @click="manageStore.setStatus(record.id, 2)" style="margin: 5px">
          已支付
        </a-button>
        <a-button @click="manageStore.setStatus(record.id, 3)" style="margin: 5px">
          配送中
        </a-button>
        <a-button @click="manageStore.setStatus(record.id, 4)" style="margin: 5px">
          已完成
        </a-button>
        <a-button @click="manageStore.setStatus(record.id, 5)" style="margin: 5px" danger>
          删除订单
        </a-button>
      </template>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import { useManageStore } from '@/stores/manage.store'
const manageStore = useManageStore()
interface IOrder {
  id: number
  total: number
  amount: number
  status: number
  paytype: number
  name: number
  phone: number
  address: number
  systime: Date
  userId: number
  goodName: string
}

const props = defineProps<{
  item: Array<IOrder>
  type: string
}>()

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
    title: '下单用户ID',
    dataIndex: 'userId',
    key: 'userId'
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
</script>

<style scoped></style>
