export default function createPath(iconName:string):string{
    if(typeof iconName === undefined)
        return ''
    else
        return '/'+iconName+'.svg'
}