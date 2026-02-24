import nodemailer from "nodemailer";

const createTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST || "smtp.gmail.com",
        port: parseInt(process.env.EMAIL_PORT) || 587,
        secure: false, // true for port 465
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
};

/**
 * Send an account verification email with a tokenized link.
 */
export const sendVerificationEmail = async (email, token) => {
    const transporter = createTransporter();
    const verifyUrl = `${process.env.CLIENT_URL}/verify-email/${token}`;

    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "📚 Verify Your Library Account",
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #2c3e50;">Welcome to the Library Management System!</h2>
          <p>Please verify your email address by clicking the button below. This link expires in <strong>24 hours</strong>.</p>
          <a href="${verifyUrl}" 
             style="display:inline-block; padding:12px 24px; background:#3498db; color:#fff; text-decoration:none; border-radius:5px; margin:20px 0;">
            Verify Email
          </a>
          <p>Or copy and paste this link into your browser:</p>
          <p style="word-break:break-all; color:#3498db;">${verifyUrl}</p>
          <hr/>
          <p style="color:#999; font-size:12px;">If you did not create an account, you can safely ignore this email.</p>
        </div>
      `,
    });
};

/**
 * Send a password reset email with a tokenized link.
 */
export const sendPasswordResetEmail = async (email, token) => {
    const transporter = createTransporter();
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${token}`;

    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "🔐 Reset Your Library Password",
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #2c3e50;">Password Reset Request</h2>
          <p>Click the button below to reset your password. This link expires in <strong>1 hour</strong>.</p>
          <a href="${resetUrl}" 
             style="display:inline-block; padding:12px 24px; background:#e74c3c; color:#fff; text-decoration:none; border-radius:5px; margin:20px 0;">
            Reset Password
          </a>
          <p>Or copy and paste this link into your browser:</p>
          <p style="word-break:break-all; color:#e74c3c;">${resetUrl}</p>
          <hr/>
          <p style="color:#999; font-size:12px;">If you did not request a password reset, please ignore this email. Your password will remain unchanged.</p>
        </div>
      `,
    });
};
