<template>
  <a-table :dataSource="props.item" :columns="columns">
    <template #bodyCell="{ column, record }">
      <!-- 图片 -->
      <template v-if="column.key === 'cover'">
        <img :src="'http://localhost:1314/' + record.cover" width="200" />
      </template>
      <!-- 类别 -->
      <template v-else-if="column.key === 'typeId'">
        {{ manageStore.typeList.find((type) => type.id === record.typeId)?.name }}
      </template>
      <!-- 操作 -->
      <template v-else-if="column.key === 'action'">
        <a-button
          style="margin-right: 5px"
          v-if="props.type == 'ibanner'"
          @click="topRemove(1, record.id)"
          danger
        >
          移出条幅
        </a-button>
        <a-button style="margin-right: 5px" v-else @click="topAdd(1, record.id)">
          加入条幅
        </a-button>

        <a-button
          style="margin-right: 5px"
          v-if="props.type == 'ihot'"
          @click="topRemove(2, record.id)"
          danger
        >
          移出热销
        </a-button>
        <a-button style="margin-right: 5px" v-else @click="topAdd(2, record.id)">
          加入热销
        </a-button>

        <a-button
          style="margin-right: 5px"
          v-if="props.type == 'inew'"
          @click="topRemove(3, record.id)"
          danger
        >
          移出新品
        </a-button>
        <a-button style="margin-right: 5px" v-else @click="topAdd(3, record.id)">
          加入新品
        </a-button>
        <br />
        <br />
        <a-button style="margin-right: 5px" @click="modify(record.id)">修改</a-button>

        <a-popconfirm
          title="确定删除这件商品吗?"
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
    title="修改商品"
    okText="确定"
    cancelText="取消"
    @ok="updateGood"
  >
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
const manageStore = useManageStore()
interface IGood {
  id: number
  name: string
  cover: string
  image1: string
  image2: string
  price: number
  intro: string
  stock: number
  typeId: number
}
const props = defineProps<{
  item: Array<IGood>
  type: string
}>()

const visible = ref<boolean>(false)
const coverList = ref([])
const image1List = ref([])
const image2List = ref([])

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    align: 'center',
    width: 100
  },
  {
    title: '图片',
    dataIndex: 'cover',
    key: 'cover',
    align: 'center',
    width: 250
  },
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
    width: 200
  },
  {
    title: '介绍',
    dataIndex: 'intro',
    key: 'intro',
    align: 'center',
    width: 400,
    ellipsis: true
  },
  {
    title: '价格',
    dataIndex: 'price',
    key: 'price',
    align: 'center',
    width: 100
  },
  {
    title: '类目',
    dataIndex: 'typeId',
    key: 'typeId',
    align: 'center',
    width: 200
  },
  {
    title: '库存',
    dataIndex: 'stock',
    key: 'stock',
    align: 'center',
    width: 200
  },
  {
    title: '操作',
    key: 'action',
    width: 300
  }
]

const topAdd = (tid: number, gid: number) => {
  fetch('http://localhost:1314/top/topSave', {
    method: 'POST',
    body: JSON.stringify({
      type: tid,
      goodId: gid
    }),
    headers: {
      'content-type': 'application/json'
    }
  }).then(() => {
    manageStore.getGoodList()
  })
}

const topRemove = (tid: number, gid: number) => {
  fetch('http://localhost:1314/top/topDelete', {
    method: 'DELETE',
    body: JSON.stringify({
      type: tid,
      goodId: gid
    }),
    headers: {
      'content-type': 'application/json'
    }
  }).then(() => {
    manageStore.getGoodList()
  })
}

const modify = (recid: number) => {
  manageStore.goodForm = manageStore.goodList.filter((el) => el.id == recid)[0]
  visible.value = true
}

const remove = (recid: number) => {
  manageStore.removeGood(recid)
}

const updateGood = () => {
  fetch('http://localhost:1314/good/goodUpdate', {
    method: 'PUT',
    body: JSON.stringify(manageStore.goodForm),
    headers: {
      'content-type': 'application/json'
    }
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.msg.success) {
        visible.value = false
        manageStore.getGoodList()
      }
    })
}

const handleChange = (info: UploadChangeParam) => {
  if (info.file.status === 'done') {
    console.log(manageStore.goodForm.cover)
  }
}
</script>

<style scoped></style>
