<script setup lang="ts">
import { reactive, watch, ref } from 'vue';
import buttonVue from './components/button/button.vue';
import paymentInputVue from './components/payment/s-payment-input.vue';

import sButton from './components/button/button.vue';
import sRadio from './components/radio/radio.vue'
import scrollbar from './components/scrollbar/scrollbar.vue'
import sNumberInput from './components/number-input/number-input.vue'
import sInput from './components/input/s-input.vue';

const booleanTrue = ref(true)
const booleanFalse = ref(false)
const str = ref('input')
const num1 = ref(8)
const num2 = ref(9)
const arr = reactive([1,2,3,4,5,6,7,8,9])

const print = (...args: any[])=>{
  console.log(...args)
}
const data = reactive( { value: "", pwd: "" } );
watch( data, () => {
  console.log( data );
} );
const text = ref( "" );
watch( text, () => {

  console.log( "on text change", text.value );
} )
</script>

<template>
  <s-button size="default" :disabled="booleanFalse" type="default" @click="print">
    <template v-slot:icon>
      <img src="/setting.svg">
    </template>
  </s-button>

  <s-payment-input v-model="data.pwd"/>
  <scene-payment-input/>
  <s-radio v-model="num1" name="contact" label="phone" :disabled="false" size="large"></s-radio>
  <s-radio v-model="num2" name="contact" label="email" :disabled="false" size="small"></s-radio>
  <s-input v-model="text" size="big" label="233" />
  <!-- <scrollbar id='scroll'>
    <div v-for="(item,index) in arr" :key="index">
      <s-button size="default" type="default" icon='map' @click="print()">
        item
      </s-button>
    </div>
  </scrollbar> -->
  <s-number-input v-model='num1' name='count' :max="10" :min="-2" />
  
  <!-- <s-number-input v-model='num1' name='count' :max="10" :min="-2" @blur="print" @focus="print" @change="print" /> -->
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
#scroll{
  width: 100px;
  height:100px;
}
</style>
