import { defineStore } from 'pinia'

interface IType {
  id: number
  name: string
}

export const useHomeStore = defineStore('home', {
  state: () => ({
    userLogged: false
  }),
  actions: {
    async getTypeList(): Promise<IType[]> {
      return new Promise((resolve, reject) => {
        fetch('http://localhost:1314/type/typeList')
          .then((res) => res.json())
          .then((data) => {
            resolve(data.msg.typeList)
          })
      })
    }
  }
})
