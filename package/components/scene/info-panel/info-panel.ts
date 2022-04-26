import { ComponentConstants } from '../../../core/constants'; 

export const infoPanelProps = {
    width:{
        type: [String,Number],
        validate(value:string | number){
            if(typeof value === 'number')
                return value > 0
            else
                return true
        }
    },
    height:{// 主要的信息栏会平分剩余的空间
        type: [String,Number],
        validate(value:string | number){
            if(typeof value === 'number')
                return value > 0
            else
                return true
        }
    },
    theme: {
        type: String,
        default: 'main',
        validator(value:ComponentConstants.StandardColor){
            return ComponentConstants.StandardColorArr.includes(value)
        },
    },
    type: {
        type: String,
        default: 'info',
        validator(value: string){
            return ComponentConstants.InfoPanelType.includes(value)
        },
    },
    title:{// panel的标题
        type: String,
    },
    info:{// panel展示的主要信息
        type: Object,
        default:{}
    }
}
