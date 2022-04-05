<script lang="ts" setup>
    import { useRoute, useRouter } from 'vue-router';
    const name = "button"
    const router = useRouter();
    const onPush = () => {
        router.push( "/cache" );
    }
</script>
<template>
    <div @click="onPush"> push </div>
</template>

