<template>
    <div className="checkbox-btnsc-wrp">
        <div :class="[checkboxBtnClass, 'checkbox-btnsc-body']"
                @click="onChange"
                :style="{
                    padding: PaddingMap[ size ],
                    lineHeight: LineheightMap[ size ],
                    border: `solid 3px ${backgroundColor}`
                }"> 
            <slot>
                {{ label }}
            </slot>
        </div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref, inject} from 'vue';
import { checkBoxBtnEmits, checkBoxBtnProps } from './checkbox-button';
import { ThemeColorMap } from '../../core/constants/constants';
import { CHECK_GROUP_CONTEXT, CheckGroupContextType } from './constants';
import '../../styles/global.css'

export default defineComponent( {
    name: "s-checkbox-button",
    emits: checkBoxBtnEmits,
    props: checkBoxBtnProps,
    setup( props, ctx ) {
        const groupContext = inject<CheckGroupContextType>( CHECK_GROUP_CONTEXT );
        const current = ref( false );
        {
            const updateWithLabels = ( labels: string[] ) => {
                current.value = labels.includes( props.label );
            }
            //init for current and pushToDeps
            if( !groupContext ) {
                // 没有注入上下文的情况下 以checked提供的为准
                current.value = props.checked;
            } else {
                updateWithLabels( groupContext.groupLabels );
                groupContext.pushToDeps( updateWithLabels );
            }
        }
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
                classSet += "scene-checkbox-button-theme-"+props.theme;
            }
            return classSet;
        } );
        const backgroundColor = computed(()=>{
            return ThemeColorMap.get(props.theme+'-dark')
        })
        const onChange = () => {
            if( props.disabled ) {
                return;
            }
            
            current.value = !current.value;
            ctx.emit( "change", current.value );
            if( groupContext ) {
                // 如果存在标签且存在groupLabels 
                // 则需要额外去重更改
                if( props.label ) {
                    const groupLabels = groupContext.groupLabels;
                    const labelChange = groupContext.labelChange;
                    if( !current.value ) {
                        const labelIdx = groupLabels.indexOf( props.label );
                        if( labelIdx != -1 ) {
                            groupLabels.splice( labelIdx, 1 );
                        }
                        
                    } else {
                        groupLabels.push( props.label );
                    }
                    const newLabels = Array.from( new Set( groupLabels ) );
                    labelChange( newLabels );
                }   
            }
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
            backgroundColor,
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
        font-size: var(--scene-font-size);
        font-family: var(--scene-font-family);
        letter-spacing: var(--scene-letter-spacing);
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
        background: var(--scene-color-disabled);
        /* background: rgb(85, 82, 82); */
        color: var(--scene-font-color-light);
        /* color: rgb(221, 217, 217); */
        border: var(--scene-border-size) solid rgb(68, 65, 65);
    }
    .checkbox-btnSc-leftRound {
        border-top-left-radius: 10px ;
        border-bottom-left-radius: 10px ;
    }
    .checkbox-btnSc-rightRound {
        border-top-right-radius: 10px ;
        border-bottom-right-radius: 10px ;
    }
    /* 不同主题的背景色 */
    .scene-checkbox-button-theme-main{
        background: var(--scene-theme-color-main);
    }
    .scene-checkbox-button-theme-info{
        background: var(--scene-theme-color-info);
    }
    .scene-checkbox-button-theme-success{
        background: var(--scene-theme-color-success);
    }
    .scene-checkbox-button-theme-warning{
        background: var(--scene-theme-color-warning);
    }
    .scene-checkbox-button-theme-error{
        background: var(--scene-theme-color-error);
    }
</style>
