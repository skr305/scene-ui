import {events} from "@/packages/events";


export function bottom(copyContent) {

    events.emit('start');
    copyContent.value.data.blocks.forEach((block, idx) => {
        if (block.focus) {
            let temp = 0;
            copyContent.value.data.blocks.forEach((blockDemo, idxDemo) => {
                if (blockDemo.zIndex < block.zIndex) {
                    blockDemo.zIndex = blockDemo.zIndex + 1;
                    temp = temp + 1;
                }
            })
            block.zIndex = block.zIndex - temp
        }
    })
    events.emit('end');
}