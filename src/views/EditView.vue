<script setup>
import { onMounted, ref, reactive } from "vue";
import { useTodosStore } from "../stores/todos";
import { useRoute, RouterLink } from "vue-router";

import Loading from "@/components/Loading.vue";

const todosStroes = useTodosStore();
const route = useRoute();
const todoId = ref(-1);
const isLoaded = ref(false);
const isUpdated = ref(false);

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
        isLoaded.value = false;
        await todosStroes.editTodo(id, bodyData);
        isLoaded.value = true;
        isUpdated.value = true;
        setTimeout(() => {
            isUpdated.value = false;
        }, 2500);
    } catch (error) {
        console.log("error: ", error);
    }
};
</script>

<template>
    <div class="w-1/2 m-auto">
        <div class="toast toast-top toast-start">
            <div v-if="isUpdated" class="alert alert-success">
                <span>Updated successfully.</span>
            </div>
        </div>
        <div class="flex justify-between items-center">
            <!-- <h3>Edit</h3> -->
            <RouterLink class="btn btn-square" :to="{ name: 'todoList' }">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1rm"
                    viewBox="0 0 448 512"
                >
                    <path
                        d="M25.4 278.6L2.7 256l22.6-22.6 144-144L192 66.7 237.2 112l-22.6 22.6L125.2 224 416 224l32 0 0 64-32 0-290.7 0 89.4 89.4L237.2 400 192 445.3l-22.6-22.6-144-144z"
                    />
                </svg>
            </RouterLink>
            <div class="font-bold font-sans text-xl">Edit Page</div>
        </div>
        <div v-if="isLoaded">
            <div class="flex justify-center mt-1">
                <span>
                    ID :
                    <div class="badge badge-neutral">{{ todoId }}</div>
                </span>
            </div>

            <label class="form-control w-full">
                <div class="label">
                    <span class="label-text">Name Todo</span>
                </div>
                <input
                    v-model="todosStroes.selectedTodo.name"
                    type="text"
                    placeholder="type name todo"
                    class="input input-bordered w-full"
                />
            </label>

            <label class="form-control w-full">
                <div class="label">
                    <span class="label-text">Status</span>
                </div>
                <select
                    v-model="todosStroes.selectedTodo.status"
                    class="select select-bordered"
                >
                    <option value="">Select status</option>
                    <option
                        v-for="status in todosStroes.statuses"
                        :value="status"
                    >
                        {{ status }}
                    </option>
                </select>
            </label>
            <div>
                <button
                    class="btn btn-primary mt-4 w-full"
                    @click="editTodo(todoId, todosStroes.selectedTodo)"
                >
                    edit
                </button>
            </div>
        </div>
        <div v-else>
            <Loading></Loading>
        </div>
    </div>
</template>

<style scoped>
svg {
    fill: white;
}
</style>
