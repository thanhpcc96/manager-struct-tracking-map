import multer, { diskStorage } from 'multer';
import User from '../models/user.model';


//config upload
const _uploadMiddleware = () => {
    const store = diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'public/img/' ) //"dist/upload/"
        },
        filename: (req, file, cb) => {
            cb(null, req.body.id + file.originalname)
        }
    });
    const upload = multer({ storage: store }).array('userPhoto',2); // toi da upload 1 lan la 2 cai
    return upload.any();
}
const _uploadMiddlewareRegister = (req,res,next) => {
    const store = diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'public/img/')
        },
        filename: (req, file, cb) => {
            cb(null, req.user._id + file.originalname)
        }
    });
    const upload = multer({ storage: store });
    return upload.any();
}
