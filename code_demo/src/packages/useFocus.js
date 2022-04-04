// 实现获取焦点
import {computed, ref} from "vue";

export function useFocus(data, copyContent, callback) {

    const selectIndex = ref(-1);

    const lastSelectBlock = computed(() => data.value.blocks[selectIndex.value])

    const focusData = computed(() => {
        let focus = [];
        let unfocused = [];
        data.value.blocks.forEach(block => (block.focus ? focus : unfocused).push(block));
        return {focus, unfocused}
    });

    const clearBlockFocus = () => {
        data.value.blocks.forEach(block => block.focus = false)
    }
    const containerMousedown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.button === 0) {
            clearBlockFocus();
            selectIndex.value = -1;
            copyContent.containerRightClickBox = false
            copyContent.blockRightClickBox = false
            copyContent.unlockRightClickBox = false
        }
    }

    const blockMousedown = (e, block, index) => {
        e.preventDefault();
        e.stopPropagation();
        // console.log(e)
        if (e.button === 0) {
            // block上规划一个属性 focus 获取焦点后就将focus变为true
            if (e.shiftKey) {
                if (focusData.value.focus.length <= 1) {
                    block.focus = true
                } else {
                    block.focus = !block.focus;
                }
            } else {
                if (!block.focus) {
                    clearBlockFocus();
                    block.focus = true;
                }
            }

            copyContent.containerRightClickBox = false
            copyContent.blockRightClickBox = false
            copyContent.unlockRightClickBox = false
            selectIndex.value = index;
            // console.log(typeof (data.value.blocks[selectIndex.value]))
            callback(e)
        }
    }


    // window.addEventListener("blockMousedown", blockMousedown, { passive: false});

    return {
        blockMousedown,
        containerMousedown,
        focusData,
        lastSelectBlock,
    }
}