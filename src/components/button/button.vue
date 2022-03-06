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
    <slot name="icon"></slot>
    <slot>button</slot>
    </button>
</template>


<script lang="ts" setup>
import {ref, onMounted, useAttrs} from 'vue'

type buttonSize = 'default' | 'small' | 'large'
type buttonType = 'default' | 'round' | 'text'
type buttonNativeType = 'button' | 'reset' | 'submit'
interface buttonProps{
    size: buttonSize,
    type: buttonType,
    disabled?: boolean,
    nativeType?:buttonNativeType
}

const props = withDefaults(defineProps<buttonProps>(), {
    size: 'default',
    type: 'default',
    disabled: false,
})

const emit = defineEmits({
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
})

// 原生click
const handleClick = (evt: MouseEvent) => {
  emit('click', evt)
}
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
    width: 70px;
    height: 30px;
    border-radius: 5px;
    font-size: calc(1em);
}
/* size=large */
.scene-button-large{
    width: 90px;
    height: 45px;
}
/* size=small */
.scene-button-small{
    width: 60px;
    height: 25px;
}
/* type=round */
.scene-button-round{
    border-radius: 20px;
}
/* type=text */
.scene-button-text{
    border: none;
}
/* display-true */
.scene-button-display-true{
    border:#C0C4CC 1px solid;
    color: #C0C4CC
}
</style>