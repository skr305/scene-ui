<template>
  <i :class="[`bi-${name}`]" :style="style" v-bind="$attrs">
    <!-- <slot></slot> -->
  </i>
</template>

<script lang='ts'>
import {defineComponent,computed, CSSProperties} from 'vue'
import { iconProps } from './icon'
import './bootstrap-icons.css'

export default defineComponent({
  name:'scene-icon',
  props: iconProps,
  setup(props,ctx){
    // 图标的样式
    const style = computed<CSSProperties>(() => {
      if (!props.size && !props.color) return {}
      return {
        fontSize: typeof props.size === 'number'?props.size+'px':props.size,
        color: props.color,
      }
    })

    return {
      style
    }
  }
})
</script>
<style scoped>
</style>