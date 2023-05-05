<template>
  <div class="content">
    <a-tabs animated v-if="manageStore.orderList" v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="全部订单">
        <order-table :item="manageStore.orderList" type="all" />
      </a-tab-pane>
      <a-tab-pane key="2" tab="未付款">
        <order-table :item="manageStore.orderUnpay" type="unpay" />
      </a-tab-pane>
      <a-tab-pane key="3" tab="已付款">
        <order-table :item="manageStore.orderPayed" type="payed" />
      </a-tab-pane>
      <a-tab-pane key="4" tab="配送中">
        <order-table :item="manageStore.orderDelivery" type="delivery" />
      </a-tab-pane>
      <a-tab-pane key="5" tab="已完成">
        <order-table :item="manageStore.orderDone" type="done" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import { useManageStore } from '@/stores/manage.store'
import OrderTable from '@/components/OrderTable/OrderTable.vue'
import { ref } from 'vue'
const manageStore = useManageStore()
manageStore.getOrderList()

const activeKey = ref('1')
</script>

<style scoped>
.content {
  min-height: 800px;
}
</style>
