import express from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import bodyParser from 'body-parser';
import imageRoute from './route/image.router'

class Server {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();

    }

    config() {
        const MONGODB_URI = 'CONNECTION STRING';
        mongoose.set('useFindAndModify', false);

        mongoose.connect(MONGODB_URI || process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        })
            .then(db => console.log('MongoDb is connected'))
        
        
        //Setting
        this.app.set('port', process.env.PORT || 5000);

        //Middlewares
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(compression());
        this.app.use(cors());
    }
    routes() {
        this.app.use('/image', imageRoute);
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
             console.log('Server running on port', this.app.get('port'));
        });
    }

}

const server = new Server();
server.start();
