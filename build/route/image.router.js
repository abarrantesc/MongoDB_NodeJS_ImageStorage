"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const image_controller_1 = __importDefault(require("../controller/image.controller"));
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        //destination image ,create on project
        cb(null, './src/img/');
    },
    filename: function (req, file, cb) {
        var filetype = '';
        if (file.mimetype === 'image/png') {
            filetype = 'png';
        }
        if (file.mimetype === 'image/jpeg') {
            filetype = 'jpg';
        }
        //format name save image
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});
const upload = multer_1.default({ storage: storage });
class ImageRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.get('/get/', image_controller_1.default.getImage);
        //upload.single('image') you should send that's name on postman
        this.router.post('/create', upload.single('image'), image_controller_1.default.createImage);
    }
}
const imageRoutes = new ImageRoutes();
exports.default = imageRoutes.router;
