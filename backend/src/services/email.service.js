import apiInstance from "../config/brevo.js";
import resetPasswordTemplate from "../templates/reset-password.template.js";

const sendEmail = async ({
    to,
    subject,
    htmlContent,
}) => {

    const email = {

        sender: {
            name: process.env.MAIL_FROM_NAME,
            email: process.env.MAIL_FROM_EMAIL,
        },

        to: [
            {
                email: to,
            },
        ],

        subject,

        htmlContent,
    };

    const response = await apiInstance.sendTransacEmail(email);

    return response;

};

import verificationTemplate from "../templates/verification.template.js";

const sendVerificationEmail = async ({
    name,
    email,
    verificationUrl,
}) => {

    return await sendEmail({
        to: email,
        subject: "Verify your email",
        htmlContent: verificationTemplate({
            name,
            verificationUrl,
        }),
    });

};

const sendResetPasswordEmail = async ({
    name,
    email,
    resetPasswordUrl,
}) => {

    return await sendEmail({
        to: email,
        subject: "Reset your password",
        htmlContent: resetPasswordTemplate({
            name,
            resetPasswordUrl,
        }),
    });
};


export default {
    sendEmail,
    sendVerificationEmail,
    sendResetPasswordEmail
};