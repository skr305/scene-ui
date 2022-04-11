// 菜单拖拽功能
import {events} from "@/packages/events";

export function useMenuDragger(containerRef, data) {
    let currentComponent = null;
    const dragenter = (e) => {
        e.dataTransfer.dropEffect = 'move';
        // console.log(123456)
    }
    const dragover = (e) => {
        e.preventDefault();
    }
    const dragleave = (e) => {
        e.dataTransfer.dropEffect = 'none';
        // console.log(123)
    }
    const drop = (e) => {
        // console.log(currentComponent);

        let blocks = data.value.blocks; // 内部已经渲染的组件
        // console.log(blocks.length)
        // console.log(currentComponent.render())
        data.value = {
            ...data.value, blocks: [
                ...blocks,
                {
                    top: e.offsetY,
                    left: e.offsetX,
                    zIndex: blocks.length,
                    key: currentComponent.key,
                    alignCenter: true, // 实现松手的时候鼠标可以居中
                    focus: false,    // 没有选定的状态
                    lock: false,     // 没有锁定的状态
                    moveSign: 'move',  // 鼠标经过时的移动标识
                    trigger: {
                        jumpEvent: null,
                        alterEvent: null
                    }
                    // 存储该组件要触发的事件
                }
            ]
        }
        currentComponent = null;
    }
    const dragstart = (e, component) => {
        // dragenter进入元素中 添加一个移动的标识
        // dragover 在目标元素经过 必须阻止默认行为 否则不能触发drop
        // dragleave 离开元素的时候 需要添加一个禁用标识
        // drop 松手的时候 根据拖拽的组件 添加一个组件
        containerRef.value.addEventListener('dragenter', dragenter)
        containerRef.value.addEventListener('dragover', dragover)
        containerRef.value.addEventListener('dragleave', dragleave)
        containerRef.value.addEventListener('drop', drop)
        currentComponent = component;
        events.emit('start');
    }
    const dragend = (e) => {
        containerRef.value.removeEventListener('dragenter', dragenter)
        containerRef.value.removeEventListener('dragover', dragover)
        containerRef.value.removeEventListener('dragleave', dragleave)
        containerRef.value.removeEventListener('drop', drop)
        events.emit('end');
    }
    return {
        dragstart,
        dragend
    }
}