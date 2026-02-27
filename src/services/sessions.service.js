import crypto from "crypto";
import { sendResetMail } from "../config/mailer.js";
import { isValidPassword, createHash } from "../utils/hash.js";

const sha256 = (v) => crypto.createHash("sha256").update(v).digest("hex");

export default class SessionsService {
    constructor(usersRepository) {
        this.usersRepo = usersRepository;
    }

    requestReset = async (email, baseUrl) => {
        const user = await this.usersRepo.getByEmail(email);
        if (!user) return; // no revelar existencia

        const token = crypto.randomBytes(32).toString("hex");
        const tokenHash = sha256(token);
        const expires = new Date(Date.now() + 60 * 60 * 1000);

        await this.usersRepo.updateById(user._id, {
            resetPasswordToken: tokenHash,
            resetPasswordExpires: expires,
        });

        const resetUrl = `${baseUrl}/api/sessions/reset-password?token=${token}&email=${encodeURIComponent(email)}`;
        await sendResetMail({ to: email, resetUrl });
    };

    resetPassword = async ({ email, token, newPassword }) => {
        const user = await this.usersRepo.getByEmail(email);
        if (!user) throw new Error("Invalid token");

        const tokenHash = sha256(token);
        if (
            !user.resetPasswordToken ||
            !user.resetPasswordExpires ||
            user.resetPasswordToken !== tokenHash ||
            user.resetPasswordExpires < new Date()
        ) {
            throw new Error("Invalid or expired token");
        }

        // evitar misma contraseña
        if (isValidPassword(user, newPassword)) {
            throw new Error("New password must be different");
        }

        await this.usersRepo.updateById(user._id, {
            password: createHash(newPassword),
            resetPasswordToken: null,
            resetPasswordExpires: null,
        });

        return true;
    };
}