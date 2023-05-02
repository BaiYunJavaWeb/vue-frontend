<template>
  <div style="background-color: white; padding: 10vh 0; min-height: 780px">
    <div style="color: #f07818; font-size: 3em; text-align: center; margin: 20px 0">注册新用户</div>
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 9 }"
      :wrapper-col="{ span: 7 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="用户名"
        name="username"
        :rules="[{ required: true, message: '请输入用户名!' }]"
      >
        <a-input v-model:value="formState.username" />
      </a-form-item>

      <a-form-item
        label="密码"
        name="password"
        :rules="[{ required: true, message: '请输入密码!' }]"
      >
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <a-form-item label="收货人" name="name" :rules="[{ required: false }]">
        <a-input v-model:value="formState.name" />
      </a-form-item>

      <a-form-item label="收货电话" name="phone" :rules="[{ required: false }]">
        <a-input v-model:value="formState.phone" />
      </a-form-item>

      <a-form-item label="收货地址" name="address" :rules="[{ required: false }]">
        <a-input v-model:value="formState.address" />
      </a-form-item>

      <div style="display: flex; justify-content: center">
        <a-button size="large" type="primary" html-type="submit">提交</a-button>
      </div>
    </a-form>
  </div>
  <a-modal
    v-model:visible="visible"
    title="注册"
    @ok="handleOk"
    @cancel="handleOk"
    okText="确定"
    cancelText="取消"
    :keyboard="false"
    :maskClosable="false"
  >
    <p>{{ modalmsg }}</p>
  </a-modal>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import Login from '../Login/Login.vue'
import { useHomeStore } from '@/stores/home.store'
const homeStore = useHomeStore()

const visible = ref<boolean>(false)

const modalmsg = ref<string>('')

interface FormState {
  username: string
  password: string
  name: string
  phone: string
  address: string
}

const formState = reactive<FormState>({
  username: '',
  password: '',
  name: '',
  phone: '',
  address: ''
})

const onFinish = (values: any) => {
  fetch(`http://localhost:1314/user/register`, {
    method: 'POST',
    body: JSON.stringify(formState),
    headers: {
      'content-type': 'application/json'
    }
  })
    .then((res) => res.json())
    .then((data) => {
      modalmsg.value = data.msg
      visible.value = true
    })
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

const handleOk = () => {
  visible.value = false
  homeStore.selectedKeys = ['9']
  homeStore.currentComponent = Login
}
</script>

<style scoped></style>
