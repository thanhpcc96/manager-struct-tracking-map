import UserModel from '../models/user.model';
/*
  Post Login
 */
export function _postLogin(req, res, next) {
    res.status(200).json({ err: false, result: req.user.toAuthJSON() });
    next();
}
/* 
** Create new user
*/
export function _postCreateNewUser(req, res, next) {
    try {
        const userCurrent = req.user;
        if (userCurrent.role === 2 || userCurrent.role === 3) { // chi co nhan vien nhan su, ban quan ly moi co quyen tao user
            const checkUser = await UserModel.findOne({ email: req.body.email });
            if (!checkUser) {
                const newUser = {
                    email: req.body.email,
                    password: req.body.password,
                    info: {
                        lastname: req.body.lastname,
                        firtname: req.body.firtname,
                        address: req.body.address,
                        passportNumber: req.body.passportNumber,
                        phoneNumber: req.body.phoneNumber,
                        photoProfile: req.body.urlPhoto
                    },
                    role: req.body.role,
                    status: 'ACTIVE'
                }
                return res.status(200).json({ err: false, result: await UserModel.create(newUser) });
            } else {
                return res.status(301).json({ err: true, message: 'Nhan vien nay ton tai roi' });
            }
            next();
        }
    } catch (err) {
        return res.status(503).json({ err: true, message: 'loi phia he thong ' + err });
    }
}
export async function _postUpdateInfo(req, res, next) {
    try {
        const userCurrent = req.user;
        userCurrent.password = req.body.password;
        userCurrent.info.firtname = userCurrent.info.firtname || req.body.firtname;
        userCurrent.info.lastname = userCurrent.info.lastname || req.body.lastname;
        userCurrent.info.address = userCurrent.info.address || req.body.address;
        return res.status(200).json({ err: false, result: await userCurrent.save() });
    } catch (err) {
        return res.status(503).json({ err: true, message: 'Loi he thong ' + err });
    }
}

