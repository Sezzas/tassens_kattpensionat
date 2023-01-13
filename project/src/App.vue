<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
</script>

<template>
  <div id="content">
    <Header />

    <RouterView />
  </div>
</template>

<style scoped>

</style>
