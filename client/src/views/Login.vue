<template>
  <div class="flex justify-center items-center h-screen">
    <form
      @submit.prevent="userLogin"
      class="flex flex-col justify-center items-center bg-blue-400 p-6 rounded-sm"
    >
      <h1 class="px-4 py-2 text-2xl font-extrabold">Login</h1>
      <input
        type="text"
        v-model="form.username"
        placeholder="Username"
        class="px-2 py-1 w-64"
      />
      <input
        type="password"
        v-model="form.password"
        placeholder="Password"
        class="px-2 py-1 w-64 mt-2"
      />
      <div class="self-start justify-center my-1">
        <input type="checkbox" id="remember" v-model="form.remember" />
        <label for="remember">Remember Me</label>
      </div>
      <button
        type="submit"
        class="mt-2 bg-blue-600 px-4 py-2 text-white w-full"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script>
import api from '../api';

export default {
  name: 'view-login',
  data() {
    return {
      form: {
        username: '',
        password: '',
        remember: false,
      },
    };
  },
  methods: {
    async userLogin() {
      try {
        const formData = {
          username: this.form.username,
          password: this.form.password,
        };
        const {
          data: { token, role, userId },
        } = await api.login(formData);
        const userData = {
          token,
          role,
          userId,
        };
        this.form.remember
          ? localStorage.setItem('userData', JSON.stringify(userData))
          : sessionStorage.setItem('userData', JSON.stringify(userData));
        if (userData.role === 'admin') {
          this.$router.push('/rooms');
        } else {
          this.$router.push('/home');
        }
      } catch (error) {
        console.log(error.response.data);
      }
    },
    cekUserToken() {
      const userData = JSON.parse(
        localStorage.getItem('userData') || sessionStorage.getItem('userData')
      );
      const defaultUserData = {
        role: 'norole',
        token: 'notoken',
        userId: 'noid',
      };
      const useData = userData ? userData : defaultUserData;
      if (useData.token !== 'notoken') {
        useData.role === 'admin'
          ? this.$router.push('/rooms')
          : this.$router.push('/home');
      }
    },
  },
  mounted() {
    this.cekUserToken();
  },
};
</script>
