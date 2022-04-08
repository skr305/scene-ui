// 实现鼠标的右键单击操作

import {computed} from "vue";

export function useRightClick(data, copyContent) {

    const focusData = computed(() => {
        let focus = [];
        let unfocused = [];
        data.value.blocks.forEach(block => (block.focus ? focus : unfocused).push(block));
        return {focus, unfocused}
    });

    const clearBlockFocus = () => {
        data.value.blocks.forEach(block => block.focus = false)
    }
    const containerRightClick = (e) => {
        e.stopPropagation()
        e.preventDefault()
        clearBlockFocus();

        if (copyContent.containerRightClickBox === true) {
            copyContent.containerRightClickBox = false
        }
        copyContent.containerRightClickBox = true
        copyContent.blockRightClickBox = false
        copyContent.unlockRightClickBox = false
        copyContent.data = data.value
        copyContent.startX = e.offsetX
        copyContent.startY = e.offsetY
        // console.log(JSON.stringify(copyContentDemo.value))
        // console.log(JSON.stringify(copyContent))
    }

    const blockRightClick = (e, block) => {
        e.stopPropagation()
        e.preventDefault()
        if (copyContent.blockRightClickBox === true) {
            copyContent.blockRightClickBox = false
        }
        copyContent.blockRightClickBox = true
        copyContent.containerRightClickBox = false
        copyContent.unlockRightClickBox = false
        copyContent.data = data.value
        copyContent.startX = e.screenX - 310
        copyContent.startY = e.screenY - 190
        // console.log(block)
        if (focusData.value.focus.length < 1) {
            block.focus = true;
        } else {
            clearBlockFocus()
            block.focus = true;
        }

        copyContent.data.blocks.forEach((block, idx) => {
            // console.log(block)
            if (block.focus && copyContent.data.blocks[idx].lock) {
                // copyContent.value.data.blocks[idx].lock = true
                copyContent.blockRightClickBox = false
                // if (copyContent.unlockRightClickBox === true) {
                //     copyContent.unlockRightClickBox = false
                // }
                copyContent.unlockRightClickBox = true
                // unlockRightClickBox = true
                // console.log(unlockRightClickBox)
            }
        })

        // console.log(JSON.stringify(copyContent.value))
    }

    return {
        containerRightClick,
        blockRightClick,
    }

}