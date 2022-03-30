<script lang="ts" setup>
// import Vue from 'vue';
import { ComponentConstants } from '../../core/constants'; 
import { reactive, watch, nextTick } from 'vue';

export interface PaymentInputProps {
    theme ?: ComponentConstants.StandardColor;
    disabled ?: boolean;
    modelValue ?: string;
    numberOnly ?: boolean;
    // 密码框填满时触发的回调
    onFill ?: ( pwd: string ) => any;
};
export type PaymentInputSets = [ string, string, string, string, string, string ];
const props = withDefaults( defineProps<PaymentInputProps>(), {
    theme: ComponentConstants.DefaultColor,
    disabled: false,
    modelValue: "",
    numberOnly: true
} );
const data = reactive( { inIdx: 0 } );
let pwdSets = reactive<PaymentInputSets>( [ "", "", "", "", "", "" ] );
const emit = defineEmits( {
    "update:modelValue": ( value:string ) => value
} );
watch( pwdSets, () => {
    const curIdx = data.inIdx;
    console.log( pwdSets[ curIdx ] );
    if( props.numberOnly ) {
        // 是个数字
        if( pwdSets[ curIdx ] >= "0" && pwdSets[ curIdx ] <= "9"  ) {

        } else {
            // drop
            pwdSets[curIdx] = "";
        }
    }
    // 确实输入了有效字符
    if( pwdSets[ curIdx ].length === 1 ) {
        // 如果不是最后一位
        if( curIdx !== 5 ) {
            data.inIdx++;
        } else {
        // 此时密码框已经fill
            if( props.onFill ) {
                props.onFill( pwdSets.join( "" ) );
            }
        }
    }
    nextTick( () => {
        document.getElementById( `${ data.inIdx }-pay-rec-input-#scene` ).focus();
    } );
    emit("update:modelValue", pwdSets.join( "" ) ); 
} );
// 防止因为监听顺序问题导致输入被锁
const onPut = () => {
    const curIndex = data.inIdx;
    nextTick( () => {
        // 说明运转出现了问题
        if( curIndex !== 5 && curIndex === data.inIdx ) {
            // 确认是已经输入数据了
            if( pwdSets[curIndex].length === 1) {
                data.inIdx++;
                 nextTick( () => {
                    document.getElementById( `${ data.inIdx }-pay-rec-input-#scene` ).focus();
                } );
            }
        }
    } );
}
const onDropPwdCell = () => {
    const curIdx = data.inIdx;
    pwdSets[ curIdx ] = "";
    
    nextTick( () => {
        // 在非0情况下适用 
        if( curIdx !== 0 ) {
            data.inIdx--;
        }
        nextTick( () => {
            document.getElementById( `${ data.inIdx }-pay-rec-input-#scene` ).focus();
        } );
         
    } )
    emit("update:modelValue", pwdSets.join( "" ) );
};
</script>
<template>
    <div className="payment-input-251-w" >
        <input v-for="i in 6" :key="`PAY-REC-INPUT${i}`"
        :disabled=" !( i - 1 === data.inIdx || i - 1 === 5 && data.inIdx === 6 ) " 
        :style="{ 'color': props.theme }"
        @keydown.delete="onDropPwdCell"
        @keydown="onPut()"
        :id="`${i-1}-pay-rec-input-#scene`"
        v-model="pwdSets[i - 1]"
        :maxLength="1"
        className="payment-input-251-i"
        />
    </div>
</template>
<style scoped>
    .payment-input-251-i {
        max-width: 2em;
        max-height: 2em;
        min-height: 2em;
        text-align: center;
        line-height: 2em;
    }
    .payment-input-251-w {
        padding: 1em 2em;
        height: 4em;
        text-align: center;
    }

</style>
 