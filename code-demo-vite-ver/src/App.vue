<template>
  <div class="app">
    <Editor v-model="state"></Editor>
  </div>
</template>

<script>
// 拿到data.json中的数据
import data from './data.json';
import {ref} from "vue";
import Editor from "./packages/editor";
import {registerConfig as config} from "@/utils/editor-config";
import {provide} from "vue";

import { ElInput } from 'element-plus';

export default {
  components: {
    Editor,
  },
  // 整个程序的入口
  setup() {
    const state = ref(data);

    // 将组件的配置直接传出
    provide('config', config);

    return {
      state
    }
  }
}

</script>

<style lang="scss">
.app {
  position: fixed;
  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 20px;
}
</style>
