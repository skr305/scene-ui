<template>
</template>

<script lang='ts'>
import {defineComponent} from 'vue'
import {rankListProps } from './rank-list'

export default defineComponent({
  name:'rankListProps',
  props:rankListProps,
  setup(props,{emit,attrs,slots,expose}){
  }
})
</script>
<style scoped>
</style>