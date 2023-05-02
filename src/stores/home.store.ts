import HotVue from '@/components/Hot/Hot.vue'
import IndexVue from '@/components/Index/Index.vue'
import LoginVue from '@/components/Login/Login.vue'
import NewVue from '@/components/New/New.vue'
import RegisterVue from '@/components/Register/Register.vue'
import { defineStore } from 'pinia'
import { shallowRef, type Component } from 'vue'

interface IType {
  id: number
  name: string
}

export const useHomeStore = defineStore('home', {
  state: () => ({
    userLogged: false,
    typeList: [] as IType[],
    currentComponent: shallowRef<Component>(IndexVue),
    selectedKeys: ['1']
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
    handleClick(e: any) {
      switch (e.key) {
        case '1':
          this.currentComponent = IndexVue
          break
        case '3':
          this.currentComponent = HotVue
          break
        case '4':
          this.currentComponent = NewVue
          break
        case '8':
          this.currentComponent = RegisterVue
          break
        case '9':
          this.currentComponent = LoginVue
          break
        default:
          this.currentComponent = IndexVue
          break
      }
    }
  }
})
