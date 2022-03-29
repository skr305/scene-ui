import AppResponse from '../../../core/lib/app-response';
export type LoginResponse = {
    done: boolean;
};
export type RegisterResponse = {
    done: boolean;
};
export type LoginPromiseInjector =  ( username: string, pwd: string ) => Promise< AppResponse< LoginResponse > >;
export type RegisterPromiseInjector = ( userID: string, username: string, pwd: string ) => Promise< AppResponse< RegisterResponse > >;
export type LoginRegisterProps = {
    onLogin ?: LoginPromiseInjector,
    onRegister ?: RegisterPromiseInjector 
    // 操作resolve后的路由跳转事件
    onPushLogin ?: () => any,
    onPushRegister ?: () => any
};