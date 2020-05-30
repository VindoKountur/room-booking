<template>
  <div class="home">
    <Navbar />
    <div class="w-full text-center mt-16">
      <h2 class="text-xl font-bold">Search Rooms</h2>
      <form @submit.prevent="submitSearch" class="text-left p-4 bg-gray-300">
        <div class="grid grid-cols-2 gap-4">
          <div class="form-row">
            <label for="tanggal" class="sub-title">Date</label>
            <input
              v-model="searchForm.date"
              type="date"
              id="tanggal"
              class="input-value"
            />
          </div>
          <div class="form-row">
            <label for="kapasitas" class="sub-title">Capacity</label>
            <input
              v-model="searchForm.capacity"
              type="number"
              id="kapasitas"
              class="input-value"
            />
          </div>
        </div>
        <!-- DAftar Asset -->
        <div class="grid grid-cols-10 bg-gray-300 p-4">
          <div v-for="(asset, index) in assets" :key="index" class="col-span-2">
            <input type="checkbox" v-model="asset.check" />
            <label class="ml-1">{{ asset.name }}</label>
          </div>
        </div>
        <button
          type="submit"
          class="bg-blue-500 px-3 py-1 text-white rounded ml-3"
        >
          Search
        </button>
      </form>
    </div>
    <!-- Daftar Room -->
    <h1 class="title" v-show="rooms.length !== 0">Room List</h1>
    <div class="card-deck">
      <div v-for="room in rooms" :key="room.id">
        <div class="card">
          <img src="../assets/room.jpg" />
          <div class="card-body">
            <p class="card-title">{{ room.name }}</p>
            <p class="card-text">{{ room.description }}</p>
          </div>
          <div class="card-footer">
            <button
              class="p-2 bg-blue-400 rounded text-white"
              @click="settingModal(room.id)"
            >
              Detail
            </button>
            <button
              @click="bookNow(room.id)"
              v-show="!bookedRoomId.includes(room.id)"
              class="p-2 bg-blue-700 rounded text-white ml-2"
            >
              Book Now
            </button>
            <p v-show="bookedRoomId.includes(room.id)">
              {{ getBookedUsername(room.id) }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <Modal v-if="showModal" :toggleModal="toggleModal" :room="showRoom" />
  </div>
</template>

<script>
import Modal from '../components/Modal';
import Navbar from '../components/Navbar';

import api from '../api';

export default {
  name: 'Home',
  components: {
    Modal,
    Navbar,
  },
  data() {
    return {
      assets: [],
      rooms: [],
      showModal: false,
      showRoom: {},
      searchForm: {
        date: '',
        capacity: '',
      },
      bookedRoomOnDate: [],
      bookedRoomId: [],
      userData: JSON.parse(
        sessionStorage.getItem('userData') || localStorage.getItem('userData')
      ),
    };
  },
  methods: {
    async getAssets() {
      const { data } = await api.getAssets();
      const newData = data.map((asset) => ({
        check: false,
        name: asset,
      }));
      this.assets = newData;
    },
    async getRooms(query) {
      const { data } = await api.getRooms(query);
      this.rooms = data;
    },
    toggleModal() {
      this.showModal = !this.showModal;
    },
    async getRoom(id) {
      const { data } = await api.getRoom(id);
      this.showRoom = data;
    },
    async settingModal(id) {
      await this.getRoom(id);
      this.toggleModal();
    },
    async getBookedRoom(query) {
      const { data } = await api.getBookings(query);
      const bookedRoom = data.map((room) => ({
        roomId: room.Room.id,
        user: room.User.username,
      }));
      const bookedRoomId = data.map((room) => room.Room.id);
      this.bookedRoomId = bookedRoomId;
      this.bookedRoomOnDate = bookedRoom;
    },
    submitSearch() {
      const checkedAssets = this.assets.filter((asset) => asset.check === true);
      const searchAssets = checkedAssets.map((asset) => asset.name);
      const queryRoom = {
        capacity: +this.searchForm.capacity,
        searchAssets,
      };
      const queryBooking = {
        date: this.searchForm.date,
      };
      this.getRooms(queryRoom);
      this.getBookedRoom(queryBooking);
    },
    getBookedUsername(roomId) {
      const [rm] = this.bookedRoomOnDate.filter(
        (room) => room.roomId === roomId
      );
      if (rm) {
        const a = `Booked by: ${rm.user}`;
        return a;
      }
    },
    async bookNow(roomId) {
      const data = {
        userId: this.userData.userId,
        dateAndTime: this.searchForm.date,
        roomId,
      };
      const book = await api.bookNow(data);
      if (book) {
        console.log('booked');
      } else {
        console.log('fail');
      }
    },
  },
  mounted() {
    this.getAssets();
    // this.getRooms();
  },
};
</script>

<style scoped>
.form-row {
  @apply w-full text-left bg-gray-300 p-2;
}
.sub-title {
  @apply block text-gray-600;
}
.input-value {
  @apply w-full p-1;
}
.title {
  @apply font-extrabold text-2xl px-4;
}
</style>
