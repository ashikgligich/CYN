<script setup>
import PortfolioInputs from '../components/PortfolioInputs.vue'
import Portfolio from '../components/Portfolio.vue'
</script>

<template>
  <div class="about">
    <main></main>
      <h1 class="green">About CYN</h1>
      <p>
        CYN is a portfolio builder designed to help users create a professional and visually appealing portfolio to showcase their work and skills. With CYN, users can easily create and customize their portfolios, making it easier to present their work to potential employers or clients.
      </p>
      <PortfolioInputs />
      <Portfolio :firstName="firstName" :lastName="lastName" />
    <h1>E</h1>
    
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
