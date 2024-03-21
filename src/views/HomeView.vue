<script setup>
import { onMounted, ref } from "vue";
import { useTodosStore } from "../stores/todos";
import { RouterLink } from "vue-router";

const todoStore = useTodosStore();

const todoText = ref("");
const isLoading = ref(false);

onMounted(async () => {
  isLoading.value = true;
  await todoStore.loadData();
  console.log(todoStore.list);
  isLoading.value = false;
});

const addTodo = async (todoText) => {
  try {
	isLoading.value = true;
    await todoStore.addTodo(todoText);
    console.log(todoText);
	isLoading.value = false;
  } catch (error) {
    console.log("error: ", error);
  }
};

const changeStatusTodo = async (id, todoData) => {
  const bodyData = {
    name: todoData.name,
    status: todoData.status,
  };
  try {
	isLoading.value = true;
    await todoStore.editTodo(id, todoData);
	isLoading.value = false;
  } catch (error) {
    console.log("error: ", error);
  }
};

const deleteTodo = async (id) => {
  try {
	isLoading.value = true;
    await todoStore.removeTodo(id);
	isLoading.value = false;
  } catch (error) {
    console.log("error: ", error);
  }
};
</script>

<template>
  <div>
    <input type="text" v-model="todoText" />
    <button @click="addTodo(todoText)">add</button>
  </div>
  <h3 v-if="isLoading">Loading</h3>
  <ul>
    <li v-for="todo in todoStore.list">
      {{ todo.name }}
      <select v-model="todo.status" @change="changeStatusTodo(todo.id, todo)">
        <option value="">Select status</option>
        <option v-for="status in todoStore.statuses" :value="status">
          {{ status }}
        </option>
      </select>
      {{ todo.id }}
      <router-link :to="{ name: 'todoEdit', params: { id: todo.id } }">
        <button>edit</button>
      </router-link>
      <button @click="deleteTodo(todo.id)">delete</button>
    </li>
  </ul>
</template>
