// 实现组件 （right_bottom） 拖动改变大小

import {events} from "@/packages/events";

export function right_bottomSizeChange(data) {

    let dragState = {
        startX: 0,
        startY: 0,
        dragging: false
    }

    const mousedownRightBottom = (e) => {
        e.stopPropagation()
        e.preventDefault()

        data.value.blocks.forEach((block, idx) => {
            if (block.focus) {

                dragState = {
                    startX: e.clientX,
                    startY: e.clientY,
                    dragging: false
                }
                // console.log(durY)
                document.addEventListener('mousemove', mousemove, {passive: false})
                document.addEventListener('mouseup', mouseup, {passive: false})
            }
        })
    }

    const mousemove = (e) => {
        // console.log(e)
        let {clientX: moveX, clientY: moveY} = e;


        if (!dragState.dragging) {
            dragState.dragging = true;
            events.emit('start');
        }
        // console.log(111)

        data.value.blocks.forEach((block, idx) => {
            if (block.focus) {
                let durX = moveX - dragState.startX;
                let durY = moveY - dragState.startY;
                if (dragState.startX - moveX < data.value.style[idx].width) {
                    dragState.startX = moveX;

                    data.value.style[idx].width = data.value.style[idx].width + durX;
                } else {
                    data.value.style[idx].width = 0
                }
                if (dragState.startY - moveY < data.value.style[idx].height) {
                    dragState.startY = moveY;

                    data.value.style[idx].height = data.value.style[idx].height + durY;
                } else {
                    data.value.style[idx].height = 0
                }
            }
        })
    }

    const mouseup = (e) => {
        document.removeEventListener('mousemove', mousemove, {passive: false})
        document.removeEventListener('mouseup', mouseup, {passive: false})
        // e.target.style.cursor = 'default'
        if (dragState.dragging) {
            dragState.dragging = false;
            events.emit('end');
        }
    }

    return{
        mousedownRightBottom
    }
}