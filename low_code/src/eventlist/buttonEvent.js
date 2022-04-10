export function buttonEvent(blockRef, block) {

    if (block.trigger.alterEvent !== null) {
        blockRef.value.children[0].onclick = () => alert(block.trigger.alterEvent)
    }
    if (block.trigger.jumpEvent !== null) {
        // console.log(123)
        blockRef.value.children[0].onclick = () => window.location.href = block.trigger.jumpEvent
    }
}