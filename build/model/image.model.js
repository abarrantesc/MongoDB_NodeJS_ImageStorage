"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ImageShema = new mongoose_1.Schema({
    image: {
        data: Buffer,
        contentType: String
    }
});
exports.default = mongoose_1.model('Image', ImageShema);
