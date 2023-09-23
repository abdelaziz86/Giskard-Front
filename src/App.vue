<script setup>
import { RouterView } from 'vue-router' 
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue';
</script>

<template>
  
  <HeaderComponent />
  <RouterView />
  <FooterComponent />

</template>

<style lang="scss">
// @import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;700&display=swap");
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&family=Roboto&display=swap');
* {
  font-family: 'Poppins', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
}
</style>