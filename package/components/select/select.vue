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
                <s-icon name="x-circle" @click.stop="handleDelete($event)" title="close"/>
            </div>
            <div v-if="showTags" class="scene-select-multiple-count">
                <span>+{{selectedItems.length}}/{{multipleLimit}}</span>
            </div>
        </div>
        <s-icon name="chevron-down" :size="16" id="scene-select-icon" title="down" />
            <!-- 选择器的隐藏部分 -->
        <div class="scene-select-dropdown-arrow"></div>
        <div class="scene-select-dropdown-menu">
            <s-scrollbar :width="214" :height="180" :alwaysNeedY="true">
                <div ref="menu" >
                    <div v-if="options.length === 0" class="scene-select-no-options">
                        No Options!
                    </div>
                    <div v-for="(option,index) of options" :key="index" class="scene-select-dropdown-menu-option" :tabindex="-1" @mousedown="handleSelect(option,index,$event)">
                        <!-- 作用域插槽，对外暴露 option 与 index -->
                        {{option}}
                    </div> 
                </div>
            </s-scrollbar>
        </div>
    </div>
</template>

<script lang='ts'>
import {computed, defineComponent, nextTick, onMounted, onUpdated, reactive, ref, toRefs} from 'vue'
import {selectProps, selectEmits} from './select'
import sScrollbar from '../scrollbar/scrollbar.vue'
import sIcon from '../icon/icon.vue'

