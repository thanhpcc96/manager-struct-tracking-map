import nodemailer from 'nodemailer';
import xoauth2 from 'xoauth2';

export const tranporter= nodemailer.createTransport({
  service:'gmail',
  auth:{
    user: 'service.haiaucompany@gmail.com',
    pass: 'Thanh@hao96'
    // xoauth2 : xoauth2.createXOAuth2Generator({
    //   user: 'service.haiaucompany@gmail.com', // mail may chu fui mail xac nhan
    //   clientID:'666879894947-f8srtffkpb7ho32qrp1hlui7rnjhamou.apps.googleusercontent.com',
    //   clientSecret: 'hkxVSdFe6QnUDx_mhdLic4YR',
    //   refreshToken: '1/jspO_vZ99TjWrbdlvofTwzxlBNz0zW7wxxCyzmhKc_D5GgGglfFosoKRWVYPmsMe'
    // })
  }
});

