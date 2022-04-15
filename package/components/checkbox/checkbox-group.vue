<template>
    <div className="checkbox-group-scene">
        {{ JSON.stringify( modelValue ) }}
        <slot>
        </slot>
    </div>
    
</template>
<script lang="ts">
import { defineComponent, computed, provide, WritableComputedRef, nextTick, watch, ref } from 'vue';
import { checkBoxGroupEmits, checkBoxGroupProps } from './checkbox-group';
import { CHECK_GROUP_CONTEXT } from './constants';
import { removeRepeatInPlace } from './util';
import '../../styles/global.css'

export default defineComponent( {
    name: "s-checkbox-group",
    emits: checkBoxGroupEmits,
    props: checkBoxGroupProps,
    
    setup( props, ctx ) {
        watch( props, () => {
             deps.map( dep => {
                dep( props.modelValue as string[] );
            } );
        } );
        const deps:Array< ( labels: string[] ) => any > = [];
        const pushToDeps = ( handler: ( labels: string[] ) => any ) => {
            deps.push( handler );
        }
        const labelChange = ( val: string[] ) => {
            ctx.emit( "change", [ ...val ] );
            removeRepeatInPlace( props.modelValue );
        }
        provide( CHECK_GROUP_CONTEXT, {
            groupLabels: props.modelValue,
            labelChange,
            pushToDeps
        } );
    }
} );
</script>
<style>
.checkbox-group-scene {
    margin: 1rem auto;
}
</style>