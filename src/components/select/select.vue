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
        <!-- 多选tag组 -->
        <div id="scene-select-multiple-container"
            v-if="multiple"
            @click="focus"
        >   
            <div v-if="showTags" class="scene-select-multiple-tag">
                <span>{{selectedItems[selectedItems.length-1]}}</span>
                <img src="/close.svg" @click.stop="handleDelete($event)" title="close">
            </div>
            <div v-if="showTags" class="scene-select-multiple-count">
                <span>+{{selectedItems.length}}/{{multipleLimit}}</span>
            </div>
        </div>
        <img id="scene-select-icon" src="/down.svg" title="down">
            <!-- 选择器的隐藏部分 -->
        <div class="scene-select-dropdown-arrow"></div>
        <div class="scene-select-dropdown-menu">
            <s-scrollbar :width="220" :height="180">
                <div ref="menu" >
                   <div v-for="(option,index) of options" :key="index" class="scene-select-dropdown-menu-option" :tabindex="-1">
                        <!-- 作用域插槽，对外暴露 option 与 index -->
                        <slot :option="option" :index="index"></slot>
                    </div> 
                </div>
            </s-scrollbar>
        </div>
    </div>
</template>

<script lang='ts'>
import {computed, defineComponent, nextTick, onMounted, reactive, ref, toRefs} from 'vue'
import {selectProps, selectEmits} from './select'
import sScrollbar from '../scrollbar/scrollbar.vue'


