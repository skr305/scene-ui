"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stdReadDir = exports.stdReadFile = void 0;
const fs_1 = __importDefault(require("fs"));
const stdReadFile = (pathname, raw = false) => new Promise((resolve, reject) => {
    fs_1.default.readFile(pathname, function (err, data) {
        if (err) {
            return reject(err);
        }
        const transout = raw ? data : data.toString('utf8');
        resolve(transout);
    });
});
exports.stdReadFile = stdReadFile;
const stdReadDir = (pathname) => new Promise((resolve, reject) => {
    fs_1.default.readdir(pathname, function (err, data) {
        if (err) {
            return reject(err);
        }
        const transout = data;
        resolve(transout);
    });
});
exports.stdReadDir = stdReadDir;
