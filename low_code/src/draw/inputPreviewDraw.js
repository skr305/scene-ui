import deepcopy from "deepcopy";

export function inputPreviewDraw(blockRef, data, index){

    blockRef.value.children[0].style.width = `${data.value.style[index].width}px`;
    blockRef.value.children[0].children[0].style.height = `${data.value.style[index].height}px`;
    blockRef.value.children[0].children[0].style.fontSize = `${data.value.style[index].fontSize}px`;
    blockRef.value.children[0].children[0].style.fontWeight = data.value.style[index].fontWeight;
    blockRef.value.children[0].children[0].style.letterSpacing = `${data.value.style[index].letterSpacing}px`;
    blockRef.value.children[0].children[0].style.opacity = data.value.style[index].opacity;
    blockRef.value.children[0].children[0].value = deepcopy(data.value.style[index].value)
    blockRef.value.children[0].children[0].placeholder = data.value.style[index].placeholder
    blockRef.value.children[0].children[0].type = data.value.style[index].type
    blockRef.value.children[0].children[0].max = data.value.style[index].max

    // console.log(blockRef.value)
    // console.log(blockRef.value.children[0].style)
    // console.log(blockRef.value.children[0].children[0])
}