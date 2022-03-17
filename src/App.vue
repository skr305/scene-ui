<script setup lang="ts">
import {ref} from 'vue'
import sButton from './components/button/button.vue';
import sRadio from './components/radio/radio.vue'

const booleanTrue = ref(true)
const booleanFalse = ref(false)
const str = ref('option 1')
const num1 = ref(8)
const num2 = ref(9)
function print(){
    alert('parent')
}
</script>

<template>
  <s-button size="default" :disabled="booleanTrue" type="default" icon='map' @click="print()">
    <!-- <template v-slot:icon>
      <img src="./assets/setting.svg">
    </template> -->
  </s-button>
  <s-radio :model-value="num1" :name="str" :label="str" :disabled="false" :border="true" size="default"></s-radio>
  <s-radio :model-value="num2" :name="str" :label="str" :disabled="booleanTrue" :border="false" size="default"></s-radio>
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
