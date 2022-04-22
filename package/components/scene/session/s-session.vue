<template>
    <div className="__scene-session-wrp" @click="touchSession">
        <div className="__scene-session-inner-wrp">
            <div className="__scene-session-avatar-wrp">
                <div className="__scene-session-avatar">

                </div>
            </div>
            <div className="__scene-session-title-wrp">
                <div className="__scene-session-title">
                    {{ title }}
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
interface SessionPropsType {
    id: string;
    title: string;
    avatar: null | undefined | string;
    onTouch ?: ( id: string ) => any;
};
const props = withDefaults( defineProps<SessionPropsType>(), {} );

const touchSession = () => {
    if( props.onTouch ) {
        props.onTouch( props.id )
    }
};

</script>
<script lang="ts">
export default {
    name: "s-session"
};
</script>
<style scoped>
.__scene-session-wrp, .__scene-session-inner-wrp {
    display: inline-flex;
    padding: 1em 2em;
}
.__scene-session-avatar {
    width: 2em;
    height: 2em;
    border-radius: 50%;
    border: solid 2px salmon;
}
.__scene-session-inner-wrp>div {
    margin: 0 1em;
}
</style>