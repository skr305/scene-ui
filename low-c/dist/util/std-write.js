"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stdRmRf = exports.stdMkdir = exports.stdWriteFilePush = exports.stdWriteFileCover = exports.stdWriteFile = void 0;
const fs_1 = __importDefault(require("fs"));
const stdWriteFile = (path, content, options = {}) => new Promise((resolve, reject) => {
    fs_1.default.writeFile(path, content, options, (err) => {
        if (err) {
            return reject(err);
        }
        resolve(true);
    });
});
exports.stdWriteFile = stdWriteFile;
const stdWriteFileCover = (path, content) => (0, exports.stdWriteFile)(path, content, { "flag": "w+" });
exports.stdWriteFileCover = stdWriteFileCover;
const stdWriteFilePush = (path, content) => (0, exports.stdWriteFile)(path, content, { "flag": "a+" });
exports.stdWriteFilePush = stdWriteFilePush;
const stdMkdir = (path, options = { "recursive": true }) => {
    return fs_1.default.promises.mkdir(path, options);
};
exports.stdMkdir = stdMkdir;
const stdRmRf = (path, options = {}) => {
    return fs_1.default.promises.rm(path, Object.assign({ recursive: true, force: true }, options));
};
exports.stdRmRf = stdRmRf;
