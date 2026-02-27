import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

export const sendResetMail = async ({ to, resetUrl }) => {
    const html = `
    <h2>Restablecer contraseña</h2>
    <p>El enlace expira en 1 hora.</p>
    <a href="${resetUrl}">
      Restablecer contraseña
    </a>
  `;

    await transporter.sendMail({
        from: process.env.MAIL_FROM,
        to,
        subject: "Recuperación de contraseña",
        html,
    });
};