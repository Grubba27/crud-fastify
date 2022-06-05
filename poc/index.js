"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PocService = exports.PocController = void 0;
const poc_controller_1 = require("./poc-controller");
Object.defineProperty(exports, "PocController", { enumerable: true, get: function () { return poc_controller_1.PocController; } });
const poc_service_1 = __importDefault(require("./poc-service"));
exports.PocService = poc_service_1.default;
