<script lang="ts" setup>
import { ComponentConstants } from '../../core/constants';
import { reactive } from 'vue';

export interface SceneInputProps {
    size ?: ComponentConstants.StandardSize;
    onInput ?: ( value: string ) => any;
    theme ?: ComponentConstants.StandardColor;
    borderColor ?: ComponentConstants.StandardColor;
    label ?: string;
};
const props = withDefaults( defineProps<SceneInputProps>(), {
    theme: ComponentConstants.DefaultColor,
    size: ComponentConstants.DefaultSize,
    borderColor: ComponentConstants.DefaultColor 
} );
const emit = defineEmits( {
    "update:modelValue": ( value:string ) => value
} );
const SIZE_MAP = {
    "small": "8em",
    "default": "14em",
    "large": "24em"
};
const data = reactive( {
    onInput: ( $event:InputEvent ) => {
        const target = $event.target as HTMLInputElement;
        if( props.onInput ) {
            props.onInput( target.value );
        }
        emit( "update:modelValue", target.value );
    },
    size: SIZE_MAP[ props.size ]
} );

</script>

<template>
    <div className="input-scene-go-div" :style="{
        'maxWidth': data.size,
        'color': props.theme
    }">
        <div v-if="props.label !== undefined" 
        className="input-sc-label-241">  {{ props.label }} : </div>
        <input className="input-scene-d" @input="data.onInput"
        :style="{
            'borderBottom': `2px solid ${props.theme}`,
            'color': props.theme
        }"/>
    </div>
</template>

<style scoped>
    .input-scene-go-div {
        display: inline-flex;
        flex-direction: row;
        max-width: 14em;
        margin: 1em;
    }
    
    .input-sc-label-241 {
        line-height: 1.4em;
        display: inline-block;
        font-weight: 100;
        margin: 0em 1em;
    }

    .input-scene-d {
        /* width: 5em; */
        outline: none;
        border: 0;
        border-bottom: 2px solid rgb(0, 0, 0);
        transition: 1s;
        text-align: center;
        line-height: 1.4em;
    }

    .input-scene-d:hover {
        /* width: 5em;
        outline: none;
        border: 0;
        border-bottom: 2px solid blue; */
        opacity: 0.5;
    }

</style>