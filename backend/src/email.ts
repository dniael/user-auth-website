import nodemailer from 'nodemailer'
import { google } from 'googleapis'
require('dotenv').config()

const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID, 
    process.env.GOOGLE_CLIENT_SECRET,
    'https://developers.google.com/oauthplayground'
)
const SENDER_EMAIL = 'resetyourpwdtest@gmail.com'

export async function sendResetPasswordMail(email: string, token: string): Promise<string> {

    oAuth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN })
    const accessToken = await oAuth2Client.getAccessToken()
    
    const transportOptions = {
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: SENDER_EMAIL,
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
            accessToken: accessToken
        } 
    } as nodemailer.TransportOptions
    const transport = nodemailer.createTransport(transportOptions)

    try {
        const mailOptions = {
            from: SENDER_EMAIL,
            to: email,
            subject: 'Password Reset',
            text: `Reset password link: http://localhost:3000/reset/${token}`
        }
        await transport.sendMail(mailOptions)
        return 'email sent successfully'
    } catch(err) {
        console.log(err)
        return 'error sending email'
    }
}

// export async function sendWelcomeMail(email: string): Promise<string> {
//     const transport = await getTransport()
//     try {
//         const mailOptions = {
//             from: SENDER_EMAIL,
//             to: email,
//             subject: "Welcome to Sus",
//             text: "Thank you for creating an account!"
//         }
//         await transport.sendMail(mailOptions)
//         return 'email sent successfully'
//     } catch (err) {
//         console.log(err)
//         return 'error sending email'
//     }

// }