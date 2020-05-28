<template>
  <div class="mt-16 w-10/12 mx-auto">
    <h1 class="text-2xl font-extrabold py-4">User List</h1>
    <button
      class="btn"
      :class="[showForm ? 'bg-red-400' : 'bg-blue-400']"
      @click="toggleShowForm"
    >{{txtFormButton}}</button>
    <form @submit.prevent="addUser" class="mt-4 bg-gray-300 w-64 p-4" v-if="showForm">
      <div class="flex flex-col">
        <h2 class="text-center py-2">Form New User</h2>
        <input
          type="text"
          v-model="formUser.username"
          placeholder="Username"
          class="input-user mb-2"
        />
        <input
          type="text"
          v-model="formUser.password"
          placeholder="Password"
          class="input-user mb-2"
        />
        <select v-model="formUser.role" class="input-user mb-2">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" class="btn bg-blue-400">Add</button>
      </div>
    </form>
    <form @submit.prevent="doEditUser" class="mt-4 bg-gray-300 w-5/12 p-4" v-if="editForm">
      <div class="flex flex-col">
        <h2 class="py-2">
          Edit role for username:
          <span class="font-bold">{{ editUser.username }}</span>
        </h2>
        <select v-model="editUser.role" class="input-user mb-2">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" class="btn bg-orange-400">Edit</button>
        <button @click="cancelEdit" class="btn bg-red-400 mt-2">Cancel</button>
      </div>
    </form>
    <table class="table-auto mt-4">
      <thead>
        <tr>
          <th class="table-col">Username</th>
          <th class="table-col">Role</th>
          <th class="table-col">Option</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, i) in users" :key="user.id" :class="[i%2!==0 ? 'bg-gray-300' : '']">
          <td class="table-col">{{user.username}}</td>
          <td class="table-col">{{user.role}}</td>
          <td class="table-col">
            <button @click="setEdit(user.id)" class="btn bg-orange-400">Edit</button>
            <button @click="deleteUser(user.id)" class="btn bg-red-400 ml-4">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from "../api";

export default {
  name: "users",
  data: () => ({
    users: [],
    formUser: {
      username: "",
      password: "",
      role: "user"
    },
    showForm: false,
    editForm: false,
    editUser: {
      id: "",
      username: "",
      role: ""
    }
  }),
  methods: {
    resetForm() {
      this.formUser = {
        username: "",
        password: "",
        role: "user"
      };
    },
    resetEditForm() {
      this.editForm = {
        id: "",
        username: "",
        role: ""
      };
    },
    toggleShowForm() {
      this.showForm = !this.showForm;
    },
    toggleEditForm() {
      this.editForm = !this.editForm;
    },
    cancelEdit() {
      this.toggleEditForm();
      this.resetForm();
    },
    async setEdit(id) {
      await this.getUser(id);
      this.toggleEditForm();
    },
    async getUsers() {
      const { data } = await api.getUsers();
      this.users = data;
    },
    async getUser(id) {
      const { data } = await api.getUser(id);
      this.editUser = data;
    },
    async addUser() {
      const {
        data: { message: result }
      } = await api.addUser(this.formUser);
      this.resetForm();
      this.toggleShowForm();
      await this.getUsers();
      console.log(result);
    },
    async doEditUser() {
      const data = {
        role: this.editUser.role
      };
      const id = this.editUser.id;
      const {
        data: { message: result }
      } = await api.updateUser(id, data);
      console.log(result);
      this.cancelEdit();
      await this.getUsers();
    },
    async deleteUser(id) {
      await api.deleteUser(id);
      await this.getUsers();
    }
  },
  computed: {
    txtFormButton() {
      return this.showForm ? "Close Form" : "Add New User";
    }
  },
  mounted() {
    this.getUsers();
  }
};
</script>

<style scoped>
.table-col {
  @apply border px-4 py-2;
}
.btn {
  @apply px-4 py-2 rounded text-white;
}
.input-user {
  @apply px-1 py-2 rounded;
}
</style>