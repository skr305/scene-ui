<template>
    <a
        class="scene-link"
        :class="[
            disabled? `scene-link-disabled` : '',
            `scene-link-underline-${underline}`
        ]"
        :style="{color: theme}"
        :href="disabled || !href ? undefined : href"
        @click="handleClick"
    >
        <!-- <el-icon v-if="icon"><component :is="icon" /></el-icon> -->
        <div v-if="this.$slots.icon" class="scene-link-icon">
           <slot v-if="this.$slots.icon" name="icon"></slot> 
        </div>
        <span v-if="$slots.default" class="scene-link-text">
            <slot></slot>
        </span>
    </a>
</template>

<script lang='ts'>
import {defineComponent} from 'vue'
import {linkProps,linkEmits} from './link'
import { ComponentConstants } from '../../core/constants'; 

export default defineComponent({
  name:'scene-link',
  props:linkProps,
  emits:linkEmits,
  setup(props,{emit,attrs,slots,expose}){
    // 当disabled=false时，点击link触发外层的点击事件
    function handleClick(event: MouseEvent) {
        if (!props.disabled) 
            emit('click', event)
    }

    return {
      handleClick,
    }
  }
})
</script>
<style scoped>
.scene-link{
    text-decoration: none; /**取消默认下划线 */
    display: inline-flex;
    justify-content: center;
    align-content: flex-end;
    cursor: pointer;
    padding:0;
}
.scene-link:hover{
    opacity: 0.7;
}
.scene-link-disabled{
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none; /**元素永远不会成为鼠标事件的target。 */
}
/* 链接图标样式*/
.scene-link-icon{
    display: flex;
    justify-content: center;
    align-items: center;
}
/* 链接文本样式 */
.scene-link-text{
    display: flex;
    justify-content: center;
    align-items: center;
}
/* 默认设置有下划线 */
.scene-link-underline-true:hover{
    text-decoration: underline;
}
</style>