export default defineComponent({
  name:'scene-select',
  props:selectProps,
  emits:selectEmits,
  components:{sScrollbar,sIcon},
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

    /**
     * 处理点击选项的选择事件，分为单选情况与多选情况
     * 传入 选项字符串，index，mousedown事件本身
     */
    const handleSelect = (option: string,index: number,e: Event)=>{
        let curOptionString:string = option // 当前选项的字符串形式
         // 对于不同的点击事件绑定不同的click函数
        if(props.multiple){
            // 存在选项 并且 没有禁用项或该项不是禁用项
            if(props.options && (props.disabledOptions.length === 0 || !props.disabledOptions[index])){
                // 是否已被选中？
                if(selectedItems.value.includes(curOptionString)){
                    clearSelectSign(index)              // 清楚该项的样式
                    handleClick(curOptionString,true)   // 移除该选项
                    emit('change',curOptionString)      // 触发onChange
                }else{
                    // 没有被选中过
                    // 当前选择数小于限制
                    if(selectedCount.value < props.multipleLimit){
                        setSelectSign(index)                    // 给当前选项div设置selected 
                        handleClick(curOptionString,true,index) // 添加该选项
                        emit('change',curOptionString)          // 触发onChange
                    }  
                }
            }
            e.preventDefault()//此事件没有被显式处理，它默认的动作也不应该照常执行。-->不失去焦点
        }else{
            // 单选
            if(props.options && (props.disabledOptions.length === 0 || !props.disabledOptions[index])){
                // 清除所有div上的selected attribute
                clearSelectSign()
                // 给当前选项div设置selected 
                setSelectSign(index)
                // 添加该选项
                handleClick(curOptionString,false,index)
                emit('change',curOptionString)
            }  
        }  
    }
    
    //挂载时，设置disabled样式。
    onMounted(()=>{
        // 每一个选项的div集合
        let optionColleaction: HTMLCollection = menu.value!.children //非空断言
        // 检查disabledOptions
        if(props.disabledOptions.length > 0){
            // 需要给某些项选设置disabled属性
            props.disabledOptions.forEach((item,index)=>{
                if(item)// 设置样式
                    optionColleaction.item(index)?.setAttribute('disabled','true')     
            })
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
        handleDelete,
        handleSelect
    }
  }
})
</script>
<style scoped>
/* 选择器主体 */
.scene-select{
    display: inline-flex;
    box-sizing: border-box;
    width: 220px;
    height: 36px;
    position: relative; /** 定位该元素是子元素中设置了position：absolute的相对父元素*/
    justify-content: space-between;
    align-items: center;

    border: var(--scene-border-size) solid var(--scene-border-color-light);
    border-radius: var(--scene-border-radius);

    font-size: var(--scene-font-size);
    font-family: var(--scene-font-family);
    letter-spacing: var(--scene-letter-spacing);
}
.scene-select:hover{
    border: var(--scene-border-size) solid var(--scene-border-color-dark);
}
/* 选择器主体的子元素有获取焦点时 */
.scene-select:focus-within{
    border: var(--scene-border-size) solid var(--scene-theme-color-main);
}
/* 选择器的输入框 */
#scene-select-input{
    outline: none;
    border: none;
    box-sizing: border-box;
    width: 200px; /** 198px - 10px*/
    height: 30px; /** 32px */
    padding: 0 0 0 10px;
    /* border-radius: var(--scene-round-border-radius); */

    font-size: var(--scene-font-size);
    font-family: var(--scene-font-family);
    letter-spacing: var(--scene-letter-spacing);
    color: var(--scene-font-color-dark)
}
/* 选择器的按钮 */
#scene-select-icon{
    box-sizing: border-box;
    width: 20px; /** 22px - 4px */
    height: 30px; /** 32px -4px  */
    transition: transform 0.5s ease;
    display: flex;
    justify-content: center;
    align-items: center;
}
/* 选择器的箭头 */
.scene-select-dropdown-arrow{
    visibility: hidden;
    position: absolute;
    width: 10px;
    height: 10px;
    background: white;
    top: calc(100%);
    left: calc(50%);
    border-top: var(--scene-border-size) solid var(--scene-border-color-light);
    border-right: var(--scene-border-size) solid var(--scene-border-color-light);
    transform: rotate(-45deg);
    z-index: var(--scene-index-advanced);
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
    box-sizing: border-box;
    z-index: var(--scene-index-heighter);
    border: var(--scene-border-size) solid var(--scene-border-color-light);
    box-shadow: var(--scene-box-shadow);

    background: white;
    border-radius: var(--scene-border-radius);
    top: calc(100% + 5px);
    left: -3px;
    padding: 5px 0;
    opacity: 0;
    transition: all 0.5s ease;
    
}
/* 选择器具体的选项 */
.scene-select-dropdown-menu-option{
    width: 194px;
    height: 36px;
    padding: 0 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    /* 文字溢出处理 */
    overflow: hidden;
}
/* 被禁用 */
.scene-select-dropdown-menu-option[disabled="true"]{
    cursor:not-allowed;
    color:var(--scene-color-disabled);
}
/* 选中 */
.scene-select-dropdown-menu-option[selected="true"]{
    color:var(--scene-theme-color-main);
}
/* 悬浮 */
.scene-select-dropdown-menu-option:hover{
    color: var(--scene-theme-color-main);
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
    height: 180px;
    padding: 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}
/* 多选情况下的tag容器 */
#scene-select-multiple-container{
    position: absolute;
    background: var(--scene-color-white);
    outline: none;
    border: none;
    width: calc(90% - 10px); /** 198px - 10px*/
    min-height: calc(100%); /** 32px */
    padding: 0 0 0 10px;

    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: flex-start;
    align-content: center;
    
}
/* 多选情况下的tag */
.scene-select-multiple-tag{
    background: var(--scene-color-light-gray);
    color: var(--scene-color-Extra-dark-gray);
    min-width: 70px;
    height: 24px;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5px;
    margin-right: 5px;
    font-size: 12px;
    border-radius: var(--scene-border-radius);
}
.scene-select-multiple-count{
    background: var(--scene-color-light-gray);
    color: var(--scene-color-Extra-dark-gray);
    width: 30px;
    height: 24px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 0 5px;
    font-size: 12px;
    border-radius: var(--scene-border-radius);
}
</style>