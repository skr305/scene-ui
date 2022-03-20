export function textFirstDraw(blockRef, data, offsetWidth, offsetHeight) {

    blockRef.value.children[0].style.color = "#000000";
    blockRef.value.children[0].style.fontSize = "15px";
    blockRef.value.children[0].style.fontWeight = 500;
    blockRef.value.children[0].style.lineHeight = "20px";
    blockRef.value.children[0].style.letterSpacing = "0px";
    blockRef.value.children[0].style.opacity = 1;


    let style = data.value.style;
    data.value = {
        ...data.value, style: [
            ...style,
            {
                width: offsetWidth,
                height: offsetHeight,
                color: blockRef.value.children[0].style.color,
                fontSize: 14,
                fontWeight: 500,
                lineHeight: 10,
                letterSpacing: 0,
                opacity: 1,
                innerHTML: "渲染文本",
            }
        ]
    }
}