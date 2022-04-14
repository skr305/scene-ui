"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_error_1 = __importDefault(require("../core/error/base-error"));
const std_read_1 = require("./std-read");
const error_code_1 = require("../core/error/error-code");
const jsonReader = (path) => __awaiter(void 0, void 0, void 0, function* () {
    if (path.slice(path.length - 5) != ".json") {
        throw new base_error_1.default(error_code_1.XLS_ERROR_CODE_SET.FILE_TYPE_ERROR, "jsonreader achieve a file not end by .json");
    }
    const raw = yield (0, std_read_1.stdReadFile)(path);
    try {
        return JSON.parse(raw);
    }
    catch (_a) {
        throw new base_error_1.default(error_code_1.XLS_ERROR_CODE_SET.JSON_FORMAT_ERROR, `jsonreader achieve a bad json in ${path}`);
    }
});
exports.default = jsonReader;
