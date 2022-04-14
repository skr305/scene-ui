"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidKey = void 0;
function isValidKey(key, object) {
    return key in object;
}
exports.isValidKey = isValidKey;
