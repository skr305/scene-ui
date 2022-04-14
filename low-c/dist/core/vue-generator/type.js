"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = exports.VNode = exports.jsonModel = void 0;
class jsonModel {
    constructor(config, VNode) {
        this.config = config;
        this.VNode = VNode;
    }
}
exports.jsonModel = jsonModel;
class VNode {
}
exports.VNode = VNode;
class Config {
    constructor(username, date, operate) {
        this.username = username;
        this.date = date;
        this.operate = operate;
    }
}
exports.Config = Config;
