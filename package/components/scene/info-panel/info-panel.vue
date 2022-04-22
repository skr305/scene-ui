<template>
    <s-card :bodyStyle="{
        boxSizing: 'border-box',
        width: typeof width === 'number'?width+'px':width,
        height: typeof height === 'number'?height+'px':height,
        padding:'10px',
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'flex-start'
    }">
        <div class="scene-infoPanel-header">
            <div class="scene-infoPenal-header-left">
                <s-icon class="scene-infoPanel-icon" 
                    size="24px" :name="type==='info'?'info-square-fill':type"
                    :color="themeColor"
                ></s-icon>
                <div class="scene-infoPanel-title" :style="{color:themeColor}">{{title}}</div>
            </div>
            <slot></slot>
        </div>
        <div class="scene-infoPanel-info" v-for="(subTitle,index) in subTitles" :key="index">
            <div class="scene-infoPanel-subtitle">
                {{subTitle}}
            </div>
            <div class="scene-infoPanel-subinfo">
                {{subInfos[index]}}
            </div>
        </div>
    </s-card>
</template>

<script lang='ts'>
import {defineComponent,computed} from 'vue'
import {infoPanelProps} from './info-panel'
import { ComponentConstants } from '../../../core/constants'; 
import sCard from '../../card/card.vue'
import sIcon from '../../icon/icon.vue'
 
export default defineComponent({
  name:'scene-info-panel',
  props:infoPanelProps,
  components:{sCard,sIcon},
  setup(props,{emit,attrs,slots,expose}){
      let themeColor = computed(()=>{
          return ComponentConstants.ThemeColorMap.get(props.theme+'-dark')
      })

    return{
        themeColor
    }
  }
})
</script>
<style scoped>
/* 信息面板头部 */
.scene-infoPanel-header{
    box-sizing: border-box;
    width: 100%;
    height: 30px;
    padding: 3px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

}
.scene-infoPenal-header-left{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
/* 信息面板图标 */
.scene-infoPanel-icon{
    margin-right: 10px;
}
/* 信息面板标题 */
.scene-infoPanel-title{
    font-family: var(--scene-font-family);
    font-size: var(--scene-font-size-large);
    letter-spacing: var(--scene-letter-large-spacing);
}
/* 信息面板 主要信息 */
.scene-infoPanel-info{
    width: 100%;
    flex-grow: 1; /** 高度上平分剩余空间 */
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}
.scene-infoPanel-subtitle{
    width: 25%;
    display: flex;
    justify-content: flex-start;
    word-break: break-all; /** 对字体强制换行 */
    color: var(--scene-font-color-dark)
}
.scene-infoPanel-subinfo{
    width: 75%;
    display: flex;
    justify-content: flex-start;
    color: var(--scene-color-Extra-dark-gray)
}
</style>