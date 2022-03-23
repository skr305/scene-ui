<template>
    <a
        class="scene-link"
        :class="[
            `scene-link-${type}`,
            disabled? `scene-link-disabled` : '',
            `scene-link-underline-${underline}`
        ]"
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

export default defineComponent({
  name:'scene-link',
  props:linkProps,
  emits:linkEmits,
  setup(props,{emit,attrs,slots,expose}){
      console.log(props.href);
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
.scene-link-disabled{
    opacity: 0.7;
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
/* type=default */
.scene-link-default{
    color:black;
}
.scene-link-default:hover{
    color: #409EFF;
}
/* type=primary */
.scene-link-primary{
    color:#409EFF;
}
.scene-link-primary:hover{
    opacity: 0.8;
    color: #409EFF;
}
/* type=success */
.scene-link-success{
    color:#67C23A;
}
.scene-link-success:hover{
    opacity: 0.8;
    color: #67C23A;
}
/* type=warning */
.scene-link-warning{
    color:#E6A23C;
}
.scene-link-warning:hover{
    opacity: 0.8;
    color: #E6A23C;
}
/* type=danger */
.scene-link-danger{
    color:#F56C6C;
}
.scene-link-danger:hover{
    opacity: 0.8;
    color: #F56C6C;
}
/* type=info */
.scene-link-info{
    color:#909399;
}
.scene-link-info:hover{
    opacity: 0.8;
    color: #909399;
}
</style>