<template>
    <div className="checkbox-btnsc-wrp">
        <div :class="[checkboxBtnClass, 'checkbox-btnsc-body']"
                @click="onChange"
                :style="{
                    padding: PaddingMap[ size ],
                    lineHeight: LineheightMap[ size ],
                    border: `solid 1px gray`
                }"> 
            <slot>
                {{ label }}
            </slot>
        </div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { checkBoxBtnEmits, checkBoxBtnProps } from './checkbox-button';
import { ThemeColorClassName } from '../../styles/theme-color-expose';
export default defineComponent( {
    name: "s-checkbox-button",
    emits: checkBoxBtnEmits,
    props: checkBoxBtnProps,
    setup( props, ctx ) {
        const current = ref( props.checked );
        const checkboxBtnClass = computed( () => {
            let classSet = "";
            if( props.disabled ) {
                classSet += "checkbox-btnSc-disabled";
            } else {
                classSet += current.value ? " checkbox-btnSc-checked" : " checkbox-btnSc-unchecked";
            }
            if( props.leftBorderRound ) {
                classSet += " ";
                classSet += "checkbox-btnSc-leftRound";
            }
            if( props.rightBorderRound ) {
                classSet += " ";
                classSet += "checkbox-btnSc-rightRound";
            }
            if( current.value ) {
                classSet += " ";
                classSet += ThemeColorClassName[ props.theme ];
            }
            return classSet;
        } );
        const onChange = () => {
            if( props.disabled ) {
                return;
            }
            current.value = !current.value;
            ctx.emit( "change", current.value );
        };
        const PaddingMap = {
            "large": "0.6rem 1.2rem",
            "default": "0.4rem 0.8rem",
            "small": "0.2rem 0.4rem"
        };
        const LineheightMap = {
            "large": "2.1rem",
            "default": "1.4rem",
            "small": "0.7rem"
        };
        const FontSizeMap = {
            "large": "0.9rem",
            "default": "0.6rem",
            "small": "0.3rem"
        }
        return {
            current,
            checkboxBtnClass,
            PaddingMap,
            FontSizeMap,
            LineheightMap,
            onChange
        };
    }
} );
</script>
<style>
    .checkbox-btnsc-wrp {
        display: inline-block;
    }
    .checkbox-btnsc-body {
        /* line-height: 2rem; */
        text-align: center;
        margin: 0 auto;
        display: inline-block;
    }
    .checkbox-scene-body:hover {
        opacity: 0.8;
        transition: 1s;
    }
    .checkbox-btnSc-unchecked:hover {
        transition: .7s;
    }
    .checkbox-btnSc-unchecked {
        transition: .7s;
    }
    .checkbox-btnSc-checked {
        transition: .7s;
        color: white;
    }
    .checkbox-btnsc-wrp .checkbox-btnSc-disabled {
        background-color: rgb(85, 82, 82);
        color: rgb(221, 217, 217);
        border: 2px solid rgb(68, 65, 65);
    }
    .checkbox-btnSc-leftRound {
        border-top-left-radius: 10px ;
        border-bottom-left-radius: 10px ;
    }
    .checkbox-btnSc-rightRound {
        border-top-right-radius: 10px ;
        border-bottom-right-radius: 10px ;
    }
</style>
