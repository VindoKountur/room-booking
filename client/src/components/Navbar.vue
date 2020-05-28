<template>
  <nav
    id="navbar"
    class="bg-blue-500 flex justify-between items-center px-4 py-2 fixed top-0 left-0 w-full"
  >
    <ul class="flex justify-start items-center">
      <router-link
        v-if="userToken.role !== 'admin'"
        to="/home"
        class="simple-btn"
        >Home</router-link
      >
      <router-link
        v-if="userToken.role !== 'admin'"
        to="/bookings"
        class="simple-btn"
        >Status</router-link
      >
      <router-link
        to="/users"
        v-if="userToken.role === 'admin'"
        class="simple-btn"
        >Manage Users</router-link
      >
      <router-link
        to="/rooms"
        v-if="userToken.role === 'admin'"
        class="simple-btn"
        >Manage Rooms</router-link
      >
    </ul>
    <button class="simple-btn" @click="logoutMe">Logout</button>
  </nav>
</template>

<script>
const userData = 'userData';
export default {
  name: 'navbar',
  data: () => ({
    userToken: JSON.parse(
      sessionStorage.getItem(userData) || localStorage.getItem(userData)
    ),
  }),
  methods: {
    logoutMe() {
      localStorage.removeItem(userData);
      sessionStorage.removeItem(userData);
      this.redirectNotLogin();
    },
    redirectNotLogin() {
      this.$router.push('/');
    },
    cekUserToken() {
      !this.userToken.token && this.redirectNotLogin();
    },
  },
  mounted() {
    this.cekUserToken();
  },
};
</script>

<style scoped>
.simple-btn {
  @apply mx-3 text-white p-2 cursor-pointer;
}
.simple-btn:hover {
  @apply text-gray-400;
}
</style>
