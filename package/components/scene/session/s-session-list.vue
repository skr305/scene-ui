<template>

    <div className="__scene-session-list-wrp">
        <div className="__scene-session-list-inner-wrp">
            <div className="__scene-session-list-block" v-for="( s, i ) in metas" 
            :key="s.id+'__scene-session-list-block'"
            >
                <s-session 
                :id="s.id" 
                :title="s.title"
                :avatar="s.avatar"
                :onTouch="onTouch"
                >
                </s-session>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import SSession from './s-session.vue';
interface SessionListPropsType {
    metas: { id: string, title: string, avatar ?: string | null | undefined }[];
    onTouch ?: ( id: string ) => any;
};
const props = withDefaults( defineProps<SessionListPropsType>(), {} );


</script>
<script lang="ts">
export default {
    name: "s-session-list"
};
</script>
<style scoped>
.__scene-session-list-inner-wrp {
    display: inline-flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    padding: 1em;

    border: solid 1px black;

}
</style>

