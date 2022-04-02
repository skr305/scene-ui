<template>
  <div ref="el" class="scene-card">
    <div v-if="$slots.header || header" class="scene-card-head">
        <slot name="header">{{ header }}</slot>
    </div>
    <div class="scene-card-body" :style="bodyStyle">
        <slot></slot>
    </div>
  </div>
</template>

<script lang='ts'>
import {defineComponent, onMounted, ref} from 'vue'
import {cardProps} from './card'

export default defineComponent({
  name:'scene-card',
  props:cardProps,
  setup(props,{emit,attrs,slots,expose}){
    // 卡片阴影出现的时机
    const shadowTime = props.shadow;
    // 卡片元素
    const el = ref<HTMLElement>()

    console.log(props.bodyStyle);

    onMounted(()=>{
      let card: HTMLElement = el.value!;

      // 对不同的卡片出现时机设置不同的阴影效果
      if(shadowTime === 'always')
        card.style.boxShadow = "0px 12px 32px 4px rgba(0, 0, 0, .04), 0px 8px 20px rgba(0, 0, 0, .08)"
      if(shadowTime === 'hover'){
        // 获取旧的 class
        let oldClassName = card.getAttribute('class')
        card.setAttribute('class',oldClassName+' scene-card-hover')
        // 设置过度效果
        card.style.transition = "box-shadow 0.5s"
      }
    })
    
    return {
      el
    }
  }
})
</script>
<style scoped>
.scene-card{
  --border-color: #e4e7ed;
  --card-padding: 20px;

  display: inline-flex;
  flex-direction: column;
  border-radius: 5px;
  border: 1px solid var(--border-color);
  overflow: hidden;
  box-sizing: border-box; /** 设置宽高为加上border与padding的宽高 */
}
.scene-card-hover:hover{
  box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, .04), 0px 8px 20px rgba(0, 0, 0, .08);
}
.scene-card-head{
  padding: calc(var(--card-padding) - 2px) var(--card-padding);
  border-bottom: 1px solid var(--border-color);
  box-sizing: border-box;
  flex-grow: 0; /** 不占据剩余空间 */
}
.scene-card-body{
  padding: calc(var(--card-padding) - 2px) var(--card-padding);
  flex-grow: 1; /** 占据所有的剩余空间 */
}
</style>