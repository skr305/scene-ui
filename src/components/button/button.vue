<template>
    <button 
        ref="root"
        class="scene-button-default"
        :class="[
            `scene-button-${size}`,
            `scene-button-${type}`,
        ]" 
        :disabled="disabled"
        :type='nativeType'
        @click="handleClick"
            
        >
        <span class="scene-button-icon-slot" v-if="icon">
            <slot name="icon"></slot>
        </span>
        <slot>button</slot><!-- 备用内容，默认插槽  -->
    </button>
</template>

<script lang='ts'>
import {defineComponent, ref, onMounted} from 'vue'
import {buttonProps, buttonEmits } from './button'

export default defineComponent({
    name:'s-button',
    props: buttonProps,
    emits: buttonEmits,
    setup(props,{emit,attrs,slots,expose}){
        // 获取根节点 必须放在全局作用域中，不能放在onMount中:模板引用只有在组件渲染完成后生效
        const root = ref<HTMLInputElement>();
        // 组件原生click事件回调函数
        const handleClick = (evt: MouseEvent) => {
            emit('click', evt)// 触发父组件注册的原生click事件
        }
        // icon插槽
        const icon = slots.icon;

<<<<<<< HEAD
        onMounted(()=>{   
            if(icon){
                // 获取根节点button的类名
                let oldClassName:string | null | undefined = root.value?.getAttribute('class')
                // 拼接上设置icon的类名
                root.value?.setAttribute('class',oldClassName+' scene-button-icon')
            }
        })
=======
type buttonSize = 'default' | 'small' | 'large'
type buttonType = 'default' | 'round' | 'text'
type buttonNativeType = 'button' | 'reset' | 'submit'
interface buttonProps{
    size: buttonSize,               // 按钮的尺寸
    type: buttonType,               // 按钮类型
    disabled?: boolean,             // 是否禁用
    nativeType?:buttonNativeType,   // 原生button属性
    icon?:string | undefined,       // 图标名称 unbefined表示未定义
}

// 
const props = withDefaults(defineProps<buttonProps>(), {
    size: 'default',
    type: 'default',
    disabled: false,
    nativeType: 'button',
    icon: undefined,
})

const emit = defineEmits({
  click: (evt: MouseEvent) => evt instanceof MouseEvent,//父组件onClick的验证函数 保证是鼠标事件触发
})

const slot = useSlots()
const attrs = useAttrs()
>>>>>>> 5c6d6e139c3c6ea5751a6769d143e183a1f764f1

        return{
            root,
            icon,
            handleClick,
        }
    }
})
</script>

<style scoped>
.scene-button-default{
    background: white;
    color:black;
    border:1px solid;
    width: 80px;
    height: 40px;
    border-radius: 5px;
    font-size: 14px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.scene-button-default:disabled{
    border:#C0C4CC 1px solid;
    color: #C0C4CC;
    /* 光标变化 */
    cursor: not-allowed; 
}
/* size=large */
.scene-button-large{
    width: 90px;
    height: 45px;
}
/* size=small */
.scene-button-small{
    width: 60px;
    height: 30px;
}
/* type=round */
.scene-button-round{
    border-radius: 20px;
}
/* type=text */
.scene-button-text{
    border: none;
}
/* 设置了icon slot时的button属性 */
.scene-button-icon{
    width:110px;
    height:45px;
}
.scene-button-icon-slot{
    margin-right: 5px;
}
</style>