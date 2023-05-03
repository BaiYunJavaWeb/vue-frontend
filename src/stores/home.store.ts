import IndexVue from '@/components/Index/Index.vue'
import LoginVue from '@/components/Login/Login.vue'
import RegisterVue from '@/components/Register/Register.vue'
import ProductVue from '@/components/ProductList/ProductList.vue'
import { defineStore } from 'pinia'
import { shallowRef, type Component } from 'vue'

interface Item {
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

interface IType {
  id: number
  name: string
}

interface ComponentConfig {
  component?: Component
  currentProduct?: string
}

interface IComponentMap {
  [key: string]: ComponentConfig
}

export const useHomeStore = defineStore('home', {
  state: () => ({
    userLogged: false,
    typeList: [] as IType[],
    currentComponent: shallowRef<Component>(IndexVue),
    selectedKeys: ['1'],
    productList: [] as Item[]
  }),
  actions: {
    async getTypeList(): Promise<IType[]> {
      return new Promise((resolve, reject) => {
        fetch('http://localhost:1314/type/typeList')
          .then((res) => res.json())
          .then((data) => {
            this.typeList = data.msg.typeList
            resolve(data.msg.typeList)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    async handleMenuClick(e: any) {
      const componentMap: IComponentMap = {
        '1': { component: IndexVue },
        'good/goodList/1': { component: ProductVue, currentProduct: '/good/goodList/1/1' },
        'good/goodList/2': { component: ProductVue, currentProduct: '/good/goodList/2/1' },
        'good/goodList/3': { component: ProductVue, currentProduct: '/good/goodList/3/1' },
        'good/goodList/4': { component: ProductVue, currentProduct: '/good/goodList/4/1' },
        'good/goodList/5': { component: ProductVue, currentProduct: '/good/goodList/5/1' },
        'top/topList/2': { component: ProductVue, currentProduct: '/top/topList/2/1' },
        'top/topList/3': { component: ProductVue, currentProduct: '/top/topList/3/1' },
        // 我的订单
        '5': {},
        // 个人中心
        '6': {},
        // 退出
        '7': {},
        '8': { component: RegisterVue },
        '9': { component: LoginVue },
        // 后台管理
        '10': {}
      }
      const key = e.key.toString()
      const { component, currentProduct } = componentMap[key]
      if (!component) {
        return
      }
      if (currentProduct) {
        await fetch(`http://localhost:1314${currentProduct}`)
          .then((res) => res.json())
          .then((data) => {
            this.productList = data.msg
          })
      }
      this.currentComponent = component!
    },
    async handlePage(pageNumber: number) {
      fetch(`http://localhost:1314/${this.selectedKeys[0]}/${pageNumber}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.msg.length) {
            this.productList = data.msg
          }
        })
    }
  }
})
