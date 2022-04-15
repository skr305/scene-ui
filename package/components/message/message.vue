<template>
  <!-- 消息列表 -->
  <transition name="slide-fade">
    <div className="sc-message-container" v-show="visibled">
      <!-- 内容 -->
      <div :class="[ 'sc-message-content', contentClass ]">
        
        <span > {{ text }} </span>
        <div className="option" v-if="showCloseButton">
          <!-- 手动关闭消息 -->
          <i className="ri-close-fill" @click="onClose"> close </i>
        </div>
      </div>
    </div>
  </transition>
</template>
<script lang="ts">
import { reactive, toRefs, defineComponent, computed } from 'vue';
import { messageProps } from './type';
import { SceneMessageStyleType } from './index';
import '../../styles/global.css'

export default defineComponent( {
  props: messageProps,
  setup(props) {
    const state = reactive({
      visibled: false,
    });

    // 打开消息
    const onOpen = () => {
      setTimeout(() => {
        state.visibled = true;
      }, 10);

      if (props.duration! >= 0) {
        setTimeout(() => {
          onClose();
        }, props.duration);
      }
    };

    onOpen();

    // 消息关闭
    const onClose = () => {
      state.visibled = false;
      setTimeout(() => {
        props.onClose!();
      }, 200);
    };

    const contentClass = computed( () => {
        const classNameMap: { [key in SceneMessageStyleType]: string } = {
            "success": "sc-message-content-suc",
            "warning": "sc-message-content-warn",
            "info": "sc-message-content-info",
            "error": "sc-message-content-error"
        };
        return classNameMap[ props.type as  SceneMessageStyleType];
    });

    return {
      ...toRefs(state),
      onOpen,
      onClose,
      contentClass
    };
  },
});
</script>
<style lang="less">

.sc-message {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  text-align: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  box-sizing: border-box;
  z-index: 9999;
  transform: translateZ(9999px);
  padding-top: 28px;
  pointer-events: none;
  transition: top .4s ease;

  .sc-message-container {
    margin-bottom: 14px;

    .message-icon {
      display: inline-block;

      i {
        font-family: var(--scene-font-family);
        letter-spacing: var(--scene-letter-spacing);
        font-size: 18px;
        font-weight: 400;
        margin-top: -3px;
        margin-right: 6px;
        display: inline-block;
        box-sizing: border-box;
        vertical-align: middle;
      }

      

      @keyframes rotating {
        0% {
          -webkit-transform: rotate(0deg);
          transform: rotate(0deg);
        }

        100% {
          -webkit-transform: rotate(359deg);
          transform: rotate(359deg);
        }
      }
    }

    .sc-message-content-suc {
      background: var(--scene-theme-color-success);
      color: rgb(255, 255, 255);
    }
    .sc-message-content-info {
      background: var(--scene-theme-color-info);
      color: rgb(255, 255, 255);
    }
    .sc-message-content-error {
      background: var(--scene-theme-color-error);
      color: rgb(255, 255, 255);
    }
    .sc-message-content-warn {
      background: var(--scene-theme-color-warning);
      color: rgb(255, 255, 255);
    }

    .sc-message-content {
      font-family: var(--scene-font-family);
      letter-spacing: var(--scene-letter-spacing);
      display: inline-block;
      padding: 6px 24px;
      height: 34px;
      text-align: left;
      line-height: 34px;
      font-size: 17px;
      font-weight: 400;
      border-radius: var(--scene-border-radius);
      text-align: center;
      box-shadow: var(--scene-box-shadow);
     

      span {
        pointer-events: none;
        -moz-user-select: none;
        -o-user-select: none;
        -khtml-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      .option {
        display: inline-block;
        pointer-events: all;
        margin-left: 18px;

        i {
          font-size: 18px;
          font-weight: 400;
          margin-top: -3px;
          
          box-sizing: border-box;
          cursor: pointer;
          color: currentColor;
          transition: color 0.2s ease;

          &:hover {
            color: rgba(246, 234, 210, 0.185);
            transition: color 0.2s ease;
          }
        }
      }
    }

  }

  .slide-fade-enter-active {
    transition: all .2s ease-out;
  }

  .slide-fade-leave-active {
    transition: all .2s ease;
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateY(-20px);
    opacity: 0;
  }
}
</style>