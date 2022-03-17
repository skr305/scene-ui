import {events} from "@/packages/events";
import deepcopy from "deepcopy";
import {onUnmounted} from "vue";
import { ElMessageBox, ElMessage } from 'element-plus';

export function useCommand(data) {
    const state = {
        current: -1,
        queue: [],
        commands: {},
        commandArray: [],
        destroyArray: []
    }

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
                    if (state.current == -1) return;
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
        name: 'remo',
        keyboard: 'ctrl+d',
        pushQueue: true,
        execute() {
            const before = deepcopy(data.value.blocks)
            let focusLength = 0;
            return {
                redo() {
                    data.value.blocks.forEach((block, idx) => {
                        if (block.focus) {
                            data.value.blocks.splice(idx, 1)
                            focusLength = 1;
                        }
                    })
                    if (focusLength === 0){
                        alert("请选择要删除的组件")
                    }
                    // console.log(before)
                },

                undo(){
                    data.value = {...data.value, blocks: before}
                },
            }
        }
    })
    registry({
        name: 'drag',
        pushQueue: true,
        init() {
            this.before = null
            const start = () => this.before = deepcopy(data.value.blocks)
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
            let after = data.value.blocks
            return {
                redo() {
                    data.value = {...data.value, blocks: after}
                },
                undo() {
                    data.value = {...data.value, blocks: before}
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
        name: 'outPut',
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
            window.addEventListener('keydown', onKeydown)
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