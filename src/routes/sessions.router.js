import { Router } from "express";
import passport from "passport";
import { generateToken } from "../utils/jwt.js";
import UserDTO from "../dto/user.dto.js";
import UsersDAO from "../dao/mongo/users.dao.js";
import UsersRepository from "../repositories/users.repository.js";
import SessionsService from "../services/sessions.service.js";

const router = Router();
const usersRepo = new UsersRepository(new UsersDAO());
const sessionsService = new SessionsService(usersRepo);


router.post("/register",
    passport.authenticate("register", { session: false }),
    (req, res) => {
        res.status(201).send({ status: "success", message: "Usuario registrado" });
    }
);



router.post("/login",
    passport.authenticate("login", { session: false }),
    (req, res) => {
        const token = generateToken(req.user);
        res.cookie("coderCookie", token, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true,
        }).send({
            status: "success",
            message: "Logged in successfully",
            user: new UserDTO(req.user)
        });
    }
);

router.get("/current",
    passport.authenticate("current", { session: false }),
    (req, res) => {
        const safeUser = new UserDTO(req.user);
        res.send({ status: "success", user: safeUser });
    }
);


router.post("/forgot-password", async (req, res) => {
    try {
        const { email } = req.body;
        await sessionsService.requestReset(email);
        return res.render("forgot-password", {
            title: "Recuperar contraseña",
            style: "index.css",
            message: "Si el usuario existe, se envió un email.",
        });
    } catch (e) {
        console.log("Forgot-password error:", e?.message);
        return res.status(500).render("forgot-password", {
            title: "Recuperar contraseña",
            style: "index.css",
            message: "No se pudo enviar el email. Revisá la configuración de correo.",
        });
    }
});

router.post("/reset-password", async (req, res) => {
    try {
        const { email, token, newPassword } = req.body;
        await sessionsService.resetPassword({ email, token, newPassword });
        return res.redirect("/login");
    } catch (e) {
        return res.status(400).render("reset-password", {
            title: "Nueva contraseña",
            style: "index.css",
            email: req.body.email,
            token: req.body.token,
            error: e.message,
        });
    }
});

export default router;
