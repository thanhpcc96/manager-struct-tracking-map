import multer, { diskStorage } from 'multer';
import User from '../models/user.model';
//config upload
const _uploadMiddleware = pathToSave => {
    const store = diskStorage({
        destination: (req, file, cb) => {
            cb(null, pathToSave ) //"dist/upload/"
        },
        filename: (req, file, cb) => {
            cb(null, req.body.id + file.originalname)
        }
    });
    const upload = multer({ storage: store });
    return upload.any();
}
const _uploadMiddlewareRegister = pathToSave => {
    const store = diskStorage({
        destination: (req, file, cb) => {
            cb(null, pathToSave)
        },
        filename: (req, file, cb) => {
            cb(null, req.user._id + file.originalname)
        }
    });
    const upload = multer({ storage: store });
    return upload.any();
}
