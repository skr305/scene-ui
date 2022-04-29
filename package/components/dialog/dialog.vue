<template>
  <Teleport to="body">
    <Transition name="scene-dialog"
      @before-enter="onBeforeEnter"
      @after-enter="onAfterEnter"
      @before-leave="onBeforeLeave"
      @after-leave="onAfterLeave"
    >
      <!-- 对话框的遮罩层 -->
      <div v-if="modelValue" ref="mask" class="scene-dialog-mask" tabindex="0" 
        @click.self="closeDialog(closeOnClickModal)"
      >
          <div ref="container" class="scene-dialog-container">
            <!-- 对话框的头部 -->
              <div v-if="$slots.title || title" class="scene-dialog-title">
                  <slot name="title">
                    <div class="scene-dialog-default-title">
                      <h3>{{title}}</h3><s-icon color="#aa00ff" name="x-circle-fill" @click="closeDialog(true)"></s-icon>
                    </div>
                  </slot>
              </div>
            <!-- 对话框的主体 -->
              <div class="scene-dialog-body">
                  <slot>a short message</slot>
              </div>
            <!-- 对话框的尾部  -->
              <div class="scene-dialog-footer">
                  <slot name="footer">
                    <div class="scene-dialog-default-footer">
                      <s-button size="small" @click="closeDialog(true)">OK</s-button>
                    </div>
                  </slot>
              </div>
          </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang='ts'>
import {defineComponent, onMounted, ref, watch} from 'vue'
import {dialogProps, dialogEmits} from './dialog'
import sButton from '../button/button.vue'
import sIcon from '../icon/icon.vue'
import '../../styles/global.css'

export default defineComponent({
  name:'scene-dialog',
  props:dialogProps,
  emits:dialogEmits,
  components:{sButton,sIcon},
  setup(props,{emit,attrs,slots,expose}){
    const mask = ref<HTMLElement>()
    const container = ref<HTMLElement>()

    /**
     * 阻止默认事件进行的函数
     */
    function preventDefaultFunc(e: Event) { 
      let evt = e;
      evt.preventDefault();
    }

    /**
     *  关闭对话框，isTrigger控制该函数是否触发
     */
    function closeDialog(isTrigger: boolean){
      if(isTrigger)
        emit('update:modelValue',false)
    }

    /**
     * dialog的hook函数
     */
    function onBeforeEnter(){// 在元素被插入到 DOM 之前被调用
      emit('open','open')
    }
    function onAfterEnter() {// 当过度完成时调用
      emit('opened','opened')
    }
    function onBeforeLeave() {// 在leave之前调用
      emit('close','close')
    }
    function onAfterLeave() {// 在离开过渡完成、且元素已从 DOM 中移除时调用
      emit('closed','closed')
    }

    // 监听 container模板的变化，当模板存在时，修改其宽度
    // 为什么不在onMount里进行DOM操作？ dialog在组件挂载完成时v-if=false，此时是没有渲染的，无法进行模板引用
    watch(mask,(newMask,oldMask)=>{
      if(newMask){// 打开对话框
        mask.value!.style.background = 'rgba(0, 0, 0, 0.5)';
        // 设置宽度
        container.value!.style.minWidth = (props.width + 40) + 'px'
        // 设置滚动锁定
        if(props.lockScroll)
          window.addEventListener("wheel", preventDefaultFunc, {passive:false});
        if(!props.modal){
          mask.value!.style.background = 'transparent'
        }
      }else{// 关闭对话框
        // 解除滚动锁定 
        if(props.lockScroll)
          window.removeEventListener('wheel',preventDefaultFunc)
      }
    })

    return{
      mask,
      container,
      closeDialog,
      onBeforeEnter,
      onBeforeLeave,
      onAfterEnter,
      onAfterLeave
    }
  }
})
</script>

<style scoped>
.scene-dialog-mask {
  position: fixed;
  z-index: var(--scene-index-advanced)+1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--scene-color-mask);

  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease;
}
.scene-dialog-container {
  z-index: var(--scene-index-superlative);
  margin: 0px auto;
  background-color: var(--scene-color-white);
  border-radius: var(--scene-border-radius);
  box-shadow: var(--scene-box-shadow);
  transition: all 0.3s ease;
}

.scene-dialog-title{
  padding: 20px 20px 10px;
}

.scene-dialog-body {
  padding: 10px 20px 10px;
}

.scene-dialog-footer{
  padding: 10px 20px 20px;
}

.scene-dialog-default-title{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.scene-dialog-default-title h3{
  margin: 0;
  font-family: var(--scene-font-family);
  letter-spacing: var(--scene-letter-spacing);
  color: var(--scene-theme-color-main);
}

.scene-dialog-default-footer{
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
/*
 * The following styles are auto-applied to elements with
 * transition="scene-dialog" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the scene-dialog transition by editing
 * these styles.
 */
.scene-dialog-enter-from,
.scene-dialog-leave-to {
  opacity: 0;
}
.scene-dialog-enter-from .scene-dialog-container,
.scene-dialog-leave-to .scene-dialog-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>