<script lang="ts" setup>
import { ComponentConstants } from '../../core/constants';
import { SceneInputProps } from './type';
import { reactive } from 'vue';
const props = withDefaults( defineProps<SceneInputProps>(), {
    color: ComponentConstants.DefaultColor,
    size: ComponentConstants.DefaultSize,
    borderColor: ComponentConstants.DefaultColor 
} );
const emit = defineEmits( {
    "update:modelValue": ( value:string ) => value
} );
const SIZE_MAP = {
    "small": "3em",
    "medium": "5em",
    "big": "10em"
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
    <div className="input-scene-go-div">
        <input class-name="input-scene-d"/>
    </div>
</template>

<style scoped>
    .input-scene-go-div {
        display: flex;
        flex-direction: column;
        
    }

    .input-scene-d {
        width: 5em;
        outline: none;
        border: 0;
        border-bottom: 2px solid blue;
    }

    .input-scene-d:hover {
        width: 5em;
        outline: none;
        border: 0;
        border-bottom: 2px solid blue;
        opacity: 0.5;
    }

    .input-scene-d:focus {
        width: 5em;
        outline: none;
        border: 0;
        border-bottom: 3px solid blue;
        opacity: 0.9;
    }

</style>