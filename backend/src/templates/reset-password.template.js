const resetPasswordTemplate = ({
    name,
    resetPasswordUrl,
}) => {

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8" />
            <title>Reset Your Password</title>
        </head>

        <body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;">

            <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                style="padding:40px 0;"
            >
                <tr>
                    <td align="center">

                        <table
                            width="600"
                            cellpadding="0"
                            cellspacing="0"
                            style="
                                background:#ffffff;
                                border-radius:8px;
                                padding:40px;
                            "
                        >

                            <tr>
                                <td align="center">
                                    <h2 style="margin:0;color:#333;">
                                        Reset Your Password
                                    </h2>
                                </td>
                            </tr>

                            <tr>
                                <td style="padding-top:25px;color:#555;font-size:16px;">

                                    <p>
                                        Hello <strong>${name}</strong>,
                                    </p>

                                    <p>
                                        We received a request to reset your password.
                                    </p>

                                    <p>
                                        Click the button below to create a new password.
                                    </p>

                                </td>
                            </tr>

                            <tr>
                                <td align="center" style="padding:30px 0;">

                                    <a
                                        href="${resetPasswordUrl}"
                                        style="
                                            background:#2563eb;
                                            color:#ffffff;
                                            text-decoration:none;
                                            padding:14px 28px;
                                            border-radius:6px;
                                            display:inline-block;
                                            font-size:16px;
                                            font-weight:bold;
                                        "
                                    >
                                        Reset Password
                                    </a>

                                </td>
                            </tr>

                            <tr>
                                <td style="color:#666;font-size:15px;">

                                    <p>
                                        If you didn't request a password reset,
                                        you can safely ignore this email.
                                    </p>

                                    <p>
                                        This link will expire in
                                        <strong>1 hour</strong>.
                                    </p>

                                </td>
                            </tr>

                            <tr>
                                <td
                                    style="
                                        padding-top:30px;
                                        border-top:1px solid #eeeeee;
                                        color:#888;
                                        font-size:13px;
                                    "
                                >
                                    © ${new Date().getFullYear()} URL Shortener
                                </td>
                            </tr>

                        </table>

                    </td>
                </tr>
            </table>

        </body>
        </html>
    `;
};

export default resetPasswordTemplate;