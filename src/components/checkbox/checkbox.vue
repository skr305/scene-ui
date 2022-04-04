<template>
    <div className="checkbox-scene-wrp" :style="{  }">
        <div className="checkbox-scene-flex-wrp">
            <div :class="[checkboxClass, 'checkbox-scene-body']"
            @click="onChange"
            :style="{
                color: theme,
                width: SizeMap[ size ],
                height: SizeMap[ size ],
                border: `solid 3px ${theme}`
            }"> 
                <div>
                    {{ checkboxSign }} 
                </div>
            </div>
            <span className="checkbox-scene-label" :style="{
                lineHeight: SizeMap[ size ],
                fontSize: FontSizeMap[ size ]
            }"> 
                {{ label }} 
            </span>
        </div>       
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { checkBoxEmits, checkBoxProps } from './checkbox';
export default defineComponent( {
    name: "s-checkbox",
    emits: checkBoxEmits,
    props: checkBoxProps,
    setup( props, ctx ) {
        const current = ref( props.checked );
        const checkboxClass = computed( () => {
            if( props.disabled ) {
                return "checkbox-scene-disabled";
            }
            return current.value ? "checkbox-scene-checked" : "checkbox-scene-unchecked"
        } );
        const checkboxSign = computed( () => {
            if( props.unsure ) {
                return "✳️"
            }
            return current.value ? "✅" : "";
        } );
        const onChange = () => {
            if( props.disabled ) {
                return;
            }
            current.value = !current.value;
            ctx.emit( "change", current.value );
        };
        const SizeMap = {
            "large": "2.2rem",
            "default": "1.7rem",
            "small": "1.4rem"
        };
        const FontSizeMap = {
            "large": "1.2rem",
            "default": "0.9rem",
            "small": "0.6rem"
        }
        return {
            current,
            checkboxClass,
            SizeMap,
            FontSizeMap,
            checkboxSign,
            onChange
        };
    }
} );
</script>
<style>
    .checkbox-scene-wrp {
        display: inline-block;
        margin: 1.2em;
    }
    .checkbox-scene-body {
        width: 2rem;
        height: 2rem;
        /* line-height: 2rem; */
        text-align: center;
        margin: 0 auto;
        border-radius: 3px;
        display: flex;
        justify-content: center;
        align-items: center;
        
        color: white;
    }
    .checkbox-scene-body:hover {
        opacity: 0.8;
        transition: 1s;
    }
    .checkbox-scene-unchecked:hover {
        background: rgba(85, 158, 222, 0.538);
        transition: 1s;
    }
    .checkbox-scene-checked {
        background: rgba(85, 158, 222, 0.641);
    }
    .checkbox-scene-disabled {
        background-color: gray;
        /* border: 2px solid rgb(14, 8, 8); */
    }
    .checkbox-scene-label {
        text-align: center;
        margin: 0em .5em;
    }
</style>
