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
  [key: string]: string | number
}

interface IUser {
  id: number
  username: string
  password: string
  name: string
  phone: number
  address: string
  [key: string]: string | number
}

interface IType {
  id: number
  name: string
}

interface IOrder {
  id: number
  total: number
  amount: number
  status: number
  paytype: number
  name: number
  phone: number
  address: number
  systime: Date
  userId: number
  goodName: string
}

export const useManageStore = defineStore('manage', {
  state: () => ({
    adminLogged: false,
    adminName: '',
    selectedKeys: ['1'],
    currentComponent: shallowRef<Component>(Orders),
    typeList: [] as IType[],
    goodList: [] as IGood[],
    goodBanner: [] as IGood[],
    goodHot: [] as IGood[],
    goodNew: [] as IGood[],
    goodForm: {} as IGood,
    userList: [] as IUser[],
    userForm: {} as IUser,
    typeForm: {} as IType,
    orderList: [] as IOrder[],
    orderUnpay: [] as IOrder[],
    orderPayed: [] as IOrder[],
    orderDelivery: [] as IOrder[],
    orderDone: [] as IOrder[]
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
    getTypeList() {
      fetch('http://localhost:1314/type/typeList')
        .then((res) => res.json())
        .then((data) => {
          this.typeList = data.msg.typeList
        })
    },
    getGoodList() {
      this.getTypeList()
      fetch('http://localhost:1314/good/goodList')
        .then((res) => res.json())
        .then((data) => {
          this.goodList = data.msg.all
          this.goodBanner = data.msg.ibanner
          this.goodHot = data.msg.ihot
          this.goodNew = data.msg.inew
        })
    },
    getUserList() {
      fetch('http://localhost:1314/user/userList')
        .then((res) => res.json())
        .then((data) => {
          this.userList = data.msg
        })
    },
    getOrderList() {
      fetch('http://localhost:1314/order/orderList')
        .then((res) => res.json())
        .then((data) => {
          const { msg } = data
          this.orderList = msg
          this.orderUnpay = msg.filter((el: IOrder) => el.status == 1)
          this.orderPayed = msg.filter((el: IOrder) => el.status == 2)
          this.orderDelivery = msg.filter((el: IOrder) => el.status == 3)
          this.orderDone = msg.filter((el: IOrder) => el.status == 4)
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
    },
    removeUser(id: number) {
      fetch('http://localhost:1314/user/userDelete', {
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
            this.getUserList()
          }
        })
    },
    removeType(id: number) {
      fetch('http://localhost:1314/type/typeDelete', {
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
            this.getTypeList()
          }
        })
    },
    setStatus(orderid: number, status: number) {
      fetch('http://localhost:1314/order/orderStatus', {
        method: 'PUT',
        body: JSON.stringify({
          id: orderid,
          status: status
        }),
        headers: {
          'content-type': 'application/json'
        }
      }).then((res) => {
        if (res.status == 200) {
          this.getOrderList()
        }
      })
    },
    init() {
      this.selectedKeys = ['3']
      this.currentComponent = Goods
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage // 选择存储方式
      }
    ]
  }
})
