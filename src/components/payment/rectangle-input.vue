<template>
    <input type="text" v-model="data.value" 
    :id="`${data.curTime}${data.id}`"
    :ref="`233`"
    @input="emitInput" maxlength=1 >
</template>
<script lang="ts">
import { ComponentConstants } from '../../core/constants';
import _ from 'lodash';
import { defineComponent, reactive, nextTick, watch } from 'vue'
export interface RectangleInputProps {
    color ?: ComponentConstants.StandardPaymentInputColor;
    disabled ?: boolean;
    modelValue ?: string;
    // onInput ?: ( value: string ) => any;
};

export default defineComponent<RectangleInputProps>({

    setup( props, { attrs, slots, emit, expose } ) {
        const DEFAULT_PROPS:RectangleInputProps = {
            color: "red",
            disabled: false,
            modelValue: ""
        };
        // make a default
        props = reactive( {
            ...DEFAULT_PROPS,
            ...props
        });
        
        // 如果是响应式对象的话
        // 那么怎么来定义model的配对呢
        // 还是说只能使用默认的v-model呢
        // 那就自己重构一下吧
        // 反正也不难
        // input事件 在onInput时被调用
        // 然后props一开始复制给默认的value
        // 然后就没了
        const curTime = new Date().getTime();
        const id = _.uniqueId();
        const data = reactive<{  value: string, id: string, curTime: number } >( { value: props.modelValue || "", 
        id, curTime } );
        watch( data, () => {
            console.log( "in" );
            console.log( document.getElementById( `${curTime}${id}` ));
            if(props.disabled === false ) {
                
                if( document.getElementById( data.input_id ) ) {
                    console.log( "found" )
                    document.getElementById( data.input_id ).focus();
                }
            }
        } );
        // 用于发送同步更新指令以达成v-model
        const emitInput = () => {
            
            nextTick( () =>  {
                // if( props.onInput ) {
                //     props.onInput( data.value );
                // }
                console.log( data.value, 233 );
                emit( "update:modelValue", data.value ) 
            } );
        };
        return {
            data,
            emitInput
        };
    },
})
</script>


