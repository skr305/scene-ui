<template>
    <div :class="wrapperClasses">
        <s-card ref="wrapperRef" shadow="hover" class="__scene-lg-card" :style="{ padding: '2em 4em' }">
            <div v-if="inLoginPage" className="__scene-login-bar">
                <div className="__scene-input-block __scene-title-block">
                     {{ props.LoginTitle || 'LOGIN' }}
                </div>
                <div className="__scene-login-input-block">
                   <s-input label="UID" placeholder="UID" v-model="loginUserID" center> 
                        <template #prefix>
                            <user0></user0>
                        </template>
                   </s-input>
                </div >
                <div  className="__scene-input-block">
                   <s-input label="PWD" placeholder="PASSWORD" v-model="loginPwd" type="password"
                   center>
                        <template #prefix>
                            <secret0></secret0>
                        </template>
                   </s-input>
                </div>
                <div  className="__scene-input-block __scene-login-submit-block">
                    <s-button @click="onLogin" size="large"  class="__scene-login-sumit-button">
                         {{ props.LoginSubmitTip || 'LOGIN' }}
                    </s-button>
                </div>
            </div>
            <div className="__scene-reg-bar" v-else>
                <div className="__scene-input-block __scene-title-block">
                    {{ props.RegTitle || 'REG' }}
                </div>
                <div  className="__scene-input-block">
                    <s-input label="UID" placeholder="UID" v-model="regUserID" center>
                        <template #prefix>
                            <user0></user0>
                        </template>
                    </s-input>
                </div>
                <div  className="__scene-input-block">
                    <s-input label="UNICK" placeholder="UNICK" v-model="regUserNick" center>
                        <template #prefix>
                            <name0></name0>
                        </template>
                    </s-input>
                </div>
                <div>
                    <s-input label="PWD" placeholder="PWD" v-model="regPwd" type="password"
                    center>
                        <template #prefix>
                            <secret0></secret0>
                        </template>
                    </s-input>
                </div>
                <div  className="__scene-input-block  __scene-login-submit-block">
                    <s-button @click="onReg" size="large" class="__scene-login-sumit-button"> 
                        {{ props.RegSubmitTip || 'REG' }}
                    </s-button>
                </div>
            </div>
            <s-checkbox label="是否已注册" @click="onSwitchMode" checked></s-checkbox>
        </s-card>
    </div>
</template>
<script setup lang="ts">

import { SceneLoading } from '../../loading/loading';
import sInput from '../../input/input.vue';
import sButton from '../../button/button.vue';
import sRadio from '../../radio/radio.vue';
import SCard  from '../../card/card.vue';
import SCheckbox from '../../checkbox/checkbox.vue';
import Secret0 from '../../svg/secret0.vue';
import User0 from '../../svg/user0.vue';
import Name0 from '../../svg/name0.vue';
import { ref, VNode, nextTick } from 'vue';
import message, { SceneMessageStyleType } from '../../message';

export interface LoginRegProps {
    onLogin:( p: { userID: string, pwd: string } ) => Promise< { done: boolean } >
    onReg: ( p: { userID: string, userNick: any, pwd: string } ) => Promise< { done: boolean } >
    onLoginSuc ?: ( userID: string ) => any,
    onRegSuc ?: ( userID: string ) => any,
    onLoginFail ?: ( userID: string ) => any,
    onRegFail ?: ( userID: string ) => any,

    LoginTitle ?: string;
    LoginSubmitTip ?: string;
    
    RegTitle ?: string;
    RegSubmitTip ?: string;
};


const props = withDefaults(defineProps<LoginRegProps>(), {});
const loginUserID = ref( "" );
const loginPwd = ref( "" );
const regUserID = ref( "" );
const regUserNick = ref( "" );
const regPwd = ref( "" );
const inLoginPage = ref( true );

// define the loading
const wrapperRef = ref(null);

