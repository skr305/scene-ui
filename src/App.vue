<script setup lang="ts">
import { reactive, watch, ref } from 'vue';
import buttonVue from './components/button/button.vue';
import paymentInputVue from './components/payment/payment-input.vue';

import sButton from './components/button/button.vue';
import sRadio from './components/radio/radio.vue'
import scrollbar from './components/scrollbar/scrollbar.vue'
import sNumberInput from './components/number-input/number-input.vue'
import sLink from './components/link/link.vue'

const booleanTrue = ref(true)
const booleanFalse = ref(false)
const str = ref('input')
const num1 = ref(8)
const num2 = ref(9)
const arr = reactive([1,2,3,4,5,6,7,8,9])
const baidu = ref('https://www.baidu.com')

const print = (...args: any[])=>{
  console.log(...args)
}
const data = reactive( { value: "", pwd: "" } );
watch( data, () => {
  console.log( data );
} );
</script>

<template>
  <div>
    <s-button size="default" :disabled="booleanFalse" type="default" @click="print">
      <template v-slot:icon>
        <img src="/setting.svg">
      </template>
    </s-button>
  </div>
  <div>
    <paymentInputVue v-model="data.pwd"/>
  </div>
  <div>
    <s-radio v-model="num1" name="contact" label="phone" :disabled="false" size="large"></s-radio>
    <s-radio v-model="num2" name="contact" label="email" :disabled="false" size="small"></s-radio>
  </div>
  <!-- <scrollbar id='scroll'>
    <div v-for="(item,index) in arr" :key="index">
      <s-button size="default" type="default" icon='map' @click="print()">
        item
      </s-button>
    </div>
  </scrollbar> -->
  <div>
    <s-number-input v-model='num1' name='count' :max="10" :min="-2" :step="0.5" />
  </div>
  <div>
    带下划线：
    <s-link :href="baidu" >default</s-link>
    <s-link :href="baidu" type="primary">primary</s-link>
    <s-link :href="baidu" type="success">success</s-link>
    <s-link :href="baidu" type="warning">warning</s-link>
    <s-link :href="baidu" type="danger">danger</s-link>
    <s-link :href="baidu" type="info">info</s-link>
  </div>
  <div>
    禁用：
    <s-link :href="baidu" disabled>default</s-link>
    <s-link :href="baidu" type="primary" disabled>primary</s-link>
    <s-link :href="baidu" type="success" disabled>success</s-link>
    <s-link :href="baidu" type="warning" disabled>warning</s-link>
    <s-link :href="baidu" type="danger" disabled>danger</s-link>
    <s-link :href="baidu" type="info" disabled>info</s-link>
  </div>
  <div>
    带图标：
    <s-link :href="baidu">
      <template v-slot:icon>
        <img src="/link.svg">
      </template>
      default
    </s-link>
    <s-link :href="baidu" type="primary">
      <template v-slot:icon>
        <img src="/link.svg">
      </template>
      primary
    </s-link>
    <s-link :href="baidu" type="success">
      <template v-slot:icon>
        <img src="/link.svg">
      </template>
      success
    </s-link>
    <s-link :href="baidu" type="warning">
      <template v-slot:icon>
        <img src="/link.svg">
      </template>
      warning
    </s-link>
    <s-link :href="baidu" type="danger">
      <template v-slot:icon>
        <img src="/link.svg">
      </template>
      danger
    </s-link>
    <s-link :href="baidu" type="info">
      <template v-slot:icon>
        <img src="/link.svg">
      </template>
      info
    </s-link>
  </div>
  <div>
    带下划线：
    <s-link :href="baidu" >default</s-link>
    <s-link :href="baidu" type="primary">primary</s-link>
    <s-link :href="baidu" type="success">success</s-link>
    <s-link :href="baidu" type="warning">warning</s-link>
    <s-link :href="baidu" type="danger">danger</s-link>
    <s-link :href="baidu" type="info">info</s-link>
  </div>
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
.scene-link{
  margin:0 5px;
}
</style>
