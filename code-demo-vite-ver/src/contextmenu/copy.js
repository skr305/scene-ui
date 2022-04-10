import {computed} from "vue";
import deepcopy from "deepcopy";

export function copy(copyContent) {
    // console.log(JSON.stringify(copyContent.value))
    let blockDemo = {}
    let styleDemo = {}

    copyContent.value.data.blocks.forEach((block, idx) => {
        // console.log(JSON.stringify(copyContent.value.data.blocks))
        if (block.focus) {
            blockDemo = copyContent.value.data.blocks[idx]
            styleDemo = copyContent.value.data.style[idx]
            // console.log(JSON.stringify(copyContent.value.data.blocks[idx]))
            // console.log(JSON.stringify(copyContent.value.data.style[idx]))
        }
    })
    if (copyContent.value.copyContent.length === 0) {
        copyContent.value.copyContent.push(blockDemo)
        copyContent.value.copyContent.push(styleDemo)
    } else {
        copyContent.value.copyContent.splice(0, copyContent.value.copyContent.length)
        copyContent.value.copyContent.push(blockDemo)
        copyContent.value.copyContent.push(styleDemo)
    }
    // console.log(JSON.stringify(copyContent.value.state))
    // console.log(JSON.stringify(copyContent.value.copyContent))
    // console.log(JSON.stringify(copyContent.value.startX))
}