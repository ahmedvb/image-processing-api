"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var path_1 = __importDefault(require("path"));
var _DATA_1 = __importDefault(require("../../Utils/_DATA"));
var fs_1 = require("fs");
var sharp_1 = __importDefault(require("sharp"));
var leads_routes = (0, express_1.Router)();
leads_routes.get('/', function (req, res) {
    var name = req.query.name;
    var width = req.query.width;
    var height = req.query.height;
    var imgLocation = path_1.default.resolve('./') + "/assets/original/".concat(name, ".jpg");
    var imgLocation_resized = '';
    var lead = _DATA_1.default.includes(name);
    // If the name query wasn't provided return and end function
    if (name === undefined) {
        return res
            .status(400)
            .send('Bad request, query parameter (name) is required!...');
    }
    // If the name doesn't exist in the array return and end function
    if (lead === false) {
        return res
            .status(404)
            .send('Resource not found, this image does not exist!');
    }
    if (width === undefined) {
        return res
            .status(400)
            .send('Bad request, query parameter (width) is required!');
    }
    if (isNaN(Number(width))) {
        return res
            .status(400)
            .send('Bad request, query parameter (width) is not a number!');
    }
    if (Number(width) <= 0) {
        return res
            .status(400)
            .send('Bad request, query parameter (width) is a wrong value');
    }
    if (height === undefined) {
        return res
            .status(400)
            .send('Bad request, query parameter (height) is required!');
    }
    if (isNaN(Number(height))) {
        return res
            .status(400)
            .send('Bad request, query parameter (height) is not a number!');
    }
    if (Number(height) <= 0) {
        return res
            .status(400)
            .send('Bad request, query parameter (height) is a wrong value');
    }
    // If the name exists in the array but the photo doesn't exist return and end function
    if ((0, fs_1.existsSync)(imgLocation) === false) {
        return res
            .status(404)
            .send('Resource not found, this name does not have an image!');
    }
    imgLocation_resized =
        path_1.default.resolve('./') + "/assets/resized/".concat(name, "_").concat(width, "_").concat(height, ".jpg");
    if ((0, fs_1.existsSync)(imgLocation_resized)) {
        //send the resized file
        res.sendFile(imgLocation_resized);
        return;
    }
    // Otherwise return the resized image
    (0, sharp_1.default)(imgLocation)
        .resize({ width: Number(width), height: Number(height) })
        .toFile(imgLocation_resized)
        .then(function () {
        res.sendFile(imgLocation_resized);
    })
        .catch(function () {
        return res.status(500).send('server error');
    });
});
exports.default = leads_routes;
