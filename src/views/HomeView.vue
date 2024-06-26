<script setup>
import { onMounted, ref, computed } from "vue";
import { useTodosStore } from "../stores/todos";
import { RouterLink } from "vue-router";

import Loading from "../components/Loading.vue";

const todoStore = useTodosStore();

const todoText = ref("");
const isLoading = ref(false);
const selectedStatus = ref("Pending");

const filteredTodos = computed(() => {
    return todoStore.list.filter(
        (todo) => todo.status === selectedStatus.value
    );
});

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
        todoText.value = "";
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

const changeStatus = async (event, todoData) => {
    try {
        if (event.target.checked) {
            isLoading.value = true;
            // console.log(event.target.checked);
            await todoStore.editTodo(todoData.id, {
                status: "Done",
                name: todoData.name,
            });
            await todoStore.loadData();
            isLoading.value = false;
        } else {
            isLoading.value = true;
            await todoStore.editTodo(todoData.id, {
                status: "Doing",
                name: todoData.name,
            });
            await todoStore.loadData();
            // console.log();
            isLoading.value = false;
            // await updateStatus(to, todo.id);
        }
    } catch (error) {
        console.log("error", error);
    }
};

const chanegSelectedStatus = async (newStatus) => {
    try {
        selectedStatus.value = newStatus;
    } catch (error) {
        console.log();
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
        <div class="flex">
            <input
                class="input input-bordered w-full"
                type="text"
                v-model="todoText"
            />
            <button
                class="btn btn-primary ml-2 mb-2"
                @click="addTodo(todoText)"
            >
                add
            </button>
        </div>
        <loading v-if="isLoading"></loading>
        <div role="tablist" class="tabs tabs-boxed m-4">
            <a
                role="tab"
                class="tab"
                :class="status === selectedStatus ? 'tab tab-active' : ''"
                @click="chanegSelectedStatus(status)"
                v-for="status in todoStore.statuses"
                >{{ status }}</a
            >
        </div>
        <div
            class="flex items-center justify-between mb-1"
            v-for="todo in filteredTodos"
        >
            <div>
                <input
                    type="checkbox"
                    :checked="todo.status === 'Done'"
                    class="checkbox"
                    @change="changeStatus($event, todo)"
                />
            </div>
            <div :class="todo.status === 'Done' ? 'line-through' : ''">
                {{ todo.name }}
            </div>
            <div>
                <router-link
                    :to="{ name: 'todoEdit', params: { id: todo.id } }"
                >
                    <button class="btn btn-square btn-outline mr-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="1em"
                            viewBox="0 0 512 512"
                        >
                            <path
                                d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"
                            />
                        </svg>
                    </button>
                </router-link>
                <button
                    class="btn btn-square btn-outline"
                    @click="deleteTodo(todo.id)"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 448 512"
                    >
                        <path
                            d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
                        />
                    </svg>
                </button>
            </div>
        </div>
    </div>
    <!-- -->
</template>

<style scoped>
svg {
    fill: white;
}
</style>
