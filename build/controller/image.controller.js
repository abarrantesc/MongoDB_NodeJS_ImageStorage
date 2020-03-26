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
const image_model_1 = __importDefault(require("../model/image.model"));
const fs_extra_1 = __importDefault(require("fs-extra"));
class ImageRoutes {
    getImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const obj = yield image_model_1.default.find();
            res.json(obj);
        });
    }
    createImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //get image
            var newImg = fs_extra_1.default.readFileSync(req.file.path);
            //convert base64
            var encImg = newImg.toString('base64');
            const data = {
                image: {
                    data: Buffer.from(encImg, 'base64'),
                    contentType: 'image/jpeg'
                }
            };
            const newModel = new image_model_1.default(data);
            yield newModel.save(function (err, callBack) {
                if (err) {
                    res.json(err);
                }
                else {
                    res.json({ message: "Success", data: callBack });
                }
            });
        });
    }
}
const imageRoutes = new ImageRoutes();
exports.default = imageRoutes;
