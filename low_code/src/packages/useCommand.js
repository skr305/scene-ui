import {events} from "@/packages/events";
import deepcopy from "deepcopy";
import {onUnmounted} from "vue";
import {ElMessage} from 'element-plus';

export function useCommand(data, state) {

    const registry = (command) => {
        state.commandArray.push(command);
        state.commands[command.name] = () => {
            const {redo, undo} = command.execute();
            redo();
            if (!command.pushQueue) {
                return
            }
            let {queue, current} = state;
            // console.log('ahh')

            if (queue.length > 0) {
                queue = queue.slice(0, current + 1);
                state.queue = queue;
            }

            queue.push({redo, undo});
            state.current = current + 1;
            // console.log(queue)
        }
    }

    registry({
        name: 'redo',
        keyboard: 'ctrl+y',
        execute() {
            return {
                redo() {
                    let item = state.queue[state.current + 1];
                    if (item) {
                        item.redo && item.redo();
                        state.current++;
                    }
                }
            }
        }
    })
    registry({
        name: 'undo',
        keyboard: 'ctrl+z',
        execute() {
            return {
                redo() {
                    if (state.current === -1) return;
                    let item = state.queue[state.current];
                    if (item) {
                        item.undo && item.undo();
                        state.current--;
                    }
                }
            }
        }
    })
    registry({
        name: 'clear',
        pushQueue: true,
        execute() {
            const before = deepcopy(data.value)
            return {
                redo() {
                    data.value.blocks.splice(0, data.value.blocks.length)
                    data.value.style.splice(0, data.value.style.length)
                },
                undo() {
                    data.value = {...data.value, blocks: before.blocks, style: before.style}
                    // console.log(JSON.stringify({...data.value, blocks: before.blocks, style: before.style}))
                }
            }
        }
    })
    registry({
        name: 'lock',
        pushQueue: true,
        execute() {
            const before = deepcopy(data.value)
            return {
                redo() {
                    data.value.blocks.forEach((block, idx) => {
                        if (block.focus) {
                            // console.log(JSON.stringify(data.value))
                            // data.value.style.splice(idx, 1)
                            data.value.blocks[idx].lock = true
                            data.value.blocks[idx].moveSign = 'not-allowed'
                        }
                    })
                },
                undo() {
                    data.value = {...data.value, blocks: before.blocks, style: before.style}
                }
            }
        }
    })
    registry({
        name: 'unlock',
        pushQueue: true,
        execute() {
            const before = deepcopy(data.value)
            return {
                redo() {
                    data.value.blocks.forEach((block, idx) => {
                        if (block.focus) {
                            // console.log(JSON.stringify(data.value))
                            // data.value.style.splice(idx, 1)
                            data.value.blocks[idx].lock = false
                            data.value.blocks[idx].moveSign = 'move'
                        }
                    })
                },
                undo() {
                    data.value = {...data.value, blocks: before.blocks, style: before.style}
                }
            }
        }
    })
    registry({
        name: 'top',
        pushQueue: true,
        execute() {
            const before = deepcopy(data.value)
            return {
                redo() {
                    data.value.blocks.forEach((block, idx) => {
                        if (block.focus) {
                            let temp = 0;
                            data.value.blocks.forEach((blockDemo, idxDemo) => {
                                if (blockDemo.zIndex > block.zIndex) {
                                    blockDemo.zIndex = blockDemo.zIndex - 1;
                                    temp = temp + 1;
                                }
                            })
                            block.zIndex = block.zIndex + temp
                        }
                    })
                },
                undo() {
                    data.value = {...data.value, blocks: before.blocks, style: before.style}
                }
            }
        }
    })
    registry({
        name: 'bottom',
        pushQueue: true,
        execute() {
            const before = deepcopy(data.value)
            return {
                redo() {
                    data.value.blocks.forEach((block, idx) => {
                        if (block.focus) {
                            let temp = 0;
                            data.value.blocks.forEach((blockDemo, idxDemo) => {
                                if (blockDemo.zIndex < block.zIndex) {
                                    blockDemo.zIndex = blockDemo.zIndex + 1;
                                    temp = temp + 1;
                                }
                            })
                            block.zIndex = block.zIndex - temp
                        }
                    })
                },
                undo() {
                    data.value = {...data.value, blocks: before.blocks, style: before.style}
                }
            }
        }
    })
    registry({
        name: 'remove',
        keyboard: 'ctrl+d',
        pushQueue: true,
        execute() {
            let before = deepcopy(data.value)
            // console.log(before.blocks.length)
            // console.log(before.style.length)
            // console.log(before)
            // console.log(state)
            let focusLength = 0;
            return {
                redo() {
                    data.value.blocks.forEach((block, idx) => {
                        if (block.focus) {
                            data.value.blocks.forEach((blockDemo, idxDemo) => {
                                if (blockDemo.zIndex > block.zIndex) {
                                    blockDemo.zIndex = blockDemo.zIndex - 1;
                                }
                            })
                            // console.log(JSON.stringify(data.value))
                            data.value.style.splice(idx, 1)
                            data.value.blocks.splice(idx, 1)
                            focusLength = 1;

                        }
                    })
                    if (focusLength === 0) {
                        ElMessage({
                            message: '请选择要删除的组件',
                            type: 'warning',
                        })
                    }
                    // console.log(before)
                },

                undo() {
                    data.value = {...data.value, blocks: before.blocks, style: before.style}
                    // console.log(JSON.stringify(before))
                    // before = deepcopy(data.value)
                    // console.log(JSON.stringify(before))
                    // console.log(JSON.stringify({...data.value, blocks: before.blocks, style: before.style}))
                },
            }
        }
    })
    registry({
        name: 'drag',
        pushQueue: true,
        init() {
            this.before = null
            const start = () => {
                this.before = deepcopy(data.value)
                // console.log(123)
                return this.before
            }
            const end = () => state.commands.drag()
            events.on('start', start)
            events.on('end', end)

            return () => {
                events.off('start', start)
                events.off('end', end)
            }
        },
        execute() {
            let before = this.before;
            let after = data.value
            return {
                redo() {
                    // console.log(JSON.stringify(data.value))
                    data.value = {...data.value, blocks: after.blocks, style: after.style}

                    // console.log(JSON.stringify({...data.value, blocks: after.blocks}))
                },
                undo() {
                    data.value = {...data.value, blocks: before.blocks, style: before.style}
                    // console.log(JSON.stringify(state))
                    // console.log(JSON.stringify({...data.value, blocks: before.blocks, style: before.style}))
                }
            }
        }
    });

    const registryDome = (command) => {
        state.commands[command.name] = () => {
            const {carry} = command.execute();
            carry();
        }
    }

    registryDome({
        name: 'output',
        keyboard: 'ctrl+o',
        execute() {
            return {
                carry() {
                    let data_demo = data.value
                    // console.log(JSON.stringify(data_demo))
                    alert(JSON.stringify(data_demo));
                }
            }
        }
    })

    registryDome({
        name: 'preview',
        execute() {
            return {
                carry() {
                    data.value.previewDemo = true
                }
            }
        }
    })


    const keyboardEvent = (() => {
        const keyCodes = {
            90: 'z',
            89: 'y',
            68: 'd',
        }
        const onKeydown = (e) => {
            const {ctrlKey, keyCode} = e;
            let keyString = [];
            if (ctrlKey) keyString.push('ctrl');
            keyString.push(keyCodes[keyCode]);
            keyString = keyString.join('+');

            state.commandArray.forEach(({keyboard, name}) => {
                if (!keyboard) return;
                if (keyboard === keyString) {
                    state.commands[name]();
                    e.preventDefault();
                }
            })
        }
        const init = () => {
            window.addEventListener('keydown', onKeydown, {passive: false})
            return () => {
                window.removeEventListener('keydown', onKeydown)
            }
        }
        return init
    })();


    (() => {
        state.destroyArray.push(keyboardEvent())
        state.commandArray.forEach(command => command.init && state.destroyArray.push(command.init()))
    })();

    onUnmounted(() => {
        state.destroyArray.forEach(fn => fn && fn());
    })
    return state;
}