export function textEvent(blockRef, block) {

    // console.log(blockRef.value)

    if (block.trigger.alterEvent !== null) {
        blockRef.value.onclick = () => alert(block.trigger.alterEvent)
    }
    if (block.trigger.jumpEvent !== null) {
        // console.log(123)
        blockRef.value.onclick = () => window.location.href = block.trigger.jumpEvent
    }
}