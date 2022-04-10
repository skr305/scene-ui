<template>
    <div className="s-login-253" >
        <div v-if="in_l_page" >
            <s-input label="UNAME" v-model="l_un"/>
            <s-input label="PWD" v-model="l_pwd"/>
            <s-button> LOGIN </s-button>
        </div>
        <div v-else>
            <s-input label="UNAME" v-model="r_id"/>
            <s-input label="UNAME" v-model="r_un"/>
            <s-input label="PWD" v-model="r_pwd"/>
            <s-button> REG </s-button>
        </div>
        <s-radio v-model="in_l_page">
        </s-radio>
    </div>
</template>
<script lang="ts">
import sInput from '../../input/s-input.vue';
import sButton from '../../button/button.vue';
import sRadio from '../../radio/radio.vue';
import { defineComponent, reactive, ref } from 'vue';
import { LoginRegisterProps } from './login-register';
import { useRouter } from 'vue-router';
export default defineComponent( {
    setup( props:LoginRegisterProps, ctx ) {
        const l_un = ref("");
        const l_pwd = ref("");
        const r_id = ref("");
        const r_un = ref("");
        const r_pwd = ref("");
        const in_l_page = ref(true);
        return {
            l_un,
            l_pwd,
            r_id,
            r_un,
            r_pwd,
            in_l_page,
            onLogin: async () => {
                try {
                    const done = ( await props.onLogin( l_un.value, l_pwd.value ) ).data.done;
                    if( !done ) {
                        // message.error()
                    } else {
                        // message.suc()
                        if( props.loginToPath ) {
                            useRouter().replace( props.loginToPath );
                        }
                        
                    }
                } catch( error ) {
                    // message.error()
                }
                
            },
            onRegister: async () => {
                try {
                    const done = ( await props.onRegister( r_id.value, r_un.value, r_pwd.value ) ).data.done;
                    if( !done ) {
                        // message.error()
                    } else {
                        // message.suc()
                        if( props.regToPath ) {
                            useRouter().replace( props.regToPath );
                        }
                        
                    }
                } catch( error ) {
                    // message.error()
                }
            }
        };
        
    }
} );

</script>
