<script setup lang="ts">
import buttonVue from './components/button/button.vue';

function print(){
    alert(2)
}
</script>

<template>
  <buttonVue size="default" type="default" @click="print()"></buttonVue>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
