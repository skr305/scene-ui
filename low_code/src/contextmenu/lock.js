import {events} from "@/packages/events";

export function lock(copyContent) {

    events.emit('start')
    copyContent.value.data.blocks.forEach((block, idx) => {
        if (block.focus) {
            copyContent.value.data.blocks[idx].lock = true
            copyContent.value.data.blocks[idx].moveSign = 'not-allowed'
            // console.log(copyContent.value.data.blocks[idx].lock)
        }
    })
    events.emit('end')
}