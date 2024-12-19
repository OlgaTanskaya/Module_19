const TodoItem = {
  props: ["task"], 
  template: `
  <div @click="toggleComplete" class="todo-item" :class="{ completed: task.completed }">
    <span >{{ task.text }}</span>
    <button @click="$emit('delete-task', task.id)">Удалить</button>
  </div>
`,
  methods: {
    toggleComplete() {
      this.task.completed = !this.task.completed;
    },
  },
};

const TodoList = {
  components: { TodoItem },
  data() {
    return {
      newTask: "", 
      tasks: [], 
    };
  },
  methods: {
    addTask() {
      if (this.newTask.trim()) {
        this.tasks.push({
          id: Date.now(), 
          text: this.newTask.trim(),
          completed: false,
        });
        this.newTask = "";
      }
    },
    deleteTask(taskId) {
      this.tasks = this.tasks.filter((task) => task.id !== taskId);
    },
  },
  template: `
  <div>
    <form @submit.prevent="addTask">
      <!-- Поле ввода для новой задачи -->
      <input type="text" v-model="newTask" placeholder="Добавить новую задачу...">
      <button type="submit">Добавить</button>
    </form>

    <!-- Список задач -->
    <div>
      <todo-item
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @delete-task="deleteTask"
      ></todo-item>
    </div>
  </div>
`,
};

const app = Vue.createApp({
  components: { TodoList }, 
});

app.mount("#app");
