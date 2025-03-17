

import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: config.node_env === 'production',
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: 'farukk7920@gmail.com',
            pass: 'phoo qhjv jmst ydnh',
        },
    });

    await transporter.sendMail({
        from: 'farukk7920@gmail.com', // sender address
        to, // List of Recever email address
        subject: 'Order Status Updated!', // Subject line
        text: 'Your order status has been updated.', // plain text body
        html, // html body
    });
};