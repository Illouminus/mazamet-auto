import nodemailer, { Transporter } from "nodemailer";
// Определите типы для полей письма
interface EmailData {
    to: string;
    subject: string;
    text?: string;
    html?: string;
}

export async function sendEmail(data: EmailData) {
    const transporter = nodemailer.createTransport({
        host: process.env.SMPT_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SMPT_USER, // generated ethereal user
            pass: process.env.SMPT_PASSWORD, // generated ethereal password
        },
    });

     await transporter.sendMail({
        from: process.env.EMAIL_FROM, // sender address
        to: data.to, // list of receivers
        subject: data.subject, // Subject line
        text: data.text, // plain text body
        html: data.html, // html body
    });

}
