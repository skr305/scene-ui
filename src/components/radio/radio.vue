<template>
  <div 
    class="scene-radio-default" 
    :class="[
            `scene-radio-${size}`,
            `scene-radio-border-${border}`
    ]"
    :style="{color: theme}" 
  >
        <input
            type="radio" 
            :name="name" 
            :value="modelValue" 
            :disabled="disabled"
            @change="handleChange"
        />
        <label>
            {{label}}
        </label>
  </div>
</template>

<script lang='ts'>
import {defineComponent} from 'vue'
import {radioProps, radioEmits} from './radio'

export default defineComponent({
  name:'scene-radio',
  props:radioProps,
  emits:radioEmits,
  setup(props,{emit,attrs,slots,expose}){
    // 组件原生的change事件回调函数
    const handleChange = (evt: MouseEvent)=>{
        if(props.modelValue === undefined)
          emit('change','undefined')
        else
          emit('change',props.modelValue)
    }

    return {
      handleChange
    }
  }
})
</script>

<style scoped>
.scene-radio-default{
    width: 100px;
    height: 50px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
}
.scene-radio-small{
    width: 80px;
    height: 40px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
}
.scene-radio-large{
    width: 120px;
    height: 55px;
    display: inline-flex;
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