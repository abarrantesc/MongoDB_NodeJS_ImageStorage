import { Request, Response } from 'express';
import ImageModel from '../model/image.model';
import fs, { copySync } from 'fs-extra';

class ImageRoutes {


    async getImage(req: Request, res: Response): Promise<void> {
        const obj = await ImageModel.find();
        res.json(obj);
    }

    async createImage(req: Request, res: Response): Promise<void> {

        //get image
        var newImg = fs.readFileSync(req.file.path);
       
        //convert base64
        var encImg = newImg.toString('base64');

        const data = {
            image: {
                data: Buffer.from(encImg, 'base64'),
                contentType: 'image/jpeg'
            }
        }
        const newModel = new ImageModel(data);

        await newModel.save(function (err, callBack) {
            if (err) {
                res.json(err);
            } else {
                res.json({message:"Success",data:callBack});
            }
        });

    }

}


const imageRoutes = new ImageRoutes();

export default imageRoutes;