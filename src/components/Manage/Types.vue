<template>
  <div class="content">
    <a-button style="margin: 10px" type="primary" @click="addType">添加类目</a-button>
    <a-table
      v-if="manageStore.typeList.length"
      :dataSource="manageStore.typeList"
      :columns="columns"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <a-button style="margin-right: 5px" type="primary" @click="updateType(record.id)">
            修改
          </a-button>
          <a-popconfirm
            title="确定删除该类目吗?"
            ok-text="确定"
            cancel-text="取消"
            @confirm="remove(record.id)"
          >
            <a-button style="margin-right: 5px" type="primary" danger> 删除 </a-button>
          </a-popconfirm>
        </template>
      </template>
    </a-table>

    <a-modal
      v-model:visible="visible"
      :title="title == 1 ? '新增类目' : '修改类目'"
      okText="确定"
      cancelText="取消"
      @ok="conform"
    >
      <a-form :model="manageStore.typeForm" name="basic" autocomplete="off">
        <a-form-item
          label="名称"
          name="name"
          :rules="[{ required: true, message: '请输入类目名!' }]"
        >
          <a-input v-model:value="manageStore.typeForm.name" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { useManageStore } from '@/stores/manage.store'
import { ref } from 'vue'
const manageStore = useManageStore()

const visible = ref<boolean>(false)
//1: 新增类目 2: 更新类目信息
const title = ref<number>()

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    align: 'center',
    width: 100
  },
  {
    title: '类目名',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
    width: 500
  },
  {
    title: '操作',
    key: 'action',
    width: 50
  }
]

manageStore.getTypeList()

const remove = (recid: number) => {
  manageStore.removeType(recid)
}

const addType = () => {
  manageStore.typeForm = {} as any
  title.value = 1
  visible.value = true
}

const updateType = (tid: number) => {
  manageStore.typeForm = manageStore.typeList.filter((el) => el.id == tid)[0]
  title.value = 2
  visible.value = true
}

const conform = () => {
  if (title.value == 1) {
    fetch('http://localhost:1314/type/typeSave', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(manageStore.typeForm)
    }).then((res) => {
      if (res.status == 200) {
        visible.value = false
        manageStore.getTypeList()
      }
    })
  } else if (title.value == 2) {
    fetch('http://localhost:1314/type/typeUpdate', {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(manageStore.typeForm)
    }).then((res) => {
      if (res.status == 200) {
        visible.value = false
        manageStore.getTypeList()
      }
    })
  } else {
    return
  }
}
</script>

<style scoped>
.content {
  min-height: 800px;
}
</style>
