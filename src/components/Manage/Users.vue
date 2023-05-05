<template>
  <div class="content">
    <a-button style="margin: 10px" type="primary" @click="addUser">添加客户</a-button>
    <a-table
      v-if="manageStore.userList.length"
      :dataSource="manageStore.userList"
      :columns="columns"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <a-button style="margin-right: 5px" type="primary" @click="resetPsw(record.id)">
            重置密码
          </a-button>
          <a-button style="margin-right: 5px" type="primary" @click="updateUser(record.id)">
            修改
          </a-button>
          <a-popconfirm
            title="确定删除该用户吗?"
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
      :title="title == 1 ? '新增用户' : '更新用户信息'"
      okText="确定"
      cancelText="取消"
      @ok="conform"
    >
      <a-form :model="manageStore.userForm" name="basic" autocomplete="off">
        <a-form-item
          label="用户名"
          name="username"
          :rules="[{ required: true, message: '请输入用户名!' }]"
        >
          <a-input v-model:value="manageStore.userForm.username" />
        </a-form-item>

        <a-form-item
          label="密码"
          name="password"
          :rules="[{ required: true, message: '请输入密码!' }]"
        >
          <a-input v-model:value="manageStore.userForm.password" />
        </a-form-item>

        <a-form-item
          label="收货人"
          name="name"
          :rules="[{ required: true, message: '请输入收货人姓名!' }]"
        >
          <a-input v-model:value="manageStore.userForm.name" />
        </a-form-item>

        <a-form-item
          label="联系电话"
          name="phone"
          :rules="[{ required: true, message: '请输入联系电话!' }]"
        >
          <a-input v-model:value="manageStore.userForm.phone" />
        </a-form-item>

        <a-form-item
          label="收货地址"
          name="address"
          :rules="[{ required: true, message: '请输入收货地址!' }]"
        >
          <a-input v-model:value="manageStore.userForm.address" />
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
//1: 新增用户 2: 更新用户信息
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
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
    align: 'center',
    width: 200
  },
  {
    title: '电话',
    dataIndex: 'phone',
    key: 'phone',
    align: 'center',
    width: 200
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
    align: 'center',
    width: 500
  },
  {
    title: '操作',
    key: 'action',
    width: 300
  }
]
manageStore.getUserList()

const remove = (recid: number) => {
  manageStore.removeUser(recid)
}
const addUser = () => {
  title.value = 1
  visible.value = true
}
const updateUser = (uid: number) => {
  manageStore.userForm = manageStore.userList.filter((el) => el.id == uid)[0]
  title.value = 2
  visible.value = true
}
const conform = () => {
  if (title.value == 1) {
    fetch('http://localhost:1314/user/register', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(manageStore.userForm)
    }).then((res) => {
      if (res.status == 200) {
        visible.value = false
        manageStore.userForm = {} as any
        manageStore.getUserList()
      }
    })
  } else if (title.value == 2) {
    fetch('http://localhost:1314/user/userUpdate', {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(manageStore.userForm)
    }).then((res) => {
      if (res.status == 200) {
        visible.value = false
        manageStore.userForm = {} as any
        manageStore.getUserList()
      }
    })
  } else {
    return
  }
}
const resetPsw = (id: number) => {
  fetch('http://localhost:1314/user/reset', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      id: id
    })
  }).then((res) => {
    if (res.status == 200) {
      manageStore.getUserList()
    }
  })
}
</script>

<style scoped>
.content {
  min-height: 800px;
}
</style>
