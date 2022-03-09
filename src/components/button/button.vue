<template>
    <button 
        ref="root"
        class="scene-button-default"
        :class="[
            `scene-button-${size}`,
            `scene-button-${type}`,
            `scene-button-display-${disabled}`
        ]" 
        :disabled="disabled"
        :type='nativeType'
        @click="handleClick"
    >
        <span class="scene-button-icon-slot" v-if="slot.icon || icon">
            <img :src='iconPath' v-if='icon'>
            <slot name="icon"></slot>
        </span>
        <slot>button</slot>
    </button>
</template>


<script lang="ts" setup>
import {ref, onMounted, useAttrs, useSlots, computed} from 'vue'
import createPath from '../../utils/path'

type buttonSize = 'default' | 'small' | 'large'
type buttonType = 'default' | 'round' | 'text'
type buttonNativeType = 'button' | 'reset' | 'submit'
interface buttonProps{
    size: buttonSize,
    type: buttonType,
    disabled?: boolean,
    nativeType?:buttonNativeType,
    icon?:string | undefined,// 图标名称 unbefined表示未定义
}

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

// 计算图标路径
const iconPath = computed(()=>createPath(props.icon))
// 获取根节点 必须放在全局作用域中，不能放在onMount中:模板引用只有在组件渲染完成后生效
const root = ref<HTMLInputElement | null>(null);

// 点击事件
const handleClick = (evt: MouseEvent) => {
  emit('click', evt)// 触发父组件的原生click
}

onMounted(()=>{
    if(slot.icon !== null || props.icon === undefined){
        // 获取根节点button的类名
        let oldClassName:string | null | undefined = root.value?.getAttribute('class')
        // 拼接上设置icon的类名
        root.value?.setAttribute('class',oldClassName+' scene-button-icon')
    }
    
})

</script>
<script lang="ts">
export default {
  name: "scene-button",
};
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
/* disabled-true */
.scene-button-display-true{
    border:#C0C4CC 1px solid;
    color: #C0C4CC
}
/* 设置了icon slot时的button属性 */
.scene-button-icon{
    width:100px;
    height:45px;
}
.scene-button-icon-slot{
    margin-right: 5px;
}
</style>