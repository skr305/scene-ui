export const cardProps = {
    header:{
        type:String,
    },
    shadow:{// 显示阴影的时机
        type:String,
        default: 'always',
        validator(val: string){
            return ['always','hover','never'].includes(val);
        }
    },
    bodyStyle:{//卡片的 body 的样式 object — { padding: '20px' }
        type:Object
    }
}