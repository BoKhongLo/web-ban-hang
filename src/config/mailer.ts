import nodemailer from 'nodemailer';
import winston from 'winston';
import path from 'path';
import hbs, {NodemailerExpressHandlebarsOptions} from 'nodemailer-express-handlebars';

const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.json(),
    transports: [new winston.transports.Console()]
});

const handlebarOptions : NodemailerExpressHandlebarsOptions = {
    viewEngine: {
        partialsDir: path.resolve('../src/views/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./src/views/'),
};


export const sendMail = async (to: string, subject: string, username: string, token: string, template: string) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: process.env.MAIL_HOST,
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
    });
    transporter.use('compile', hbs(handlebarOptions))
    console.log({
        service: process.env.MAIL_HOST,
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
    })
    const mailOptions = {
        from: process.env.MAIL_USER,
        to: to,
        subject: subject,
        template: template,
        context: {
            username: username,
            code: token
        },
    };

    logger.info(`Sending mail to - ${to}`);
    try {
        const info = await transporter.sendMail(mailOptions);
        logger.info('Email sent: ' + info.response);
    } catch (error) {
        logger.error(error);
    }
}