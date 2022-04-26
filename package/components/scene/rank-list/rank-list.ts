import { values } from "lodash"

export const rankListProps = {
    items:{// 对象数组
        type: Array,
        required: true
    },
    basis:{// 排序所依赖的项
        type: String,
        requied: true,
    },
    sequence:{// 顺序
        type: String,
        default: 'descend',
        validator(value: string){
            return ['ascend','descend'].includes(value)
        }
    }
}

export const rankListEmits = ['onRank']
