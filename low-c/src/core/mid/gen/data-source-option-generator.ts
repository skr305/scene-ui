import { MidConfigType } from '../type';
const boot = ( model: MidConfigType ) => {
    // 默认是不覆盖原database的
    let Cover:boolean = false;
    if( model.Cover ) {
        Cover = model.Cover;
    }
    const baseName = model.BaseName;
    const baseUser = model.BaseUser;
    const basePwd = model.BasePwd;
    //生成文件输出
    return `
export const Cover = ${ Cover };
export const BaseName = "${ baseName }";
export const BaseUser = "${ baseUser }";
export const BasePwd = "${ basePwd}";
    `
};
export default boot;