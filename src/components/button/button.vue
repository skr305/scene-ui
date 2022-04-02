<template>
    <button 
        ref="root"
        class="scene-button"
        :class="[
            `scene-button-${type}`,
        ]" 
        :style="{color: theme,padding: paddingSize}"
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
import {defineComponent, ref, onMounted, computed} from 'vue'
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

        // size决定着padding
        let paddingSize = computed(()=>{
            switch(props.size){
                case 'default':
                    return '10px 20px';
                case 'large':
                    return '15px 30px';
                case 'small':
                    return '5px 10px'
            }
        })

        return{
            root,
            paddingSize,
            icon,
            handleClick,
        }
    }
})
</script>

<style scoped>
.scene-button{
    background: white;
    color:black;
    border:1px solid;
    border-radius: 5px;
    font-size: 14px;

    display: inline-flex;
    justify-content: center;
    align-items: center;
}
.scene-button:disabled{
    border:#C0C4CC 1px solid;
    color: #C0C4CC;
    /* 光标变化 */
    cursor: not-allowed; 
}
/* type=round */
.scene-button-round{
    border-radius: 20px;
}
/* type=text */
.scene-button-text{
    border: none;
}
.scene-button-icon-slot{
    margin-right: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>