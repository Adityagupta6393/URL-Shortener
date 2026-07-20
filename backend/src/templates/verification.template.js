const verificationTemplate = ({
    name,
    verificationUrl,
}) => {

    return `
        <h2>Hello ${name},</h2>

        <p>
            Welcome to URL Shortener.
        </p>

        <p>
            Please verify your email by clicking the button below.
        </p>

        <a
            href="${verificationUrl}"
            style="
                display:inline-block;
                padding:12px 20px;
                background:#2563eb;
                color:white;
                text-decoration:none;
                border-radius:6px;
            "
        >
            Verify Email
        </a>

        <p>
            This link expires in 24 hours.
        </p>
    `;
};

export default verificationTemplate;