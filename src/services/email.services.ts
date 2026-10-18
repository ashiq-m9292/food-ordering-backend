import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    // host: process.env.MAIL_HOST,
    // port: process.env.MAIL_PORT,
    // secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

export const sendMail = async (to: string, subject: string, html: string) => {
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        html
    });
};