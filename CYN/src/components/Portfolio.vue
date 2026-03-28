<script setup>
import { dataStore } from '@/stores/dataStore'
const store = dataStore() //use this to get info to populate the portfolio

defineProps({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
}) //maybe no props, just pull from the store
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ firstName }} {{ lastName }}</h1>
    <h3>
      You’ve successfully created a project with
      <a href="https://vite.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.
    </h3>
  </div>
</template>

<style scoped></style>
