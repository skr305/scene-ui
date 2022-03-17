<script setup lang="ts">
import { reactive, watch } from 'vue';
import buttonVue from './components/button/button.vue';
import paymentInputVue from './components/payment/payment-input.vue';

function print(){
    alert(2)
}
const data = reactive( { value: "", pwd: "" } );
watch( data, () => {
  console.log( data );
} );
</script>

<template>
  <buttonVue size="default" type="default" @click="print()"></buttonVue>
  <paymentInputVue v-model="data.pwd"/>
  <scene-payment-input/>
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
