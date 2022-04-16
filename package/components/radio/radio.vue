<template>
  <div 
    class="scene-radio" 
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
      checked
    />
    <label>
      {{label}}
    </label>
  </div>
</template>

<script lang='ts'>
import {defineComponent} from 'vue'
import {radioProps, radioEmits} from './radio'
import '../../styles/global.css'

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
.scene-radio{
  display: inline-flex;
  position: relative;
}
/* size=default */
.scene-radio-default input[type="radio"]{
  position: absolute;
  width: 16px;
  height: 16px;
  margin: 0;
  opacity: 0;
  top: 6px;
  left: -8px;
  z-index: var(--scene-index-heighter);
}
.scene-radio-default label:before{
  content: '';
  display: inline-block;
  position: relative;
  width: 16px;
  height: 16px;
  border-radius: 18px;
  border: 1px solid var(--scene-border-color-dark);
  background: white;
  top: 5px;
  left: -9px;
  cursor: pointer;
  -webkit-transition: all 250ms ease;
  transition: all 250ms ease;
}
.scene-radio-default label{
  color: var(--scene-font-color-dark);
  font-size: var(--scene-font-size);
  font-family: var(--scene-font-family);
  letter-spacing: var(--scene-letter-spacing);
}
/* size=small */
.scene-radio-small input[type="radio"]{
  width: 14px;
  height: 14px;
  position: absolute;
  margin: 0;
  opacity: 0;
  top: 5px;
  left: -7px;
  z-index: var(--scene-index-heighter);
}
.scene-radio-small label:before{
  content: '';
  display: inline-block;
  position: relative;
  width: 14px;
  height: 14px;
  border-radius: 16px;
  border: 1px solid var(--scene-border-color-dark);
  background: white;
  top: 4px;
  left: -8px;
  cursor: pointer;
  -webkit-transition: all 250ms ease;
  transition: all 250ms ease;
}
.scene-radio-small label{
  color: var(--scene-font-color-dark);
  font-size: var(--scene-font-size-small);
  font-family: var(--scene-font-family);
  letter-spacing: var(--scene-letter-spacing);
}
/* size=large */
.scene-radio-large input[type="radio"]{
  position: absolute;
  width: 20px;
  height: 20px;
  margin: 0;
  opacity: 0;
  top: 7px;
  left: -8px;
  z-index: var(--scene-index-heighter);
}
.scene-radio-large label:before{
  content: '';
  display: inline-block;
  position: relative;
  width: 20px;
  height: 20px;
  border-radius: 22px;
  border: 1px solid var(--scene-border-color-dark);
  background: white;
  top: 6px;
  left: -9px;
  cursor: pointer;
  -webkit-transition: all 250ms ease;
  transition: all 250ms ease;
}
.scene-radio-large label{
  color: var(--scene-font-color-dark);
  font-size: var(--scene-font-size-large);
  font-family: var(--scene-font-family);
  letter-spacing: var(--scene-letter-spacing);
}
/* 选中时圆圈样式 */
.scene-radio input[type="radio"]:checked + label:before{
  background: var(--scene-theme-color-main);
  box-shadow: inset 0 0 0 4px #f4f4f4;
}
/* 获取焦点时圆圈样式 */
.scene-radio input[type="radio"]:focus + label:before{
  border-color: var(--scene-theme-color-main);
}
/* 选中时圆圈样式 */
.scene-radio input[type="radio"]:checked + label{
  color: var(--scene-theme-color-main);
}

.scene-radio input[type="radio"]:disabled + label:before {
  box-shadow: inset 0 0 0 4px #f4f4f4;
  background: var(--scene-color-disabled)
}

.scene-radio-border-true{
    border: var(--scene-theme-color-main) 1px solid;
}
</style>