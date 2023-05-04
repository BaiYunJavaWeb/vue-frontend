import { defineStore } from 'pinia'
import { shallowRef, type Component } from 'vue'
import Orders from '@/components/Manage/Orders.vue'
import Users from '@/components/Manage/Users.vue'
import Goods from '@/components/Manage/Goods.vue'
import Types from '@/components/Manage/Types.vue'
import Password from '@/components/Manage/Password.vue'

interface ComponentConfig {
  component?: Component
  currentProduct?: string
}

interface IComponentMap {
  [key: string]: ComponentConfig
}

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
  topId: number
}

interface IType {
  id: number
  name: string
}

export const useManageStore = defineStore('manage', {
  state: () => ({
    adminLogged: false,
    selectedKeys: ['1'],
    currentComponent: shallowRef<Component>(Orders),
    typeList: [] as IType[],
    goodList: [] as IGood[],
    goodBanner: [] as IGood[],
    goodHot: [] as IGood[],
    goodNew: [] as IGood[],
    goodForm: {} as IGood
  }),
  actions: {
    handleMenuClick(e: any) {
      const componentMap: IComponentMap = {
        '1': { component: Orders },
        '2': { component: Users },
        '3': { component: Goods },
        '4': { component: Types },
        '5': { component: Password }
      }

      const key = e.key.toString()
      const { component } = componentMap[key]
      this.currentComponent = component!
    },
    getGoodList() {
      fetch('http://localhost:1314/type/typeList')
        .then((res) => res.json())
        .then((data) => {
          this.typeList = data.msg.typeList
        })
      fetch('http://localhost:1314/good/goodList')
        .then((res) => res.json())
        .then((data) => {
          this.goodList = data.msg.all
          this.goodBanner = data.msg.ibanner
          this.goodHot = data.msg.ihot
          this.goodNew = data.msg.inew
        })
    },
    removeGood(id: number) {
      fetch('http://localhost:1314/good/goodDelete', {
        method: 'DELETE',
        body: JSON.stringify({
          id: id
        }),
        headers: {
          'content-type': 'application/json'
        }
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.msg.success) {
            this.getGoodList()
          }
        })
    }
  }
})
