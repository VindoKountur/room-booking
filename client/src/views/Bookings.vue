<template>
  <div>
    <Navbar />
    <div class="mt-16 w-11/12 mx-auto">
      <h1 class="text-center font-extrabold text-2xl">Your Booked Room List</h1>
      <div class="card-deck">
        <div v-for="booking in bookings" :key="booking.id">
          <div class="card">
            <img src="../assets/room.jpg" />
            <div class="card-body">
              <p class="card-title">{{ booking.Room.name }}</p>
              <div class="card-text">
                <button
                  @click="settingModal(booking.Room.id)"
                  class="px-2 py-1 bg-blue-400 rounded text-white"
                >
                  Room Detail
                </button>
              </div>
            </div>
            <div class="card-footer font-bold">
              <h1>Time : {{ convertToLocal(booking.dateAndTime) }}</h1>
            </div>
          </div>
        </div>
      </div>
      <Modal v-if="showModal" :toggleModal="toggleModal" :room="showRoom" />
    </div>
  </div>
</template>

<script>
import api from '../api';
import Modal from '../components/Modal';
import Navbar from '../components/Navbar';

export default {
  name: 'booking',
  components: {
    Modal,
    Navbar,
  },
  data: () => ({
    bookings: [],
    showModal: false,
    showRoom: {},
    userData: JSON.parse(
      sessionStorage.getItem('userData') || localStorage.getItem('userData')
    ),
  }),
  methods: {
    convertToLocal(date) {
      return new Date(date).toLocaleDateString();
    },
    async getBookings() {
      const { data } = await api.getBookings(this.userData.userId);
      this.bookings = data;
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
  },
  mounted() {
    this.getBookings();
  },
};
</script>
