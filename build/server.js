"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const image_router_1 = __importDefault(require("./route/image.router"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        const MONGODB_URI = 'CONNECTION STRING';
        mongoose_1.default.set('useFindAndModify', false);
        mongoose_1.default.connect(MONGODB_URI || process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        })
            .then(db => console.log('MongoDb is connected'));
        //Setting
        this.app.set('port', process.env.PORT || 5000);
        //Middlewares
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        this.app.use(compression_1.default());
        this.app.use(cors_1.default());
    }
    routes() {
        this.app.use('/image', image_router_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server running on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
