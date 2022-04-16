<template>
    <button 
        ref="root"
        class="scene-button"
        :class="[
            `scene-button-${type}`,
            `scene-button-${theme}`
        ]" 
        :style="styleObj"
        :disabled="disabled"
        :type='nativeType'
        @click="handleClick"
        >
        <span class="scene-button-icon-slot" v-if="icon">
            <slot name="icon"></slot>
        </span>
        <slot v-if="type !== 'circle'"></slot><!-- 备用内容，默认插槽  -->
    </button>
</template>

<script lang='ts'>
import {defineComponent, ref, onMounted, computed, reactive} from 'vue'
import {buttonProps, buttonEmits } from './button'
import '../../styles/global.css'
import {ThemeColorMap} from '../../core/constants/constants'

export default defineComponent({
    name:'s-button',
    props: buttonProps,
    emits: buttonEmits,
    setup(props,{emit,attrs,slots,expose}){
        // 获取根节点 必须放在全局作用域中，不能放在onMount中:模板引用只有在组件渲染完成后生效
        const root = ref<HTMLInputElement>();
        // size决定着缩放比例
        let scaleSize = computed(()=>{
            switch(props.size){
                case 'default':
                    return ['8px 16px','14px'];
                case 'large':
                    return ['10px 20px','18px'];
                case 'small':
                    return ['4px 8px','10px']
            }
        })
        // style对象
        let styleObj = reactive<{
            padding?: string,
            fontSize: string,
            color: string | undefined,
        }>({
            padding: scaleSize.value![0],
            fontSize: scaleSize.value![1],
            color: props.type === 'text'?ThemeColorMap.get(props.theme):'white'
        })
        if(props.type=== 'circle')
            delete styleObj.padding
        // 组件原生click事件回调函数
        const handleClick = (evt: MouseEvent) => {
            emit('click', evt)// 触发父组件注册的原生click事件
        }
        // icon插槽
        const icon = slots.icon;

        return{
            root,
            styleObj,
            icon,
            handleClick,
        }
    }
})
</script>

<style scoped>
.scene-button{
    border:var(--scene-border-size) solid;
    border-radius: var(--scene-border-radius);

    font-size: var(--scene-font-size);
    font-family: var(--scene-font-family);
    letter-spacing: var(--scene-letter-spacing);

    /* padding: 8px 16px; */
    display: inline-flex;
    justify-content: center;
    align-items: center;
}
/* 不同的主题 */
.scene-button-main{
    border-color: var(--scene-theme-color-main);
    background: var(--scene-theme-color-main);
}
.scene-button-info{
    border-color: var(--scene-theme-color-info);
    background: var(--scene-theme-color-info);
}
.scene-button-success{
    border-color: var(--scene-theme-color-success);
    background: var(--scene-theme-color-success);
}
.scene-button-warning{
    border-color: var(--scene-theme-color-warning);
    background: var(--scene-theme-color-warning);
}
.scene-button-error{
    border-color: var(--scene-theme-color-error);
    background: var(--scene-theme-color-error);
}
.scene-button:disabled{
    border: var(--scene-color-disabled) 1px solid;
    color: var(--scene-color-disabled);
    /* 光标变化 */
    cursor: not-allowed; 
}
/* type=round */
.scene-button-round{
    border-radius: var(--scene-round-border-radius)
}
/* type=circle */
.scene-button-circle{
    padding: 5px;
    border-radius: 50%;
}
/* type=text */
.scene-button-text{
    border: none;
    background: var(--scene-color-white);
}
.scene-button-icon-slot{
    display: flex;
    justify-content: center;
    align-items: center;
}
.scene-button-icon-slot-text{
    margin-left: 5px;
}
</style>