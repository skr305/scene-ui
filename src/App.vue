<script setup lang="ts">
import { reactive, watch, ref } from 'vue';
import buttonVue from './components/button/button.vue';
import paymentInputVue from './components/payment/s-payment-input.vue';
import sInput from './components/input/s-input.vue'

import sButton from './components/button/button.vue';
import sRadio from './components/radio/radio.vue'
import scrollbar from './components/scrollbar/scrollbar.vue'
import sNumberInput from './components/number-input/number-input.vue'
import sLink from './components/link/link.vue'
import sSelect from './components/select/select.vue'
import sScrollbar from './components/scrollbar/scrollbar.vue'
import sCard from './components/card/card.vue'

const booleanTrue = ref(true)
const booleanFalse = ref(false)
const str = ref('input')
const num1 = ref(8)
const num2 = ref(9)
const arr = reactive([1,2,3,4,5,6,7,8,9])
const options = ref([
  'option1',
  'option2',
  'option3',
  'option4',
  'option5',
  'option6'
])

const baidu = ref('https://www.baidu.com')
const emptyStr = ref('')

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
  <div class="exhibition">
    <s-input v-model="emptyStr"></s-input>
  </div>
  <div class="exhibition">
    <s-button size="large" theme="red" :disabled="booleanFalse" type="default" @click="print">
      <template v-slot:icon>
        <img src="/set_16.svg">
      </template>
    </s-button>
    <s-button size="default" theme="red" :disabled="booleanFalse" type="default" @click="print">
      <template v-slot:icon>
        <img src="/set_16.svg">
      </template>
    </s-button>
    <s-button size="small" theme="red" :disabled="booleanFalse" type="default" @click="print">
      <template v-slot:icon>
        <img src="/set_16.svg">
      </template>
    </s-button>
  </div>
  <div class="exhibition">
    <paymentInputVue v-model="data.pwd"/>
  </div>
  <div class="exhibition">
    <s-radio v-model="num1" name="contact" label="phone" :disabled="false" size="large" theme="red"></s-radio>
    <s-radio v-model="num2" name="contact" label="email" :disabled="false" size="small"></s-radio>
  </div>
  <div class="exhibition">
    <s-number-input v-model='num1' name='count' :max="10" :min="-2" :step="0.5"/>
  </div>
  <div class="exhibition">
    <s-link :href="baidu" >default</s-link>
    <s-link :href="baidu" theme="red">default</s-link>
  </div>
  <div class="exhibition">
    <s-scrollbar  :width="100" :height="100">
      <div style="width:100px;height:200px;background:yellow">
        <p style="margin:0">111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
      </div>
    </s-scrollbar>
  </div>

  <div class="exhibition">
    <s-card shadow="hover" :body-style="{padding:'10px',display:'flex',flexDirection:'column'}" class="square">
      <template #header>
        <div class="card-header">
          <span>Card Name</span>
          <s-button class="button" type="text">Operation button</s-button>
        </div>
      </template>
      <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
    </s-card>
  </div>

  <div class="exhibition">
    <s-select v-model="emptyStr" :multiple="booleanTrue" :multiple-limit="2" :name="str" :options="options" :disabledOptions="[false,true,false,false,false,false]" @change="print">
      <template v-slot="slotProps">
        <span>
          {{slotProps.option}}
        </span>
      </template>
    </s-select>
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
.scene-link{
  margin:0 5px;
}
.exhibition{
  margin-bottom: 20px
}
/* card 测试css */
.square{
  width: 400px;
  height: 300px
}
.card-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
  flex-grow: 1;
}
</style>
