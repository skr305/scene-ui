import {events} from "@/packages/events";

export function unlock(copyContent){

    events.emit('start')
    copyContent.value.data.blocks.forEach((block, idx) => {
        if (block.focus) {
            copyContent.value.data.blocks[idx].lock = false
            copyContent.value.data.blocks[idx].moveSign = 'move'
            // console.log(copyContent.value.data.blocks[idx].lock)
        }
    })
    events.emit('end')
}