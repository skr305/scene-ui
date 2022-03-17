<template>
  <div 
    class="scene-radio-default" 
    :class="[
            `scene-radio-${size}`,
            `scene-radio-border-${border}`
    ]" 
  >
          <input
            type="radio" 
            :name="name" 
            :value="modelValue" 
            :disabled="disabled"
            @change="handleChange"
          />
          <label>
              <slot>{{label}}</slot>
          </label>
  </div>
</template>

<script lang="ts" setup>
import { toRefs, nextTick } from 'vue'
import {isString ,isNumber, isBoolean} from '../../utils/typeAssert'
type radioType = 'default' | 'large' | 'small'
interface radioProps{
    modelValue: string | number | boolean,  //单选框绑定的值
    label?: string,                         //单选框的文本
    disabled?: boolean,                     //是否禁用单选框
    border?: boolean,                       //是否显示边框
    size?: radioType,                        //Radio 的尺寸
    name: string                            //原生的name属性
}

const props = withDefaults(defineProps<radioProps>(),{
    modelValue: undefined,      
    label: 'option',      
    disabled: false,        
    border: false,          
    size: 'default',        
    name: undefined
})
// 触发父组件的事件
const emit = defineEmits({
    // onchange函数的验证函数
    change: (val: string | number | boolean) => isString(val) || isNumber(val) || isBoolean(val),
})
// 组件原生的change事件回调函数
const handleChange = (evt: MouseEvent)=>{
    console.log(
        props.modelValue+'\n'+
        props.label+'\n'+
        props.disabled+'\n'+
        props.border+'\n'+
        props.size+'\n'+
        props.name+'\n'
    )
    emit('change',props.modelValue)
}
</script>

<script lang="ts">
export default {
  name: "scene-radio",
};
</script>


<style scoped>
.scene-radio-default{
    width: 100px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.scene-radio-default:checked{
    
}
.scene-radio-default:disabled{
    border-color: #b4b4b4;
    background: #b4b4b4;
}
.scene-radio-border-true{
    border: black 1px solid;
}
</style>