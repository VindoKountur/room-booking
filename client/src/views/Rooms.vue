<template>
  <div>
    <Navbar />
    <div class="mt-16 w-10/12 mx-auto">
      <h1 class="text-2xl font-extrabold py-4">Room List</h1>
      <button
        class="btn"
        :class="[showForm ? 'bg-red-400' : 'bg-blue-400']"
        @click="toggleShowForm"
      >
        {{ txtFormButton }}
      </button>
      <form
        @submit.prevent="addRoom"
        class="mt-4 bg-gray-300 w-full p-4"
        v-if="showForm"
      >
        <div class="flex flex-col">
          <h2 class="text-center py-2 font-extrabold text-2xl">
            Form New Room
          </h2>
          <input
            type="text"
            v-model="formRoom.name"
            placeholder="Room Name"
            class="input-user mb-2"
          />
          <input
            type="text"
            v-model="formRoom.capacity"
            placeholder="Capacity"
            class="input-user mb-2"
          />
          <input
            type="text"
            v-model="formRoom.description"
            placeholder="Description"
            class="input-user mb-2"
          />
          <input
            type="text"
            v-model="formRoom.assets"
            placeholder="Assets (chair, table, projector)"
            class="input-user mb-2"
          />
          <button type="submit" class="btn bg-blue-400 font-bold">Add</button>
        </div>
      </form>
      <form
        @submit.prevent="doEditRoom"
        class="mt-4 bg-gray-300 w-full p-4"
        v-if="editForm"
      >
        <div class="flex flex-col">
          <h2 class="text-center py-2 font-extrabold text-2xl">
            Form Edit Room
          </h2>
          <input
            type="text"
            v-model="editRoom.name"
            placeholder="Room Name"
            class="input-user mb-2"
          />
          <input
            type="text"
            v-model="editRoom.capacity"
            placeholder="Capacity"
            class="input-user mb-2"
          />
          <input
            type="text"
            v-model="editRoom.description"
            placeholder="Description"
            class="input-user mb-2"
          />
          <input
            type="text"
            v-model="editRoom.assets"
            placeholder="Assets (chair, table, projector)"
            class="input-user mb-2"
          />
          <button type="submit" class="btn bg-orange-400">Edit</button>
          <button @click="cancelEdit" class="btn bg-red-400 mt-2">
            Cancel
          </button>
        </div>
      </form>
      <table class="table-auto mt-4 w-full">
        <thead>
          <tr>
            <th class="table-col">Name</th>
            <th class="table-col">Capacity</th>
            <th class="table-col">Description</th>
            <th class="table-col">Assets</th>
            <th class="table-col">Option</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(room, i) in rooms"
            :key="room.id"
            :class="[i % 2 !== 0 ? 'bg-gray-300' : '']"
          >
            <td class="table-col">{{ room.name }}</td>
            <td class="table-col">{{ room.capacity }}</td>
            <td class="table-col">{{ room.description }}</td>
            <td class="table-col">{{ room.assets }}</td>
            <td class="table-col flex justify-between">
              <button @click="setEdit(room.id)" class="btn bg-orange-400">
                Edit
              </button>
              <button @click="deleteRoom(room.id)" class="btn bg-red-400">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar';

import api from '../api';

export default {
  name: 'rooms',
  components: {
    Navbar,
  },
  data: () => ({
    rooms: [],
    formRoom: {
      name: '',
      capacity: '',
      description: '',
      assets: '',
    },
    showForm: false,
    editForm: false,
    editRoom: {
      id: '',
      name: '',
      capacity: '',
      description: '',
      assets: '',
    },
  }),
  methods: {
    resetForm() {
      this.formRoom = {
        name: '',
        capacity: '',
        description: '',
        assets: '',
      };
    },
    resetEditForm() {
      this.editRoom = {
        id: '',
        name: '',
        capacity: '',
        description: '',
        assets: '',
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
      await this.getRoom(id);
      this.toggleEditForm();
    },
    async getRooms() {
      const { data } = await api.getRooms();
      this.rooms = data;
    },
    async getRoom(id) {
      const { data } = await api.getRoom(id);
      this.editRoom = data;
    },
    async addRoom() {
      const {
        data: { message: result },
      } = await api.addRoom(this.formRoom);
      this.resetForm();
      this.toggleShowForm();
      await this.getRooms();
      console.log(result);
    },
    async doEditRoom() {
      const data = {
        name: this.editRoom.name,
        description: this.editRoom.description,
        capacity: this.editRoom.capacity,
        assets: this.editRoom.assets,
      };
      const id = this.editRoom.id;
      const {
        data: { message: result },
      } = await api.updateRoom(id, data);
      console.log(result);
      this.cancelEdit();
      await this.getRooms();
    },
    async deleteRoom(id) {
      await api.deleteRoom(id);
      await this.getRooms();
    },
  },
  computed: {
    txtFormButton() {
      return this.showForm ? 'Close Form' : 'Add New Room';
    },
  },
  mounted() {
    this.getRooms();
  },
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
  @apply p-2 rounded;
}
</style>
