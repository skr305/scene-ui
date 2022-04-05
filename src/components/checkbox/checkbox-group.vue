<template>
    <div className="checkbox-group-scene">
        {{ JSON.stringify( modelValue ) }}
        <slot>
        </slot>
    </div>
    
</template>
<script lang="ts">
import { defineComponent, computed, provide, WritableComputedRef, nextTick, getCurrentInstance, watch } from 'vue';
import { checkBoxGroupEmits, checkBoxGroupProps } from './checkbox-group';
import { CHECK_GROUP_CONTEXT } from './constants';
export default defineComponent( {
    name: "s-checkbox-group",
    emits: checkBoxGroupEmits,
    props: checkBoxGroupProps,
    setup( props, ctx ) {
        const modelValue = computed( () => {
            return props.modelValue;
        } ) as WritableComputedRef<string[]> ;
        const labelChange = ( val: string[] ) => {
            modelValue.value = val;
            nextTick( () => {
                ctx.emit( "change", val );
            } );
        }
        provide( CHECK_GROUP_CONTEXT, {
            groupLabels: props.modelValue,
            labelChange
        } );
    }
} );
</script>
<style>
.checkbox-group-scene {
    margin: 1rem auto;
}
</style>