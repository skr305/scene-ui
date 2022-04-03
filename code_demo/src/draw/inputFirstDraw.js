export function inputFirstDraw(blockRef, data, offsetWidth, offsetHeight, id) {

    blockRef.value.children[0].children[0].style.fontSize = "15px";
    blockRef.value.children[0].children[0].style.fontWeight = 500;
    blockRef.value.children[0].children[0].style.letterSpacing = "0px";
    blockRef.value.children[0].style.opacity = 1;
    blockRef.value.children[0].children[0].value = ""
    blockRef.value.children[0].children[0].placeholder = "渲染输入框"
    blockRef.value.children[0].children[0].type = "text"
    blockRef.value.children[0].children[0].max = 10
    // console.log(blockRef.value.children[0].children[0])

    let style = data.value.style;

    if (data.value.blocks.length - data.value.style.length === 1) {
        data.value = {
            ...data.value, style: [
                ...style,
                {
                    width: offsetWidth,
                    height: offsetHeight,
                    fontSize: 14,
                    fontWeight: 500,
                    letterSpacing: 0,
                    opacity: 1,
                    value: "",
                    placeholder: blockRef.value.children[0].children[0].placeholder,
                    type: "text",
                    max: 10,
                }
            ]
        }
    }

    if (data.value.blocks.length === data.value.style.length) {
        blockRef.value.children[0].style.width = `${data.value.style[id].width}px`;
        // block.width = data.value.style[id].width;
        blockRef.value.children[0].children[0].style.height = `${data.value.style[id].height}px`;
        // block.height = data.value.style[id].height;
        blockRef.value.children[0].children[0].style.fontSize = `${data.value.style[id].fontSize}px`;
        blockRef.value.children[0].children[0].style.fontWeight = data.value.style[id].fontWeight;
        blockRef.value.children[0].children[0].style.letterSpacing = `${data.value.style[id].letterSpacing}px`;
        blockRef.value.children[0].children[0].style.opacity = data.value.style[id].opacity;
        blockRef.value.children[0].children[0].value = data.value.style[id].value
        blockRef.value.children[0].children[0].placeholder = data.value.style[id].placeholder
        blockRef.value.children[0].children[0].type = data.value.style[id].type
        blockRef.value.children[0].children[0].max = data.value.style[id].max
    }
    // console.log(data.value.blocks.length)
    // console.log(data.value.style.length)
}