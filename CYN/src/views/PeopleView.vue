<script setup>
import { ref } from 'vue'
import Portfolio from '../components/Portfolio.vue'
const people = ref([
  { name: 'John Doe', role: 'Developer' },
  { name: 'Jane Smith', role: 'Designer' },
])
</script>

<template>
  <main>
    <Portfolio v-for="person in people" :key="person.name" :person="person" />
  </main>
</template>
