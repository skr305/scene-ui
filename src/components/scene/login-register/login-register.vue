<template>
    <div className="s-login-253" >
        <div v-if="in_l_page" >
            <s-input label="UNAME" v-model="l_un"/>
            <s-input label="PWD" v-model="l_pwd"/>
            <s-button> LOGIN </s-button>
        </div>
        <div v-else>

        </div>
        <s-radio v-model="in_l_page">
            <s-input label="UNAME" v-model="r_id"/>
            <s-input label="UNAME" v-model="r_un"/>
            <s-input label="PWD" v-model="r_pwd"/>
            <s-button> REG </s-button>
        </s-radio>
    </div>
</template>
<script lang="ts">
import sInput from '../../input/s-input.vue';
import sButton from '../../button/button.vue';
import sRadio from '../../radio/radio.vue';
import { defineComponent, reactive } from 'vue';
import { LoginRegisterProps } from './login-register';
import EventEmitter from 'events';
export default defineComponent<LoginRegisterProps>( {
    setup( props, { emit, expose, attrs, slots } ) {
        const data = reactive( {
            l_un: "",
            l_pwd: "",
            r_id: "",
            r_un: "",
            r_pwd: "",
            in_l_page: true,
            onLogin: async () => {
                
                await props.onLogin( data.l_un, data.l_pwd );

            },
            onRegister: async () => {
                await props.onRegister( data.r_id, data.r_un, data.r_pwd );
            }
        } );
        return data;
    }
} );

</script>
