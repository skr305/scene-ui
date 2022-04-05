<template>
<!-- div 没有禁用属性 -->
    <div
      class='scene-number-input-default'
      :class='[
        `scene-number-input-${size}`
      ]'
      :style="{color: theme}"
    >
        <button :disabled="disabled" class="scene-number-input-button" @click="decrease">-</button>
        <input 
            type='text'
            ref="input"
            :name='name'
            :value='modelValue'
            :label='label'
            :disabled="disabled"
            class="scene-number-input-input"
            @blur="handleBlur"
            @focus="handleFocus"
            @input="handleInput"
            @change="handleInputChange"
        />
        <button :disabled="disabled" class="scene-number-input-button" @click="increase">+</button>
    </div>
</template>

<script lang='ts'>
import {defineComponent,nextTick,onMounted,reactive,ref,watch,getCurrentInstance} from 'vue'
import {isNumber} from '../../core/lib/type-assert'
import {numberInputProps,numberInputEmits} from './number-input'

export default defineComponent({
  name:'scene-number-input',
  props: numberInputProps,
  emits: numberInputEmits,
  setup(props,{emit,attrs,slots,expose}){
    const input = ref<HTMLInputElement>()

    const instance = getCurrentInstance(); //访问内部组件实例

    // 保存改变时的新值与旧值，旧值只有在用户输入时才保存
    const data = reactive<{
        currentValue: number,
        userInput: number | null
    }>({
        currentValue: props.modelValue,
        userInput: null,
    })

    // 输入事件，用于保存用户输入的值
    const handleInput = (event: InputEvent) => {
        // console.log('input')
        if(event.data){
            let inputVal = parseInt(event.data) // 尝试将输入的值转为Number
            data.userInput  = isNaN(inputVal)? 0 : inputVal
        }
        else{
            data.userInput = 0                  // 用户输入的值为空，自动设为默认值0
        }
        // 同时也会触发handleInputChange函数
    }

    // 用户手动输入时，触发外层绑定的Change事件
    const handleInputChange = (event: Event) => {
        // console.log('change');
        const newVal = data.userInput
        if ((isNumber(newVal) && !Number.isNaN(newVal)) && newVal !== null) {
            setCurrentValue(newVal)
        }
        data.userInput = null
    }

    //改变当前绑定的值的方法,newVal为新的值，在点击-或+按钮时 以及用户手动输入时触发
    //连续两次出错我应该如何重新渲染页面？ 外层v-model绑定的值没有修改 没法触发渲染
    const setCurrentValue = (newVal: number) => {
        // console.log('set',newVal);
        const oldVal = props.modelValue
        if (newVal !== undefined && newVal >= props.max) newVal = props.max //不超过最大值
        if (newVal !== undefined && newVal <= props.min) newVal = props.min //不超过最小值
        if (oldVal === newVal){
            instance?.proxy?.$forceUpdate();    // 强制强制重新渲染
            return 
        }
        if (!isNumber(newVal)) {
            newVal = 0                                                      // 输入的不是数字，改为默认值
        }
        data.userInput = null
        // console.log('update',newVal,oldVal,emit);
        emit('update:modelValue', newVal)   // 更改外层的v-model绑定的值，modelValue是readonly常量，修改其值需要触发update
        // console.log(props.modelValue);
        emit('change', newVal, oldVal)      // 触发change事件，传入新值与旧值
        data.currentValue = newVal          // 更新data.currentvalue
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
      input.value?.focus?.()
    }

    const blur = () => {
      input.value?.blur?.()
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
    width: 100px;
    height: 30px;
    border: 1px solid;
    border-radius: 5px;
}
.scene-number-input-button{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20%;
    border:none;
    border-radius: 5px;
    background: white;
    /* 文字无法被选中 */
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
}
.scene-number-input-input{
    width: 60%;
    outline: none;
    text-align: center;/** input内容居中 */
    border-width: 0px 1px;
    border-style: solid;
}
.scene-number-input-button:disabled{
    color: #C0C4CC;
    /* 光标变化 */
    cursor: not-allowed;
}
.scene-number-input-default:disabled{
    color: #C0C4CC;
    /* 光标变化 */
    cursor: not-allowed; 
}
</style>