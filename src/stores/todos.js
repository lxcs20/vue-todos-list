import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const BASE_URL = 'https://65fc045214650eb2100b4f34.mockapi.io/api/v1'

export const useTodosStore = defineStore('todos', {
  state: () => ({
    list: [],
    selectedTodo: {},
    statuses: ['Pending', 'Doing', 'Done']
  }),
  actions: {
    async loadData() {
      try {
        const response = await axios.get(`${BASE_URL}/todos`)
        this.list = response.data
      } catch (error) {
        console.log('error: ', error);
      }
    },
    async loadTodo(id) {
      try {
        const response = await axios.get(`${BASE_URL}/todos/${id}`)
        this.selectedTodo = response.data
      } catch (error) {
        console.log('error: ', error);
      }
    },
    async addTodo(todoText) {
      const status = 'Pending'
      const bodyData = { name: todoText, status }
      try {
        const response = await axios.post(`${BASE_URL}/todos`, bodyData);
        const data = response.data
        this.list.push(data)
        console.log('todo: ', response.data);
      } catch (error) {
        console.log('error: ', error);
      }
    },
    async editTodo(id, todoData) {
      try {
        const response = await axios.put(`${BASE_URL}/todos/${id}`, todoData)
        console.log('update todo: ', response.data);
      } catch (error) {
        console.log('error: ', error);
      }
    },
    // async editTodo(id, todoData) {
    //   try {
    //     const response = await axios.put(`${BASE_URL}/todos/${id}`, todoData)
    //     console.log('update todo: ', response.data);
    //   } catch (error) {
    //     console.log('error: ', error);
    //   }
    // },
    async removeTodo(id) {
      try {
        const response = await axios.delete(`${BASE_URL}/todos/${id}`)
        console.log('delete todo: ', response.data);
        const delIndex = this.list.findIndex(todo => todo.id == id)
        this.list.splice(delIndex, 1)
      } catch (error) {
        console.log('error: ', error);
      }
    }
  }
})
