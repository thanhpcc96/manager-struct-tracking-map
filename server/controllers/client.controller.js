import Client from '../models/client.model';

/*
 ** Post Register Local
 */
export async function _postRegister(req, res) {
    try {
        const client = await Client.findOne({"local.email": req.body.email});
        if (client) {
            return res.status(401).json({error: true, message: 'Tai khoan nay da ton tai'})
        }
        else {
            let newClient = new Client();
            newClient.info.firstname = req.body.firstname;
            newClient.info.lastname = req.body.lastname;
            newClient.phone = req.body.phone;
            newClient.local.email = req.body.email;
            newClient.local.password = req.body.password;
            newClient.status="DEACTIVE"; // chưa kích hoạt
            return res.status(200).json({error: false, result: await newClient.save()});
        }

    } catch (err) {
        console.log("Loi dang ky: " + err);
        return res.status(503).json({error: true, message: 'Co loi xay ra'});
    }
}
/*
 ** Post Login local-- thuc thi voi dieu kien login local
 */
export function _postLogin(req, res, next) {
    res.status(200).json(req.user.toAuthJSON());
    return next();

}
