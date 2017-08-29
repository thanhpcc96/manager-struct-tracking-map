import kue from 'kue'; // import de add chung progress trong process
import { tranporter } from '../../config/mailer'
const jobs = kue.createQueue({ // tao backgroud jobs trong database redis dang cache hoac trong RAM
    redis: 'redis://localhost:6379'
});
export default function xulyEmail() {
    jobs.process('sendMail', (job, done) => {
        console.log(` data cua email la: ${job.data.toString()}`);
        /*
            option dang:{
                    from: 'Hai Au copany <services.haiaucompany@gmail.com>',
                    to: req.body.email,
                    subject: 'Khôi phục mật khẩu',
                    text: ` Xin chào ${client.info.lastname}, vui lòng nhấp vào link để đặt lại mặt khẩu của bạn:
                            http://localhost:3000/client/forgot/${resetPasswordToken}`
            }
        */
        tranporter.sendMail(job.data.optionMail, (err, info) => {
            if (err) {
                return done(new Error('Email sai khong ton tai!'));
            }
            done();
        })
    })
};
