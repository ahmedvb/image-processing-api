"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var leads_1 = __importDefault(require("./api/leads"));
var routes = (0, express_1.Router)();
routes.get('/', function (_req, res) {
    res.send('Welcome to the image processing API');
});
routes.use('/resize', leads_1.default);
exports.default = routes;
