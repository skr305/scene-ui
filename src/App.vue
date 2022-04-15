<script setup lang="ts">
import { reactive, watch, ref } from 'vue';
import paymentInputVue from '../package/components/payment/s-payment-input.vue';
import sInput from '../package/components/input/input.vue'
import sTextarea from '../package/components/textarea/textarea.vue'
import sButton from '../package/components/button/button.vue';
import sRadio from '../package/components/radio/radio.vue'
import sNumberInput from '../package/components/number-input/number-input.vue'
import sLink from '../package/components/link/link.vue'
import sSelect from '../package/components/select/select.vue'
import sScrollbar from '../package/components/scrollbar/scrollbar.vue'
import sCheckbox from '../package/components/checkbox/checkbox.vue'
import sCheckboxButton from '../package/components/checkbox/checkbox-button.vue';
import sCard from '../package/components/card/card.vue'
import sCheckboxGroup from '../package/components/checkbox/checkbox-group.vue';
import sDialog from '../package/components/dialog/dialog.vue'
import sDatetime from '../package/components/datetime/datetime.vue'
import message, { SceneMessageStyleType }  from '../package/components/message';
import {SceneLoading} from '../package/components/loading/loading'


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
const emptyStr1 = ref('')
const emptyStr2 = ref('')
const print = (...args: any[])=>{
  console.log(...args)
}
const date1 = ref(new Date('2022-01-2'))

const data = reactive( { value: "", pwd: "" } );
watch( data, () => {
  console.log( data );
} );
const text = ref( "" );
watch( text, () => {
  console.log( "on text change", text.value );
} )

const select = ref( false );
watch( select, () => {
  console.log( select.value );
} )
const checkLabels = ref( [
  "两广",
  "汉中",
  "大同"
] );
watch( checkLabels, () => {
  console.log( checkLabels.value );
}, { deep: true });

const onMessage = (type: string) => {
  message({type: type as SceneMessageStyleType, text: "成功", showCloseButton: true, "duration": 5000 });
}

const card1 = ref<HTMLElement>()
const onLocalLoading = (target: HTMLElement | string) =>{
  let loadingInstance = SceneLoading.service({
    target: target,
    fullScreen: true,
    text: 'loading...',
    onClose: ()=>{
      console.log('loading close!');
    }
  })
  loadingInstance.open()
  setTimeout(loadingInstance.close,5000)
}
const onGlobalLoading = () =>{
  let loadingInstance1 = SceneLoading.service({
    target: 'body',
    fullScreen: true,
    text: 'loading...',
    onClose: ()=>{
      console.log('loading close!');
    }
  })
  loadingInstance1.open()
  setTimeout(loadingInstance1.close,5000)
}

const inputValidator = (value: string | number)=>{
  if(value.toString().length > 19)
    return [false, 'out of length']
  else
    return [true, 'success!']
}

</script>

