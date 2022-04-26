<template>
    <div className="__scene-search-panel-wrp">
        <div className="__scene-search-panel-inner-wrp">
            <div className="__scene-search-input">
                <s-input
                 v-model="key"
                 :placeholder="searchPlaceholder === undefined 
                 ? 'your key' : searchPlaceholder"
                 :width="400"
                 >
                    <template #prefix>
                        <Search></Search>
                    </template>
                 </s-input>
            </div>
            <div>
                <s-button  
                @click="search"
                >
                    {{ searchSubmitTitle === undefined ? "搜索" : searchSubmitTitle }}
                </s-button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">

import { ref } from 'vue';
import sInput from '../../input/input.vue';
import sButton from '../../button/button.vue';
import Search from '../../svg/search.vue';

interface SearchPanelPropsType {
    onSearch: ( key: string ) => any;
    searchSubmitTitle ?: string;
    searchPlaceholder ?: string;
};
const props = withDefaults( defineProps<SearchPanelPropsType>(), {} );
const key = ref( "" );


const search = () => {
    if( props.onSearch ) {
        props.onSearch( key.value );
    }
}

</script>
<script lang="ts">
export default {
    name: "s-search-panel"
};
</script>
<style scoped>
.__scene-search-panel-inner-wrp {
    display: inline-flex;
    justify-content: space-around;
    align-items: center;
    
    padding: 1em;
    border: solid 5px black;

    margin: 2em auto;
}

.__scene-search-panel-inner-wrp>div {
    margin: 1em 2em;
}

</style>

