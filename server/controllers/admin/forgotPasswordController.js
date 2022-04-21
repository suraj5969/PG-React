'use strict';

const crypto = require('crypto');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const eventData = require('../../data/events/admin');

dotenv.config();

const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        const forgotPassword = await eventData.forgotPassword(email);
        // console.log(forgotPassword);
        if (forgotPassword.length < 1) {
            res.send({
                status: 401,
                message: 'No User found with this email!'
            });
        }
        else {
            const token = crypto.randomBytes(32).toString('hex');
            const insertToken = await eventData.insertToken(email, token);
            // console.log('token : ', token)
            // console.log('insert token : ' + insertToken)
            if (insertToken > 0) {
                const transporter = nodemailer.createTransport({
                    host: process.env.MAIL_HOST,
                    // service: process.env.MAIL_SERVICE,
                    port: 25,
                    secure: false,
                    auth: {
                        user: process.env.MAIL_USER,
                        pass: process.env.MAIL_PASSWORD,
                    },
                    tls: {
                        rejectUnauthorized: true
                    },
                })

                transporter.verify(function (error, success) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(`ready to send email for forgot password to ${email}`);
                    }
                });

                transporter.sendMail({
                    from: process.env.MAIL_USER,
                    to: email,
                    subject: "Password Reset",
                    text: 'Hi,we are from LexisNexis',
                    html: `<p>Your link is : 
                            <a href='${process.env.FRONTEND_URL}/reset-password/${token}'>
                            ${process.env.FRONTEND_URL}/reset-password/${token}</a></p>
                            <p>Link will be expired after 60 minutes.</p>
                            <p> <b> **Please don't share this link with anyone.** <b> </p>`
                }, function (error, info) {
                    if (error) {
                        console.log(error, 'for sending mail to forgot password');
                        return res.send({
                            status: 422,
                            message: 'Some Error occured. Unable to send Email'
                        })
                    } else {
                        res.send({
                            status: 200,
                            message: 'Password reset link has been sent to your Email Id.'
                        });
                    }
                })
            }
            else {
                res.send({
                    status: 422,
                    message: 'Some error Occured Occured. Please try again later!'
                })
                console.log('Unable to set password expiry in DB')
            }
        }
    } catch (error) {
        res.send({
            status: 422,
            message: 'Something went wrong ,Please try again later!'
        });
    }
}

module.exports = {
    forgotPassword
}