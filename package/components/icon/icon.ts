export const iconProps = {
    name:{
        type: String,
    },
    size:{
        type: [String,Number],
        validate(value:string | number){
            if(typeof value === 'number')
                return value > 0
            else
                return true
        }
    },
    color:{
        type: String,
    }
}