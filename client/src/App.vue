<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  padding: 30px;
  @apply bg-red-200;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.card-deck {
  @apply grid grid-cols-4 gap-3 p-4;
}
.card {
  @apply shadow-md rounded border border-gray-400;
}
.card-body {
  @apply p-4;
}
.card-title {
  @apply text-xl font-extrabold text-white -mt-12;
}
.card-text {
  @apply mt-5;
}
.card-footer {
  @apply p-4 flex justify-between items-center;
}
</style>