<template>
  <div class="exhibition">
    <s-input v-model="emptyStr" :disabled="false" @change="print(emptyStr)">
      <template #prefix>
        <img src="/search_16.svg">
      </template>
      <template #suffix>
        <span>.com</span>
      </template>
    </s-input>
    <s-input v-model="emptyStr" type="password" :validate="inputValidator" :disabled="false" @change="print(emptyStr)">
      <template #prefix>
        <img src="/search_16.svg">
      </template>
      <template #suffix>
        <span>.com</span>
      </template>
    </s-input>
  </div>
  <div class="exhibition">
    <s-textarea v-model="emptyStr1" :width="300" :height="300" :maxLength="30" @change="print(emptyStr1)">
    </s-textarea>
  </div>
  <div class="exhibition">
    <s-button size="default" theme="main" :disabled="booleanFalse" type="default" @click="print"/>
    <s-button size="default" theme="info" :disabled="booleanFalse" type="default" @click="print">
      <template v-slot:icon>
        <img src="/set_16.svg">
      </template>
    </s-button>
    <s-button size="default" theme="success" :disabled="booleanFalse" type="text" @click="print">
      <template v-slot:icon>
        <img src="/set_16.svg">
      </template>
    </s-button>
    <s-button size="large" theme="warning" :disabled="booleanFalse" type="round" @click="print">
      <template v-slot:icon>
        <img src="/set_16.svg">
      </template>
    </s-button>
    <s-button size="small" theme="error" :disabled="booleanFalse" type="default" @click="print">
      <template v-slot:icon>
        <img src="/set_16.svg">
      </template>
    </s-button>
  </div>
  <div class="exhibition">
    <s-link :href="baidu" >default</s-link>
    <s-link :href="baidu" theme="warning">default</s-link>
  </div>
  <div class="exhibition">
    <s-number-input v-model='num1' name='count' :max="10" :min="-2" :step="0.5"/>
  </div>
  <!--<div class="exhibition">
    <paymentInputVue v-model="data.pwd"/>
  </div>
  <div class="exhibition">
    <s-radio v-model="num1" name="contact" label="phone" :disabled="false" size="large" theme="red"></s-radio>
    <s-radio v-model="num2" name="contact" label="email" :disabled="false" size="small"></s-radio>
  </div>-->
  <div>
    <s-checkbox v-model="select" label="是否堂食" size="large"></s-checkbox>
    <s-checkbox v-model="select" theme="success"  label="是否堂食"></s-checkbox>
    <s-checkbox v-model="select" unsure theme="warning"  label="待确认" size="small"></s-checkbox>
    <s-checkbox disabled label="Disabled"></s-checkbox>
  </div>

  <div>
    <s-checkbox-button v-model="select">默认</s-checkbox-button>
    <s-checkbox-button theme="warning" leftBorderRound>左圆</s-checkbox-button>
    <s-checkbox-button theme="success">变色</s-checkbox-button>
    <s-checkbox-button theme="main" disabled>Disabled</s-checkbox-button>
    <s-checkbox-group v-model="checkLabels">
        <s-checkbox-button label="两广"></s-checkbox-button>
        <s-checkbox-button label="大同"></s-checkbox-button>
        <s-checkbox-button label="武汉"></s-checkbox-button>
    </s-checkbox-group>
    <s-checkbox-group v-model="checkLabels">
        <s-checkbox label="两广"></s-checkbox>
        <s-checkbox label="大同"></s-checkbox>
        <s-checkbox label="武汉"></s-checkbox>
    </s-checkbox-group>
  </div>
  <div class="exhibition">
    <s-card ref="card1" id="card" shadow="hover" :body-style="{padding:'10px',display:'flex',flexDirection:'column'}" class="square">
      <template #header>
        <div class="card-header">
          <span>Card Name</span>
          <s-button @click="onLocalLoading(card1)" type="text">local loading</s-button>
        </div>
      </template>
      <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
    </s-card>
  </div>
  <div class="exhibition">
    <s-datetime v-model="date1" name="start"></s-datetime>
  </div>

  <div class="exhibition">
    <s-button @click="booleanFalse = true">Show Modal</s-button>
    <s-dialog v-model="booleanFalse" 
      title="title" 
      :modal="booleanFalse" 
      @open="print"
      @opened="print"
      @close="print" 
      @closed="print"
    >
      <s-card id="card2" shadow="hover" :body-style="{padding:'10px',display:'flex',flexDirection:'column'}" class="square">
        <template #header>
          <div class="card-header">
            <span>Card Name</span>
            <s-button @click="onLocalLoading('#card2')" type="text">
              local loading
            </s-button>
          </div>
        </template>
        <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
      </s-card>
    </s-dialog>
  </div>

  <div class="exhibition">
    <s-select v-model="emptyStr2" :multiple="booleanTrue" :multiple-limit="2" :name="str" :options="options" :disabledOptions="[false,true,false,false,false,false]" @change="print">
      <template v-slot="slotProps">
        <span>
          {{slotProps.option}}
        </span>
      </template>
    </s-select>
  </div>

  <div class="exhibition">
    <s-button @click="onGlobalLoading">
        global loading
    </s-button>
  </div>
  <div class="exhibition">
    <s-button @click="onMessage('info')">
        跳出信息
    </s-button>
    <s-button @click="onMessage('success')">
        跳出成功信息
    </s-button>
    <s-button @click="onMessage('warning')">
        跳出警示信息
    </s-button>
    <s-button @click="onMessage('error')">
        跳出错误信息
    </s-button>
  </div>
</template>

<style>
@import '../package/styles/global.css';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 2000px;
}
.scene-link{
  margin:0 5px;
}
.exhibition{
  display: flex;
  justify-content: space-around;
  align-items: center;
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
