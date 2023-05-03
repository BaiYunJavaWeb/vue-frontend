<template>
  <div style="background-color: white; padding: 10vh 0; min-height: 780px">
    <div style="color: #f07818; font-size: 3em; text-align: center; margin: 20px 0">用户登录</div>
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

      <div style="display: flex; justify-content: center">
        <a-button size="large" type="primary" html-type="submit">提交</a-button>
      </div>
    </a-form>
  </div>
  <a-modal
    v-model:visible="visible"
    title="登录"
    @ok="handleOk"
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
import { useHomeStore } from '@/stores/home.store'
import Index from '../Index/Index.vue'
import { encode } from '@/utils/crypto.util'
const homeStore = useHomeStore()
const visible = ref<boolean>(false)

const modalmsg = ref<string>('')

interface FormState {
  username: string
  password: string
}

const formState = reactive<FormState>({
  username: '',
  password: ''
})

const onFinish = (values: any) => {
  fetch(`http://localhost:1314/user/login`, {
    method: 'POST',
    body: JSON.stringify({ ...formState, password: encode(formState.password) }),
    headers: {
      'content-type': 'application/json'
    }
  }).then((res) => {
    if (res.status === 401) {
      res.json().then((data) => {
        modalmsg.value = data.msg
        visible.value = true
      })
    } else if (res.status === 200) {
      homeStore.selectedKeys = ['1']
      homeStore.currentComponent = Index
      homeStore.userLogged = true
    }
  })
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

const handleOk = () => {
  visible.value = false
}
</script>

<style scoped></style>
