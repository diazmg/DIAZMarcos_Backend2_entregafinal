import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE, // gmail
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

export const sendResetMail = async ({ to, token, email }) => {
    const resetUrl = `${process.env.BASE_URL}/reset-password?token=${token}&email=${encodeURIComponent(email)}`;

    const html = `
    <div style="font-family: Arial, sans-serif;">
      <h2>Restablecer contraseña</h2>
      <p>Hacé click en el botón para crear una nueva contraseña.</p>
      <p><strong>Este enlace expira en 1 hora.</strong></p>
      <a href="${resetUrl}" 
         style="display:inline-block;padding:10px 15px;background:#111;color:#fff;text-decoration:none;border-radius:5px;">
        Restablecer contraseña
      </a>
      <p style="margin-top:20px;font-size:12px;color:#666;">
        Si no solicitaste este cambio, ignorá este correo.
      </p>
    </div>
  `;

    await transporter.sendMail({
        from: process.env.MAIL_FROM,
        to,
        subject: "Recuperación de contraseña",
        html,
    });
};