import { Router } from 'express';
import ImageController from '../controller/image.controller'
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        //destination image ,create on project
        cb(null, './src/img/');
    },
    filename: function(req, file, cb) {
        var filetype = '';
        if(file.mimetype === 'image/png') {
          filetype = 'png';
        }
        if(file.mimetype === 'image/jpeg') {
          filetype = 'jpg';
        }
        //format name save image
      cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
  });


const upload = multer({storage:storage}); 

class ImageRoutes {

    router: Router;

    constructor() {

        this.router = Router();
        this.routes();
    }


    routes() {
        this.router.get('/get/', ImageController.getImage);
        
        //upload.single('image') you should send that's name on postman
        this.router.post('/create',upload.single('image'), ImageController.createImage);

    }
}

const imageRoutes = new ImageRoutes();

export default imageRoutes.router;