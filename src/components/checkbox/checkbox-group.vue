<template>
    <div className="checkbox-group-scene">
        <slot>
        </slot>
    </div>
    
</template>
<script lang="ts">
import { defineComponent, watch } from 'vue';
import { checkBoxGroupEmits, checkBoxGroupProps } from './checkbox-group';
export default defineComponent( {
    name: "s-checkbox-group",
    emits: checkBoxGroupEmits,
    props: checkBoxGroupProps,
    setup( props, ctx ) {
        watch( props.modelValue, () => {
            ctx.emit( "change", props.modelValue );
        } );
    }
} );
</script>
<style>
.checkbox-group-scene {
    margin: 1rem auto;
}
</style>