<template>
  <div class="bg">
    <div style="padding: 10vh 0">
      <div style="font-size: 3em; text-align: center; margin: 20px 0">登录后台</div>
      <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 10 }"
        :wrapper-col="{ span: 4 }"
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
          <a-button size="large" type="primary" html-type="submit">登录</a-button>
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
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { encode } from '@/utils/crypto.util'
import { useManageStore } from '@/stores/manage.store'
const manageStore = useManageStore()
import router from '@/router'

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

const onFinish = () => {
  fetch(`http://localhost:1314/admin/login`, {
    method: 'POST',
    body: JSON.stringify({ ...formState, password: encode(formState.password) }),
    headers: {
      'content-type': 'application/json'
    }
  }).then((res) => {
    if (res.status === 401) {
      res.json().then((data) => {
        modalmsg.value = data.msg
        manageStore.adminLogged = false
        manageStore.adminName = ''
        visible.value = true
      })
    } else if (res.status === 200) {
      manageStore.adminLogged = true
      manageStore.adminName = formState.username
      router.push({ name: 'manage' })
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

<style scoped>
.bg {
  background: url('http://localhost:1314/slid2.jpg');
  background-size: 100% 100%;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
}
</style>
