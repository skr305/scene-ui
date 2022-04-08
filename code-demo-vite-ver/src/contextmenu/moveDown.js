import {events} from "@/packages/events";
import {ElMessage} from "element-plus";


export function moveDown(copyContent) {

    events.emit('start');
    copyContent.value.data.blocks.forEach((block, idx) => {
        if (block.focus) {
            let index = -1;
            copyContent.value.data.blocks.forEach((blockDemo, idxDemo) => {
                if (block.zIndex - blockDemo.zIndex === 1) {
                    index = idxDemo;
                }
            })
            if (index === -1) {
                ElMessage.error('已经到底了')
            } else {
                block.zIndex = block.zIndex - 1;
                copyContent.value.data.blocks[index].zIndex = copyContent.value.data.blocks[index].zIndex + 1;
            }
        }
    })
    events.emit('end');
}