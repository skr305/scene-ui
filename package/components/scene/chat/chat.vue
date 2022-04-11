<template>
</template>
<script lang="ts">
import sInput from '../../input/s-input.vue';
import sButton from '../../button/button.vue';
import sRadio from '../../radio/radio.vue';
import { defineComponent, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ChatProps } from './chat';
export default defineComponent<ChatProps>( {
    
    setup ( props:ChatProps, ctx ) {
        
        return {

        };
    }
} );
</script>