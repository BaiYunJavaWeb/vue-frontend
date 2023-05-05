<template>
  <div class="content">
    <div class="title">修改密码</div>
    <a-form
      style="width: 50%; margin: 0 auto"
      :model="passwordForm"
      name="basic"
      autocomplete="off"
      @finish="onFinish"
    >
      <a-form-item
        label="旧密码"
        name="old_password"
        :rules="[{ required: true, message: '请输入旧密码!' }]"
      >
        <a-input v-model:value="passwordForm.old_password" />
      </a-form-item>

      <a-form-item
        label="新密码"
        name="password"
        :rules="[{ required: true, message: '请输入密码!' }]"
      >
        <a-input v-model:value="passwordForm.password" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 11 }">
        <a-button type="primary" html-type="submit">提交</a-button>
      </a-form-item>
    </a-form>
  </div>
  <a-modal
    v-model:visible="visible"
    title="修改密码"
    okText="确定"
    cancelText="取消"
    @ok="visible = false"
  >
    <p>{{ modalmsg }}</p>
  </a-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useManageStore } from '@/stores/manage.store'
import { encode } from '@/utils/crypto.util'
import router from '@/router'
const manageStore = useManageStore()
const passwordForm = ref({
  old_password: '',
  password: ''
})
const visible = ref<boolean>(false)

const modalmsg = ref<string>('')
const onFinish = (values: any) => {
  fetch('http://localhost:1314/admin/adminReset', {
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      username: manageStore.adminName,
      password: encode(values.password),
      oldPassword: encode(values.old_password)
    })
  }).then((res) => {
    if (res.status == 200) {
      manageStore.adminLogged = false
      router.push('adminlogin')
    } else {
      modalmsg.value = '旧密码错误'
      visible.value = true
    }
  })
}
</script>

<style scoped>
.content {
  min-height: 800px;
}
.title {
  color: #1890ff;
  font-size: 3em;
  padding-bottom: 1em;
  margin: 0;
  text-align: center;
}
</style>
