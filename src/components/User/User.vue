<template>
  <div class="content">
    <div class="title">个人中心</div>
    <div>
      <div style="width: 30%; margin: 20px auto; font-size: 28px">收货信息</div>
      <a-form
        :model="homeStore.userInfo"
        name="basic"
        style="width: 30%; margin: 0 auto"
        autocomplete="off"
        @finish="updateInfo"
      >
        <a-form-item
          label="收货人姓名"
          name="name"
          :rules="[{ required: true, message: '请输入收货人姓名!' }]"
        >
          <a-input v-model:value="homeStore.userInfo.name" />
        </a-form-item>

        <a-form-item
          label="收货人电话"
          name="phone"
          :rules="[{ required: true, message: '请输入收货人电话!' }]"
        >
          <a-input v-model:value="homeStore.userInfo.phone" />
        </a-form-item>

        <a-form-item
          label="收货人地址"
          name="address"
          :rules="[{ required: true, message: '请输入收货人地址!' }]"
        >
          <a-input v-model:value="homeStore.userInfo.address" />
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 11 }">
          <a-button type="primary" html-type="submit">提交</a-button>
        </a-form-item>
      </a-form>
    </div>
    <div>
      <div style="width: 30%; margin: 20px auto; font-size: 28px">账户信息</div>
      <a-form
        :model="userSecurityForm"
        name="basic"
        style="width: 30%; margin: 0 auto"
        autocomplete="off"
        @finish="updatePsw"
      >
        <a-form-item
          label="原密码"
          name="old_password"
          :rules="[{ required: true, message: '请输入原密码!' }]"
        >
          <a-input v-model:value="userSecurityForm.old_password" />
        </a-form-item>
        <a-form-item
          label="新密码"
          name="password"
          :rules="[{ required: true, message: '请输入新密码!' }]"
        >
          <a-input v-model:value="userSecurityForm.password" />
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 11 }">
          <a-button type="primary" html-type="submit">提交</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useHomeStore } from '@/stores/home.store'
import { notification } from 'ant-design-vue'
import { encode } from '@/utils/crypto.util'
const homeStore = useHomeStore()

const userSecurityForm = ref({
  old_password: '',
  password: ''
})

const updateInfo = (value: { name: string; phone: number; address: string }) => {
  fetch('http://localhost:1314/user/updateInfo', {
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ ...value, id: homeStore.userInfo.id })
  }).then((res) => {
    if (res.status == 200) {
      notification['success']({
        message: '提示',
        description: '用户信息更新成功.'
      })
    } else {
      notification['error']({
        message: '提示',
        description: '用户信息失败.'
      })
    }
  })
}
const updatePsw = (value: { old_password: string; password: string }) => {
  fetch('http://localhost:1314/user/updatePsw', {
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      username: encode(value.old_password),
      password: encode(value.password),
      id: homeStore.userInfo.id
    })
  }).then((res) => {
    if (res.status == 200) {
      notification['success']({
        message: '提示',
        description: '用户密码更新成功.'
      })
    } else {
      notification['error']({
        message: '提示',
        description: '用户密码更新失败，请检查原密码'
      })
    }
  })
}
</script>

<style scoped>
.content {
  min-height: 850px;
  background-color: #f0f2f5;
  padding-top: 60px;
}
.title {
  color: #f17a18;
  font-size: 3em;
  padding-bottom: 1em;
  margin: 0;
  text-align: center;
}
</style>
