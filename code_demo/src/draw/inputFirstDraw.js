export function inputFirstDraw(blockRef, data) {

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
    data.value = {
        ...data.value, style: [
            ...style,
            {
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