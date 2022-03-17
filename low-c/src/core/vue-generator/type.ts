// key-value类型
export interface pair<K,V>{
    key: K,
    value: V,
}

/**
 * 低代码平台传输的JSON格式
 */
 export class jsonModel{
    config: Config
    VNode: VNode
    constructor(config: Config, VNode: VNode){
        this.config = config;
        this.VNode = VNode
    }
}

/**
 * 低代码平台返回的虚拟节点
 */
export interface StyleObject{
    top: string;
    left: string;
    width?: string;
    height?: string;
}
// 事件字符串
export type EventString = 'click' | 'submit' | 'focus'
// 结点类型
export type NodeType = 'text' | 'comment' | 'htmlElement' 
export class VNode{
    type: NodeType;                     // HTML元素类型  
    tagName?: string;                    // 标签名
    style?: StyleObject;                 // style对象
    v_bind?: pair<string,string>[];       // :name="name"
    v_on?: pair<EventString,string>[];  // v-on:click = "func"
    v_if?: string;                      // v-if="variable"
    v_show?: string;                    // v-show="variable"
    v_for?: string;                     // v-for="(item,index) in variable"
    children?: VNode[];
    value?: string;
}

/**
 * config类型
 * username
 * date
 * operate
 */
export type OperatorType = 'create' | 'update' | 'delete'
export class Config{
    username: string        // 本次操作的用户
    date: Date              // 本次操作的时间戳
    operate: OperatorType   // 本次操作的类型
    constructor(username: string, date: Date, operate: OperatorType){
        this.username = username;
        this.date = date;
        this.operate = operate;
    }
}
