<template>
    <div class="scene-select"
        :disabled="disabled"
        :multiple="multiple"
        :multiple-limit="multipleLimit"
        :collapseTags="collapseTags"
    >
        <!-- 单选输入框 -->
        <input id="scene-select-input" type="text" readonly
            ref="input"
            v-model="modelValue"
            :name="name"
            :placeholder="placeholder"
            @focus="handleFocus"
            @blur="handleBlur"
        />
        <img id="scene-select-icon" src="/down.svg" title="down">
            <!-- 选择器的隐藏部分 -->
        <div class="scene-select-dropdown-arrow"></div>
        <div class="scene-select-dropdown-menu" ref="menu">
            <div v-for="(option,index) of options" :key="index" class="scene-select-dropdown-menu-option">
                <!-- 作用域插槽，对外暴露 option 与 index -->
                <slot :option="option" :index="index"></slot>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import {defineComponent, onMounted, reactive, ref, toRefs} from 'vue'
import {selectProps, selectEmits} from './select'


export default defineComponent({
  name:'scene-select',
  props:selectProps,
  emits:selectEmits,
  setup(props,{emit,attrs,slots,expose}){
    // 选择器的选择区域 html引用
    const menu = ref<HTMLElement>()
    // input html引用
    const input = ref<HTMLInputElement>()
    
    // 清除选项div上的select伪类
    const clearSelectSign = ()=>{
        // 每一个选项的div集合
        let optionColleaction: HTMLCollection = menu.value!.children //非空断言

        if(optionColleaction.length > 0 ){
            for(let i=0;i<optionColleaction?.length;i++){
                optionColleaction.item(i)?.removeAttribute('selected')
            }
        }
    }

    onMounted(()=>{
        // 每一个选项的div集合
        let optionColleaction: HTMLCollection = menu.value!.children //非空断言
        
        if(optionColleaction.length > 0 ){
            // 存在选项 给每个选项注册click监听器
            for(let i=0;i<optionColleaction?.length;i++){
                //每个选项的div 绑定点击事件，点击时切换v-model值
                optionColleaction.item(i)?.addEventListener('mousedown',(e:Event)=>{
                    if(props.options && (props.disabledOptions.length === 0 || !props.disabledOptions[i])){
                        // 清除所有div上的selected attribute
                        clearSelectSign()
                        // 给当前选项div设置selected 
                        optionColleaction.item(i)?.setAttribute('selected','true')
                        emit('change',props.options[i] as string)
                        handleClick(props.options[i] as string)
                    }  
                })
            }

            // 检查disabledOptions
            if(props.disabledOptions.length > 0){
                // 需要给某些项选设置disabled属性
                props.disabledOptions.forEach((item,index)=>{
                    if(item){
                        // 设置样式
                        optionColleaction.item(index)?.setAttribute('disabled','true') 
                    }
                        
                })
            }

        }else{
            // 不存在选项
            let text = document.createTextNode('No Options!')
            let div = document.createElement('div')
            div.setAttribute('class','scene-select-no-options')
            div.appendChild(text)
            menu.value?.appendChild(div)
        }
    })

    // 点击选项的click事件
    const handleClick = (val:string)=>{
        emit('update:modelValue',val)
    }
    // 触发外层绑定Focus事件
    const handleFocus = (event: MouseEvent) => {
        // isOpen.value = true
        emit('focus', event)
    }
    // 触发外层绑定Blur事件
    const handleBlur = (event: MouseEvent) => {
        // setTimeout(()=>{console.log('blur');},1000)
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
        menu,
        input,
        focus,
        blur,
        handleFocus,
        handleBlur,
    }
  }
})
</script>
<style scoped>
/* 选择器主体 */
.scene-select{
    display: inline-flex;
    width: 220px;
    height: 32px;
    position: relative; /** 定位该元素是子元素中设置了position：absolute的相对父元素*/
    justify-content: space-between;
    align-items: center;
    border: #409EFF 1px solid;
    border-radius: 5px;
}
/* 选择器的输入框 */
#scene-select-input{
    outline: none;
    border: none;
    width: calc(90% - 10px); /** 198px - 10px*/
    height: calc(100%); /** 32px */
    padding: 0 0 0 10px;
    border-radius: 5px;
}
/* 多选情况下的tag容器 */
#scene-select-multiple-container{
    position: absolute;
    background: #409EFF;

    outline: none;
    border: none;
    width: calc(90% - 20px); /** 198px - 10px*/
    height: calc(100%); /** 32px */
    padding: 0 0 0 10px;
    border-radius: 5px;
    
}
/* 选择器的按钮 */
#scene-select-icon{
    width: calc(10% - 4px); /** 22px - 4px */
    height: calc(100% - 4px); /** 32px -4px  */
    margin-right: 4px;
    transition: transform 0.5s ease;
}
/* 选择器的箭头 */
.scene-select-dropdown-arrow{
    /* display: none; */
    visibility: hidden;
    position: absolute;
    width: 10px;
    height: 10px;
    background: white;
    top: calc(100%);
    left: calc(50%);
    border-top: #409EFF 1px solid;
    border-right: #409EFF 1px solid;
    transform: rotate(-45deg);
    z-index: -1;
    opacity: 0;
    transition: all 0.5s ease;
}
/* 选择器的选项区域 */
.scene-select-dropdown-menu{
    /* display: none; */
    visibility: hidden; /** 占用空间但点击无效 */
    position: absolute;
    width: 218px; /** 200px - 1px * 2  */
    height: 168px; /** 190px - 5px*2 - 1px*2 */
    border:#409EFF 1px solid;
    border-radius: 5px;
    top: calc(100% + 5px);
    padding: 5px 0;
    z-index: -2;
    opacity: 0;
    transition: all 0.5s ease;
}
/* 选择器具体的选项 */
.scene-select-dropdown-menu-option{
    width: calc(100% - 20px);
    height: 20%;
    padding: 0 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    /* 文字溢出处理 */
    overflow: hidden
}
/* 被禁用 */
.scene-select-dropdown-menu-option[disabled="true"]{
    cursor:not-allowed;
    color:#a8abb2;
}
/* 选中 */
.scene-select-dropdown-menu-option[selected="true"]{
    color:#409EFF
}
/* 悬浮 */
.scene-select-dropdown-menu-option:hover{
    background: #f5f7fa;
}
/* 点击获取焦点显示选项 */
#scene-select-input:focus~.scene-select-dropdown-menu{
    opacity: 1;
    transform: translateY(10px);
    visibility:visible
    /* display: block; */
}
#scene-select-input:focus~.scene-select-dropdown-arrow{
    opacity: 1;
    transform: translateY(10px) rotate(-45deg) ;
    visibility:visible
    /* display: block; */
}
#scene-select-input:focus+#scene-select-icon{
    transform: rotate(180deg);
}

/* 没有选项时的提示 */
.scene-select-no-options{
    width: calc(100% - 20px);
    min-height: 100%;
    padding: 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>