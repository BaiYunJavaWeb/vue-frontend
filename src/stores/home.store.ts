import { defineStore } from 'pinia'

export const useHomeStore = defineStore('home', {
  state: () => ({
    userLogged: false
  }),
  actions: {
    async getTypeList() {
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
