import {computed} from "vue";


export function useAttribute(data, idx) {
    const attrs_style = computed(() => {
        let attribute = null;
        let block = null;
        if (idx >= 0) {
            attribute = data.value.style[idx];
            block = data.value.block[idx];
        }
    })

    return {
        attrs_style
    }

}