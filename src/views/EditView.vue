<script setup>
import { onMounted, ref, reactive } from "vue";
import { useTodosStore } from "../stores/todos";
import { useRoute, RouterLink } from "vue-router";

const todosStroes = useTodosStore();
const route = useRoute();
const todoId = ref(-1);
const isLoaded = ref(false);

onMounted(async () => {
    try {
        await todosStroes.loadTodo(parseInt(route.params.id));
        todoId.value = parseInt(route.params.id);
        isLoaded.value = true;
        // console.log(todosStroes.selectedTodo);
    } catch (error) {
        console.log("error: ", error);
    }
});

const editTodo = async (id, todoData) => {
    const bodyData = {
        name: todoData.name,
        status: todoData.status,
    };
    try {
        // console.log('----------');
        await todosStroes.editTodo(id, bodyData);
    } catch (error) {
        console.log("error: ", error);
    }
};
</script>

<template>
    <h3>Edit</h3>
    <RouterLink :to="{ name: 'todoList' }"> Back </RouterLink>
    <div v-if="isLoaded">
        {{ todoId }}
        <div>
            Name
            <input type="text" v-model="todosStroes.selectedTodo.name" />
        </div>
        <div>
            Status
            <select v-model="todosStroes.selectedTodo.status">
                <option value="">Select status</option>
                <option v-for="status in todosStroes.statuses" :value="status">
                    {{ status }}
                </option>
            </select>
        </div>
        <div>
            <button @click="editTodo(todoId, todosStroes.selectedTodo)">
                edit
            </button>
        </div>
    </div>
    <div v-else>
        <h3>Loading</h3>
    </div>
</template>
