import Client from '../models/client.model';
import { tranporter } from '../config/mailer';
import crypto from 'crypto';

/*
 ** Post Register Local
 */
export async function _postRegister(req, res) {
    try {
        const client = await Client.findOne({ "local.email": req.body.email });
        if (client) {
            return res.status(401).json({ error: true, message: 'Tai khoan nay da ton tai' })
        }
        else {
            let newClient = new Client();
            newClient.info.firstname = req.body.firstname;
            newClient.info.lastname = req.body.lastname;
            newClient.phone = req.body.phone;
            newClient.local.email = req.body.email;
            newClient.local.password = req.body.password;
            newClient.status = "DEACTIVE"; // chưa kích hoạt
            return res.status(200).json({ error: false, result: await newClient.save() });
        }

    } catch (err) {
        console.log("Loi dang ky: " + err);
        return res.status(503).json({ error: true, message: 'Co loi xay ra' + err });
    }
}
/*
 ** Post Login local-- thuc thi voi dieu kien login local
 */
export function _postLogin(req, res, next) {
    res.status(200).json(req.user.toAuthJSON());
    return next();

}
/*
** post forgot password
*/
export async function _postResetPassword(req, res) {
    try {
        const client = await Client.findOne({ 'local.email': req.body.email });
        if (!client) {
            return res.status(404).json({ error: true, message: 'Tài khoản không tồn tại' });
        }
        console.log('=====================================');
        console.log(client);
        console.log('=====================================');
        let resetPasswordToken = crypto.randomBytes(16).toString('hex');
        client.local.resetPasswordToken = resetPasswordToken;
        client.local.resetPasswordExpires = Date.now() + 18000000; //60*60*1000 *5/ 5 tieng
        let mailOption = {
            from: 'Hai Au copany <services.haiaucompany@gmail.com>',
            to: req.body.email,
            subject: 'Khôi phục mật khẩu',
            text: ` Xin chào ${client.info.lastname}, vui lòng nhấp vào link để đặt lại mặt khẩu của bạn:
                        http://localhost:3000/client/forgot/${resetPasswordToken}`
        }
        const promise = await Promise.all([
            client.save(),
            tranporter.sendMail(mailOption)
        ])
        return res.status(200).json({ error: false, message: "Vui lòng check mail" });


    } catch (error) {
        console.log('=====================================');
        console.log("Lỗi ở forgot", error);
        console.log('=====================================');
    }
}
/*
* Post reset password khi co token
 */
export async function _resetPassword(req, res) {
    try {
        let token = req.params.token;
        const client = await Client.findOne({ "local.resetPasswordToken": token.trim() });
        if (!client) {
            return res.status(404).json({ error: true, message: "Mã xác nhận không hợp lệ" });
        }
        if (client.local.resetPasswordExpires < new Date()) {
            return res.status(400).json({
                error: true,
                message: 'Mã xác nhận đã hết hạn từ ' + client.local.resetPasswordExpires
            });
        } else {
            client.local.password = req.body.password;
            return res.status(200).json({ error: false, result: await client.save() })
        }
    } catch (error) {

    }
}