export default defineComponent({
  name:'scene-select',
  props:selectProps,
  emits:selectEmits,
  components:{sScrollbar},
  setup(props,{emit,attrs,slots,expose}){
    // 选择器的选择区域 html引用
    const menu = ref<HTMLElement>()
    // input html引用
    const input = ref<HTMLInputElement>()
    // 多选的选项容器
    let selectedItems = ref<string[]>([]);
    // 多选框的选项容器的index
    let selectedItemsIndex = ref<number[]>([]);
    // 是否展示多选tags组
    let showTags = computed(()=>{
        return selectedItems.value.length > 0
    })
    // 已选择的选项的数目
    let selectedCount = computed(()=>{
        return selectedItems.value.length
    })

    // 清除选项div上的select伪类 index: 选项的索引
    const clearSelectSign = (index?:number)=>{
        // 每一个选项的div集合
        let optionColleaction: HTMLCollection = menu.value!.children //非空断言
        if(index !== undefined){
            optionColleaction.item(index)?.removeAttribute('selected')
        }else{
            if(optionColleaction.length > 0 ){
                for(let i=0;i<optionColleaction?.length;i++){
                    optionColleaction.item(i)?.removeAttribute('selected')
                }
            }
        }
    }
    // 设置选项div上的select伪类 index: 选项的索引
    const setSelectSign = (index: number)=>{
        // 每一个选项的div集合
        let optionColleaction: HTMLCollection = menu.value!.children //非空断言
        optionColleaction.item(index)?.setAttribute('selected','true')
    }

    // 点击选项的click事件——添加选项到容器中，修改相应性数据
    const handleClick = (val: string,isMultiple: boolean,index?: number,)=>{ // 一个可选参数不能跟一个必须参数
        if(isMultiple){
            // 如果有index 说明容器内没有该选项,添加
            // 反之，移除val
            if(index !== undefined){
                selectedItems.value.push(val)
                selectedItemsIndex.value.push(index)
                emit('update:modelValue',selectedItems.value)
            }else{
                 // 获取该项的index
                let index = selectedItems.value.indexOf(val)
                // 从容器中删除该项
                selectedItems.value.splice(index,1)
                selectedItemsIndex.value.splice(index,1)
                emit('update:modelValue',selectedItems.value)
            }
        }else{
            // 如果是单选的点击，清空容器在push
            selectedItems.value.splice(0,selectedItems.value.length)
            selectedItemsIndex.value.splice(0,selectedItemsIndex.value.length)
            selectedItems.value.push(val)
            selectedItemsIndex.value.push(index!)
            emit('update:modelValue',val)
        } 
    }

    // 多选tag组删除按钮的click方法,删除末尾元素
    const handleDelete = (e:Event)=>{
        clearSelectSign(selectedItemsIndex.value.pop())
        selectedItems.value.pop()
    }

    
    // 给选项div添加click监听器，设置disabled样式
    onMounted(()=>{
        // 每一个选项的div集合
        let optionColleaction: HTMLCollection = menu.value!.children //非空断言
            
        if(optionColleaction.length > 0 ){
            // 存在选项 给每个选项注册click监听器
            for(let i=0;i<optionColleaction?.length;i++){
                let curOptionString:string = props.options![i] as string // 当前选项的字符串形式
                // 对于不同的点击事件绑定不同的click函数
                if(props.multiple){
                    //每个选项的div 绑定点击事件，点击时切换v-model值
                    optionColleaction.item(i)?.addEventListener('mousedown',(e:Event)=>{
                        // 存在选项 并且 没有禁用项或该项不是禁用项
                        if(props.options && (props.disabledOptions.length === 0 || !props.disabledOptions[i])){
                            // 是否已被选中？
                            if(selectedItems.value.includes(curOptionString)){
                                // 清楚该项的样式
                                clearSelectSign(i)
                                // 移除该选项
                                handleClick(curOptionString,true)
                                emit('change',curOptionString)
                            }else{// 没有被选中过
                                // 当前选择数小于限制
                                if(selectedCount.value < props.multipleLimit){
                                    // 给当前选项div设置selected 
                                    setSelectSign(i)
                                    // 添加该选项
                                    handleClick(curOptionString,true,i)
                                    emit('change',curOptionString)
                                }  
                            }
                        }
                        e.preventDefault()//此事件没有被显式处理，它默认的动作也不应该照常执行。-->不失去焦点
                    })
                }else{
                    //每个选项的div 绑定点击事件，点击时切换v-model值
                    optionColleaction.item(i)?.addEventListener('mousedown',(e:Event)=>{
                        if(props.options && (props.disabledOptions.length === 0 || !props.disabledOptions[i])){
                            // 清除所有div上的selected attribute
                            clearSelectSign()
                            // 给当前选项div设置selected 
                            setSelectSign(i)
                            // 添加该选项
                            handleClick(curOptionString,false,i)
                            emit('change',curOptionString)
                        }  
                    })
                }        
            }
            // 检查disabledOptions
            if(props.disabledOptions.length > 0){
                // 需要给某些项选设置disabled属性
                props.disabledOptions.forEach((item,index)=>{
                    if(item)// 设置样式
                        optionColleaction.item(index)?.setAttribute('disabled','true')     
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
        input.value?.focus()
    }
    const blur = () => {
        input.value?.blur()
    }

    return{
        menu,
        input,
        selectedItems,
        showTags,
        focus,
        blur,
        handleFocus,
        handleBlur,
        handleDelete
    }
  }
})
</script>
<style scoped>
/* 选择器主体 */
.scene-select{
    display: inline-flex;
    width: 220px;
    min-height: 32px;
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
    z-index: 1001;
    opacity: 0;
    transition: all 0.5s ease;
}
/* 选择器的选项区域 */
.scene-select-dropdown-menu{
    /* display: none; */
    visibility: hidden; /** 占用空间但点击无效 */
    position: absolute;
    width: 220px; /** 220px - 1px * 2  */
    height: 190px; /** 190px - 5px*2 - 1px*2 */
    border:#409EFF 1px solid;
    border-radius: 5px;
    top: calc(100% + 5px);
    padding: 5px 0;
    z-index: 1000;
    opacity: 0;
    transition: all 0.5s ease;
    box-sizing: border-box;
}
/* 选择器具体的选项 */
.scene-select-dropdown-menu-option{
    width: calc(100% - 20px);
    height: 38px;
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
#scene-select-input:focus~#scene-select-icon{
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


/* 多选情况下的tag容器 */
#scene-select-multiple-container{
    position: absolute;
    background: white;
    outline: none;
    border: none;
    width: calc(90% - 10px); /** 198px - 10px*/
    min-height: calc(100%); /** 32px */
    padding: 0 0 0 10px;
    border-radius: 5px;

    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: flex-start;
    align-content: center;
    
}
/* 多选情况下的tag */
.scene-select-multiple-tag{
    background: #F0F2F5;
    color: #909399;
    min-width: 70px;
    height: 24px;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5px;
    margin-right: 5px;
    font-size: 12px;
    border-radius: 5px;
}
.scene-select-multiple-count{
    background: #F0F2F5;
    color: #909399;
    width: 30px;
    height: 24px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 0 5px;
    font-size: 12px;
    border-radius: 5px;
}
</style>