// the option for messageTip
const LOGIN_SUC = {
    "text": "login succeed",
    "type": "success" as SceneMessageStyleType 
};
const LOGIN_FAIL = {
    "text": "login fail",
    "type": "warning" as SceneMessageStyleType 
};
const LOGIN_ERROR = {
    "text": "login error",
    "type": "error" as SceneMessageStyleType 
};
const REG_SUC = {
    "text": "register succeed",
    "type": "success" as SceneMessageStyleType 
};
const REG_FAIL = {
    "text": "register failed",
    "type": "warning" as SceneMessageStyleType 
};
const REG_ERROR = {
    "text": "register error",
    "type": "error" as SceneMessageStyleType 
};
const onLogin = async () => {
    const { open: openLoading, close: closeLoading } = SceneLoading.service({
        target: ( wrapperRef.value as unknown as VNode ),
        fullScreen: true,
        text: 'loading...',
        onClose: () => {}
    });
    try {
        openLoading();
        const done = ( await props.onLogin( { 
            userID: loginUserID.value, 
            pwd: loginPwd.value  } ) );
        if( !done ) {
            message( LOGIN_FAIL );
            if( props.onLoginFail ) {
                props.onLoginFail( regUserID.value );
            }
        } else {
            message( LOGIN_SUC );
            if( props.onLoginSuc ) {
                props.onLoginSuc( regUserID.value );
            }
        }
    } catch( error ) {
        message( LOGIN_ERROR );
        console.warn( "LoginError:Scene-ui@0.2.0" );
        if( props.onLoginFail ) {
            props.onLoginFail( regUserID.value );
        }
    } finally {
        closeLoading();
    }
    
}
const onReg = async () => {
    const { open: openLoading, close: closeLoading } = SceneLoading.service({
        target: ( wrapperRef.value as unknown as VNode ),
        fullScreen: true,
        text: 'loading...',
        onClose: () => {}
    });
    try {
        openLoading();
        const done = ( await props.onReg( { 
            userID: regUserID.value, 
            userNick: regUserNick.value, 
            pwd: regPwd.value } ) );
        if( !done ) {
            message( REG_FAIL );
            if( props.onRegFail ) {
                props.onRegFail( regUserID.value );
            }
        } else {
            message( REG_SUC );
            if( props.onRegSuc ) {
                props.onRegSuc( regUserID.value );
            }
        }
    } catch( error ) {
        message( REG_ERROR );
        console.warn( "RegisterError:Scene-ui@0.2.0" );
        if( props.onRegFail ) {
            props.onRegFail( regUserID.value );
        }
    } finally {
        closeLoading();
    }
}

const wrapperClasses = ref<string[]>( [ '__scene-login-wrp' ] );
const onSwitchMode = () => {
    wrapperClasses.value.push( '__scene-login-changing' );
    nextTick( () => {
        
        setTimeout( () => {
            inLoginPage.value = !inLoginPage.value;
            wrapperClasses.value.pop();
        }, 300 );
    } );
    
}
</script>
<script lang="ts">
   export default {
       name: "s-login-reg"
   };
</script>
<style scoped>
    .__scene-login-wrp {
        max-width: 27em; 
        margin: 1.5em auto;
        border: 4px solid black; 

        transition: .5s;
    }
     .__scene-input-block {
         margin: 2em auto;
         font-size: 1.2em;
     }

    .__scene-login-wrp .__scene-login-submit-block {
         transition: ease .5s;
     }
     .__scene-login-wrp .__scene-login-submit-block:hover {
         opacity: 0.3;
     }
     .__scene-title-block {
         text-align: center;
         font-weight: 800;
         font-size: 2em;
         margin: 1em auto;
     }

     .__scene-login-wrp .__scene-login-submit-block .__scene-login-sumit-button {
          max-height: 3em;
          padding: 0.3em 5em !important;
     }

     .__scene-login-bar {
         transition: 1s;
     }

     .__scene-lg-card {
         transition: height 1s;
     }

     .__scene-login-changing {
         /* height: 40em; */
         /* height: 40em; */
         opacity: 0;
         transition: all .3s ease;
     }
</style>