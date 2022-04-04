import {events} from "@/packages/events";

export function shear(copyContent) {
    // console.log(JSON.stringify(copyContent.value))
    let blockDemo = {}
    let styleDemo = {}

    events.emit('start');
    copyContent.value.data.blocks.forEach((block, idx) => {
        if (block.focus) {
            blockDemo = copyContent.value.data.blocks[idx]
            styleDemo = copyContent.value.data.style[idx]
            // console.log(JSON.stringify(copyContent.value.data.blocks[idx]))
            // console.log(JSON.stringify(copyContent.value.data.style[idx]))
            copyContent.value.data.blocks.forEach((blockDemo, idxDemo) => {
                if (blockDemo.zIndex > block.zIndex) {
                    blockDemo.zIndex = blockDemo.zIndex - 1;
                }
            })
            copyContent.value.data.blocks.splice(idx, 1)
            copyContent.value.data.style.splice(idx, 1)
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
    events.emit('end');

    // console.log(JSON.stringify(copyContent.value.state))
    // console.log(JSON.stringify(copyContent.value.data))
}