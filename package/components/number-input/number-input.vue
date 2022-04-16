<template>
<!-- div 没有禁用属性 -->
    <div class='scene-number-input-default'> 
        <s-input 
            type='text'
            ref="input"
            :name='name'
            :modelValue='modelValue'
            :disabled="disabled"
            :clearable="false"
            :readonly="true"
            :center="true"
            :width="50"
            class="scene-number-input-input"
            @blur="handleBlur"
            @focus="handleFocus"
            @input="handleInput"
            @change="handleInputChange"
        >
            <template #prefix>
                <button :disabled="disabled" class="scene-number-input-button" @click="decrease">➖</button>
            </template>
            <template #suffix>
                <button :disabled="disabled" class="scene-number-input-button" @click="increase">➕</button>
            </template>
        </s-input>
    </div>
</template>

<script lang='ts'>
import {defineComponent,reactive,ref,watch,getCurrentInstance} from 'vue'
import {isNumber} from '../../core/lib/type-assert'
import {numberInputProps,numberInputEmits} from './number-input'
import sInput from '../input/input.vue'


export default defineComponent({
  name:'scene-number-input',
  props: numberInputProps,
  emits: numberInputEmits,
  components: {sInput},
  setup(props,{emit,attrs,slots,expose}){
    const input = ref<any>()
    const instance = getCurrentInstance(); //访问内部组件实例

    // 输入事件，由s-input的updateValue函数触发
    const handleInput = (inputVal: number) => {
        emit('input',inputVal)
    }
    // input值改变后，由s-input的updateValue函数触发
    const handleInputChange = (newVal: number,oldVal: number) => {
        emit('change',newVal,oldVal)
    }

    //改变当前绑定的值的方法,newVal为新的值，在点击-或+按钮时 以及用户手动输入时触发
    //连续两次出错我应该如何重新渲染页面？ 外层v-model绑定的值没有修改 没法触发渲染
    const setCurrentValue = (newVal: number) => {
        // console.log('set',newVal);
        let oldVal = props.modelValue
        if (newVal !== undefined && newVal >= props.max) newVal = props.max //不超过最大值
        if (newVal !== undefined && newVal <= props.min) newVal = props.min //不超过最小值
        if (oldVal === newVal){
            instance?.proxy?.$forceUpdate();    // 强制重新渲染
            return 
        }
        if (!isNumber(newVal)) {
            newVal = 0                                                      // 输入的不是数字，改为默认值
        }
        emit('update:modelValue', newVal)   // 更改外层的v-model绑定的值，modelValue是readonly常量，修改其值需要触发update
        input.value!.updateValue(undefined,newVal)// 调用input组件的updateValue方法改变input组件内置input绑定的值
        emit('change', newVal, oldVal)      // 触发change事件，传入新值与旧值
    }

    // 数字按步长减小
    const decrease = ()=>{
        // console.log('decrease');
        setCurrentValue(props.modelValue - props.step)
    }
    // 数字按步长增加
    const increase = ()=>{
        // console.log('increase');
        setCurrentValue(props.modelValue + props.step)
    }

    // 触发外层绑定Focus事件
    const handleFocus = (event: MouseEvent) => {
        emit('focus', event)
    }
    // 触发外层绑定Blur事件
    const handleBlur = (event: MouseEvent) => {
        emit('blur', event)
    }

    // 暴漏给外部的方法
    const focus = () => {
      input.value!.focus?.()
    }
    const blur = () => {
      input.value!.blur?.()
    }
    
    return{
        input,
        increase,
        decrease,
        handleInput,
        handleFocus,
        handleBlur,
        handleInputChange,
        focus,
        blur,
    }
  }
})
</script>


<style scoped>
.scene-number-input-default{
    display: inline-flex;
}
.scene-number-input-button{
    display: flex;
    justify-content: center;
    align-items: center;
    border:none;
    border-radius: var(--scene-border-radius);
    /* 文字无法被选中 */
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
}
.scene-number-input-input{
    outline: none;
    border-style: solid;
}
.scene-number-input-button:disabled{
    background: var(--scene-color-disabled);
    cursor: not-allowed;
}
.scene-number-input-default:disabled{
    background: var(--scene-color-disabled);
    cursor: not-allowed;
}
</style>