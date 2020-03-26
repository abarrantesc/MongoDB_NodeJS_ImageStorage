import { Schema, model } from 'mongoose';


const ImageShema = new Schema({
    image: {
        data: Buffer,
         contentType: String
    }
});

export default model('Image', ImageShema);

