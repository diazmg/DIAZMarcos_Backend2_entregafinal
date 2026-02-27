import crypto from "crypto";
import { sendResetMail } from "../config/mailer.js";
import { isValidPassword, createHash } from "../utils/hash.js";

const sha256 = (v) => crypto.createHash("sha256").update(v).digest("hex");

export default class SessionsService {
    constructor(usersRepository) {
        this.usersRepo = usersRepository;
    }

    requestReset = async (email) => {
        const user = await this.usersRepo.getByEmail(email);
        if (!user) return;

        const token = crypto.randomBytes(32).toString("hex");
        const tokenHash = sha256(token);
        const expires = new Date(Date.now() + 60 * 60 * 1000);

        await this.usersRepo.updateById(user._id, {
            resetPasswordToken: tokenHash,
            resetPasswordExpires: expires,
        });

        await sendResetMail({ to: email, token, email });
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