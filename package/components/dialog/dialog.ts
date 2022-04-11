export const dialogProps = {
    modelValue:{//是否显示 Dialog
        type: Boolean,
        required: true,
    },
    title:{//Dialog 对话框 Dialog 的标题， 也可通过具名 slot （见下表）传入
        type: String,
    },
    width:{// 对话框的container的最小宽度
        type: Number,
        default: 400,
    },
    modal:{// 是否需要遮罩层
        type: Boolean,
        default: true,
    },
    lockScroll:{// 是否在 Dialog 出现时将 body 滚动锁定
        type: Boolean,
        default: false,
    },
    closeOnClickModal:{// 是否可以通过点击 modal 关闭 Dialog
        type: Boolean,
        default: true,
    },
}

export const dialogEmits = ['open','opened','close','closed','update:modelValue']