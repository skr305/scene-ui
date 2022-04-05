export const messageProps = {
    type: {
        type: String,
        required: true
    },
    duration:{
        type: Number,
        required: true
    },
    text:{// 显示阴影的时机
        type:String,
        required: true
    },
    showCloseButton: {
        type: Boolean,
        required: true
    },
    onClose: {
        type: Function,
        required: true
    }
}