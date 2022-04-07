<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { RouterView } from 'vue-router';
import scButtonVue from './components/sc-button.vue';
import ScButton from './components/sc-button.vue';
import { post } from './request';

const onRecieveData = () => {
  post( { url: "/api/find_all_users", payload: {} } ).then( result => {
    console.info( result );
    console.time();
    console.warn( result );
  } );
};


</script>

<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
  <div>2333</div>
  <sc-button> 点我 </sc-button>
  <div @click="onRecieveData"> [[ 魔法邮票魔法`香烟出售 ]] </div>
  <router-view></router-view>
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
