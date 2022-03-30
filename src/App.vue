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
  'option5'
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
  <div>
    <s-input v-model="emptyStr"></s-input>
  </div>
  <div>
    <s-button size="default" theme="red" :disabled="booleanFalse" type="default" @click="print">
      <template v-slot:icon>
        <img src="/setting.svg">
      </template>
    </s-button>
  </div>
  <div>
    <paymentInputVue v-model="data.pwd"/>
  </div>
  <div>
    <s-radio v-model="num1" name="contact" label="phone" :disabled="false" size="large" theme="red"></s-radio>
    <s-radio v-model="num2" name="contact" label="email" :disabled="false" size="small"></s-radio>
  </div>
  <div>
    <s-number-input v-model='num1' name='count' :max="10" :min="-2" :step="0.5"/>
  </div>
  <div>
    <s-link :href="baidu" >default</s-link>
    <s-link :href="baidu" theme="red">default</s-link>
  </div>

  <div>
    <s-select v-model="emptyStr" :multiple="booleanTrue" :multiple-limit="2" :name="str" :options="options" :disabledOptions="[false,true,false,false,false]" @change="print">
      <template v-slot="slotProps">
        <span>
          {{slotProps.option}}
        </span>
      </template>
    </s-select>
  </div>

  <div>
    <s-scrollbar  :width="100" :height="100">
      <div style="width:200px;height:200px;background:yellow">
        <p style="margin:0">111111111111</p>
        <p>111111111111</p>
        <p>111111111111</p>
      </div>
    </s-scrollbar>
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
</style>
