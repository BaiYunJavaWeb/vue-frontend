<template>
  <a-tabs animated v-if="manageStore.goodList" v-model:activeKey="activeKey">
    <a-tab-pane key="1" tab="全部商品">
      <cus-table :item="manageStore.goodList" type="all"></cus-table>
    </a-tab-pane>
    <a-tab-pane key="2" tab="条幅推荐">
      <cus-table :item="manageStore.goodBanner" type="ibanner" />
    </a-tab-pane>
    <a-tab-pane key="3" tab="热销推荐">
      <cus-table :item="manageStore.goodHot" type="ihot" />
    </a-tab-pane>
    <a-tab-pane key="4" tab="新品推荐">
      <cus-table :item="manageStore.goodNew" type="inew" />
    </a-tab-pane>
    <template #rightExtra v-if="activeKey == '1'">
      <a-button class="tabs-extra-demo-button" @click="showModal">新增商品</a-button>
    </template>
  </a-tabs>

  <a-modal v-model:visible="visible" title="新增商品" okText="确定" cancelText="取消" @ok="addGood">
    <a-form :model="manageStore.goodForm" name="basic" autocomplete="off">
      <a-form-item
        label="名称"
        name="name"
        :rules="[{ required: true, message: '请输入商品名称!' }]"
      >
        <a-input v-model:value="manageStore.goodForm.name" />
      </a-form-item>

      <a-form-item
        label="价格"
        name="price"
        :rules="[{ required: true, message: '请输入商品价格!' }]"
      >
        <div>
          <a-input-number id="inputNumber" v-model:value="manageStore.goodForm.price" />
          当前值：{{ manageStore.goodForm.price }}
        </div>
      </a-form-item>

      <a-form-item
        label="类目"
        name="type"
        :rules="[{ required: true, message: '请输入商品类目!' }]"
      >
        <a-input v-model:value="manageStore.goodForm.typeId" />
      </a-form-item>

      <a-form-item
        label="介绍"
        name="intro"
        :rules="[{ required: true, message: '请输入商品介绍!' }]"
      >
        <a-input v-model:value="manageStore.goodForm.intro" />
      </a-form-item>

      <a-form-item
        label="库存"
        name="stock"
        :rules="[{ required: true, message: '请输入商品库存!' }]"
      >
        <div>
          <a-input-number id="inputNumber" v-model:value="manageStore.goodForm.stock" :min="1" />
          当前值：{{ manageStore.goodForm.stock }}
        </div>
      </a-form-item>

      <a-form-item label="主图" name="cover" :rules="[{ required: true, message: '请上传主图!' }]">
        <a-upload
          v-model:file-list="coverList"
          name="file"
          :max-count="1"
          action="http://localhost:1314/good/fileUpload"
          @change="handleChange"
        >
          <a-button>
            <upload-outlined></upload-outlined>
            点击选择文件上传
          </a-button>
        </a-upload>
      </a-form-item>

      <a-form-item
        label="图片1"
        name="image1"
        :rules="[{ required: true, message: '请上传图片1!' }]"
      >
        <a-upload
          v-model:file-list="image1List"
          :max-count="1"
          name="file"
          action="http://localhost:1314/good/fileUpload"
          @change="handleChange"
        >
          <a-button>
            <upload-outlined></upload-outlined>
            点击选择文件上传
          </a-button>
        </a-upload>
      </a-form-item>

      <a-form-item
        label="图片2"
        name="image2"
        :rules="[{ required: true, message: '请上传图片2!' }]"
      >
        <a-upload
          v-model:file-list="image2List"
          :max-count="1"
          name="file"
          action="http://localhost:1314/good/fileUpload"
          @change="handleChange"
        >
          <a-button>
            <upload-outlined></upload-outlined>
            点击选择文件上传
          </a-button>
        </a-upload>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UploadOutlined } from '@ant-design/icons-vue'
import type { UploadChangeParam } from 'ant-design-vue'
import { useManageStore } from '@/stores/manage.store'
import CusTable from '../CusTable/CusTable.vue'
const manageStore = useManageStore()

const activeKey = ref('1')

const visible = ref<boolean>(false)
const coverList = ref([])
const image1List = ref([])
const image2List = ref([])

manageStore.getGoodList()

const showModal = () => {
  manageStore.goodForm = { stock: 1 } as any
  visible.value = true
}

const addGood = () => {
  visible.value = false
}

const handleChange = (info: UploadChangeParam) => {
  if (info.file.status === 'done') {
    console.log(manageStore.goodForm.cover)
  }
}
</script>

<style>
.tabs-extra-demo-button {
  margin-right: 16px;
}

.ant-row-rtl .tabs-extra-demo-button {
  margin-right: 0;
  margin-left: 16px;
}
</style>
