<template>
    <div ref="el" class="scene-input" :disabled="disabled">
        <!-- 前面的图标插槽 最大图标大小 22*22 -->
        <div v-if="$slots.prefix" class="scene-input-slot">
            <slot name="prefix"></slot>
        </div>
        <div class="scene-input-main">
            <input
                ref="input" 
                :name="name"
                :type="inputType"
                v-model="inputValue"
                spellcheck="false"
                :placeholder="placeholder"
                :readonly="readonly"
                :disabled="disabled"
                @input="updateValue"
                @focus="handleFocus"
                @blur="handleBlur"/>
            <div class="scene-input-main-plugin">
                <div class="scene-input-main-plugin-clear" v-if="clearable && type==='text'">
                  <img src="/close_12.svg" @click="updateValue(null,'')" />  
                </div>
                <div class="scene-input-main-plugin-eye"  v-if="type==='password'">
                  <img v-if="isFocus && isEncrypt" src="/eye_12.svg"  @mousedown="showPassword($event,true)"/>  
                  <img v-if="isFocus && !isEncrypt" src="/eye-close_12.svg"  @mousedown="showPassword($event,false)"/> 
                </div>
            </div>
        </div>
        <div v-if="$slots.suffix" class="scene-input-slot">
            <slot name="suffix"></slot>
        </div>
        <div ref="tip" v-if="validate !== undefined" class="scene-input-tip">
            {{warningInfo}}
        </div>
    </div>
</template>

<script lang='ts'>
import {computed, toRefs, defineComponent,onMounted,reactive,ref, onUpdated} from 'vue'
import {inputProps, inputEmits} from './input'
import '../../styles/global.css'

export default defineComponent({
  name:'scene-input',
  props: inputProps,
  emits: inputEmits,
  setup(props,{emit,attrs,slots,expose}){
    // 模板引用
    const input = ref<HTMLInputElement>()
    const tip = ref<HTMLElement>()

    // 组件的内置数据
    const data = reactive({
        inputValue : ref<string | number>(''),// 展示不加密的内置input的v-model值
        isEncrypt: true,// 控制展示加密还是不加密
        // 内置input的类型
        inputType: computed(()=>{
            if(props.type === 'password' && data.isEncrypt === true)
                return 'password'
            else
                return 'text'
        }),
        isFocus: false,
        isWarning: false,
        warningInfo: ''
    })
    
    /**
     * 更新props.modelValue
     */
    function updateValue(event:InputEvent, newVal?: string | number){
        let oldVal = props.modelValue!
        let target;
        if(newVal === undefined){// 用户直接输入
            target = (event.target as HTMLInputElement).value;
            emit('input',target)
        }else{
            // 系统更改
            target = newVal
        }
        // 如果用户输入了validate验证函数
        if(props.validate !== undefined){
            let res = props.validate(target)
            data.warningInfo = res[1]
            // 验证成功
            if(res[0]){
                data.isWarning = false
                // 修改props的modelValue
                emit("update:modelValue",target); 
                // 修改展示的modelValue
                data.inputValue = target
                emit('change',target,oldVal)
            }else{
                data.isWarning = true
                data.inputValue = oldVal
            }
                
        }
    }

    /**
     * 显示密码
     */
    function showPassword(e:Event,show: boolean){
        if(show)// 显示未加密password
            data.isEncrypt = false
        else
            data.isEncrypt = true
        e.preventDefault()
    }

    // 触发外层绑定Focus事件
    const handleFocus = (event: MouseEvent) => {
        data.isFocus = true
        emit('focus', event)
    }
    // 触发外层绑定Blur事件
    const handleBlur = (event: MouseEvent) => {
        data.isFocus = false
        emit('blur', event)
    }
    // 暴漏给外部的方法
    const focus = () => {
      input.value?.focus?.()
    }
    const blur = () => {
      input.value?.blur?.()
    }

    onMounted(()=>{
        // 设置输入框的宽度
        input.value!.style.width = props.width+'px'
    })

    onUpdated(()=>{
        let tipDiv = tip.value
        // 提示信息存在
        if(tipDiv !== undefined){
            tipDiv.style.right = '-'+tipDiv.scrollWidth+'px'
            if(data.isWarning)
                tipDiv.style.color = 'red'
            else
                tipDiv.style.color = 'green'
        }
            
    })

    return {
        ...toRefs(data),
        input,
        tip,
        updateValue,
        showPassword,
        handleFocus,
        handleBlur,
        focus,
        blur,
    }
  }
})
</script>
<style scoped>
.scene-input{
    display: inline-flex;
    position: relative;
    flex-direction: row;
    border: var(--scene-border-size) solid var(--scene-border-color-light);
    border-radius: var(--scene-border-radius);
}
/* disabled 样式 */
.scene-input[disabled = 'true']{
    background: var(--scene-color-disabled);
    cursor: not-allowed;
}
.scene-input-main input:disabled{
    background: var(--scene-color-disabled);
    cursor: not-allowed;
}

.scene-input:hover{
    border: var(--scene-border-size) solid var(--scene-border-color-dark);
}
/* 选择器主体的子元素有获取焦点时 */
.scene-input:focus-within{
    border: var(--scene-border-size) solid var(--scene-theme-color-main);
}
.scene-input-slot{
    height: 22px;
    padding: 4px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.scene-input-main{
    height: 30px;
    width: 230px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.scene-input-main input{
    outline: none;
    border: none;
    height: 26px;
    width: 200px;
    padding: 2px 5px;

    font-size: var(--scene-font-size);
    font-family: var(--scene-font-family);
    letter-spacing: var(--scene-letter-spacing);
    color: var(--scene-font-color-dark)
}
/* 去除password默认眼睛 */
input::-ms-clear{display:none;}
input::-ms-reveal{display:none;}
/* 对 input中的placeholder的样式 */
.scene-input-main input::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    color: var(--scene-color-Extra-dark-gray);
    font-size: var(--scene-font-size);
    font-family: var(--scene-font-family);
    letter-spacing: var(--scene-letter-spacing);
}
.scene-input-main input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: var(--scene-color-Extra-dark-gray);
    font-size: var(--scene-font-size);
    font-family: var(--scene-font-family);
    letter-spacing: var(--scene-letter-spacing);
}
.scene-input-main input::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: var(--scene-color-Extra-dark-gray);
    font-size: var(--scene-font-size);
    font-family: var(--scene-font-family);
    letter-spacing: var(--scene-letter-spacing);
}
.scene-input-main input:-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: var(--scene-color-Extra-dark-gray);
    font-size: var(--scene-font-size);
    font-family: var(--scene-font-family);
    letter-spacing: var(--scene-letter-spacing);;
}
/* input的按钮区域 */
.scene-input-main-plugin{
    padding: 9px 4px;
    width: 12px;
    height: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
}
/* input的验证提示框 */
.scene-input-tip{
    position: absolute;
    top: 0;
    height: 20px;
    padding: 5px;

    font-size: var(--scene-font-size);
    font-family: var(--scene-font-family);
    letter-spacing: var(--scene-letter-spacing);
}
</style>