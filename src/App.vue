<script setup lang="ts">
import buttonVue from './components/button/button.vue';

function print(){
    alert('parent')
}
</script>

<template>
  <buttonVue size="default" type="default" icon='setting' @click="print()">
    <!-- <template v-slot:icon>
      <img src="./assets/setting.svg">
    </template> -->
  </buttonVue>
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
