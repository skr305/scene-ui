<template>
    <div className="checkbox-scene-wrp" :style="{  }">
        <div className="checkbox-scene-flex-wrp">
            <div :class="[checkboxClass, 'checkbox-scene-body']"
            @click="onChange"
            :style="{
                color: themeBorderColor,
                width: SizeMap[ size ],
                height: SizeMap[ size ],
                border: `solid 3px ${themeBorderColor}`
            }"> 
                <div>
                    {{ checkboxSign }} 
                </div>
            </div>
            <span className="checkbox-scene-label" :style="{
                color: themeBorderColor,
                lineHeight: SizeMap[ size ],
                fontSize: FontSizeMap[ size ]
            }"> 
                {{ label }} 
            </span>
        </div>       
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref, inject,onMounted } from 'vue';
import { checkBoxEmits, checkBoxProps } from './checkbox';
import { CHECK_GROUP_CONTEXT, CheckGroupContextType } from './constants';
import { ThemeColorMap } from '../../core/constants/constants'
import '../../styles/global.css'

export default defineComponent( {
    name: "s-checkbox",
    emits: checkBoxEmits,
    props: checkBoxProps,
    setup( props, ctx ) {
        const groupContext: CheckGroupContextType | null = inject<CheckGroupContextType>( CHECK_GROUP_CONTEXT );
        const current = ref( false );
        {
            const updateWithLabels = ( labels: string[] ) => {
                current.value = labels.includes( props.label );
            }
            //init for current and pushToDeps
            if( !groupContext ) {
                // 没有注入上下文的情况下 以checked提供的为准
                // 如果没有checked 就以modelValue提供的为准
                current.value = props.checked || props.modelValue;
            } else {
                updateWithLabels( groupContext.groupLabels );
                groupContext.pushToDeps( updateWithLabels );
            }
        }
        const checkboxClass = computed( () => {
            if( props.disabled ) {
                return "checkbox-scene-disabled";
            }
            return current.value ? "checkbox-scene-checked-"+props.theme : "checkbox-scene-unchecked-"+props.theme
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
            ctx.emit( "update:modelValue", current.value );
            
            if( groupContext ) {
                if( props.label ) {
                    const groupLabels = groupContext.groupLabels;
                    const labelChange = groupContext.labelChange;
                    if( !current.value ) {
                        const labelIdx = groupLabels.indexOf( props.label );
                        if( labelIdx !== -1 ) {
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

        const themeBorderColor = computed(()=>{
            return ThemeColorMap.get(props.theme+'-dark')
        })

        return {
            current,
            checkboxClass,
            SizeMap,
            FontSizeMap,
            checkboxSign,
            themeBorderColor,
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
    /* 不同主题的背景色 */
    .checkbox-scene-unchecked-main:hover {
        background: var(--scene-theme-color-main);
        transition: 1s;
    }
    .checkbox-scene-checked-main{
        background: var(--scene-theme-color-main);
    }
    .checkbox-scene-unchecked-info:hover {
        background: var(--scene-theme-color-info);
        transition: 1s;
    }
    .checkbox-scene-checked-info{
        background: var(--scene-theme-color-info);
    }
    .checkbox-scene-unchecked-success:hover {
        background: var(--scene-theme-color-success);
        transition: 1s;
    }
    .checkbox-scene-checked-success{
        background: var(--scene-theme-color-success);
    }
    .checkbox-scene-unchecked-warning:hover {
        background: var(--scene-theme-color-warning);
        transition: 1s;
    }
    .checkbox-scene-checked-warning{
        background: var(--scene-theme-color-warning);
    }
    .checkbox-scene-unchecked-error:hover {
        background: var(--scene-theme-color-error);
        transition: 1s;
    }
    .checkbox-scene-checked-error{
        background: var(--scene-theme-color-error);
    }
    .checkbox-scene-disabled {
        background-color: var(--scene-color-disabled)
        /* border: 2px solid rgb(14, 8, 8); */
    }
    .checkbox-scene-label {
        text-align: center;
        margin: 0em .5em;
        font-family: var(--scene-font-family);
        letter-spacing: var(--scene-letter-spacing);
    }
</style>
