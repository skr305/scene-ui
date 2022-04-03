import {events} from "@/packages/events";

export function Delete(copyContent) {

    // console.log(JSON.stringify(copyContent.value.data))

    events.emit('start')
    copyContent.value.data.blocks.forEach((block, idx) => {
        if (block.focus) {
            copyContent.value.data.blocks.forEach((blockDemo, idxDemo) => {
                if (blockDemo.zIndex > block.zIndex) {
                    blockDemo.zIndex = blockDemo.zIndex - 1;
                }
            })
            copyContent.value.data.blocks.splice(idx, 1)
            copyContent.value.data.style.splice(idx, 1)
        }
    })
    events.emit('end')
}