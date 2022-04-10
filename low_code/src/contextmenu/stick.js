import {ElMessage} from "element-plus";
import deepcopy from "deepcopy";
import {useCommand} from "@/packages/useCommand";
import {events} from "@/packages/events";

export function stick(copyContent) {
    if (copyContent.value.copyContent.length === 0) {
        ElMessage({
            message: '请先复制的组件',
            type: 'warning',
        })
    } else {

        let maxValue = -1;
        // console.log(copyContent.value.data)
        copyContent.value.data.blocks.forEach((block, idx) => {
            if (block.zIndex > maxValue) {
                maxValue = block.zIndex
            }

        })
        // console.log(maxValue + 1)

        let block = deepcopy(copyContent.value.copyContent[0])
        let style = deepcopy(copyContent.value.copyContent[1])
        block.zIndex = maxValue + 1;
        block.top = copyContent.value.startY
        block.left = copyContent.value.startX

        // 撤销事件触发器
        events.emit('start');

        copyContent.value.data.blocks.push(block)
        copyContent.value.data.style.push(style)

        events.emit('end');
        // console.log(JSON.stringify(copyContent.value.state.commandArray[4].before.blocks))
        // console.log(JSON.stringify(block))
        // const {commands} = useCommand(copyContent.value.data, copyContent.value.state);

    }


    // console.log(JSON.stringify(copyContent.value.data))
    // console.log(JSON.stringify(copyContent.value.startX))
}