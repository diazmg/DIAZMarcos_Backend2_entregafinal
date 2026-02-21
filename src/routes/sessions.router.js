import { Router } from "express";
import passport from "passport";
import { generateToken } from "../utils/jwt.js";
import UserDTO from "../dto/user.dto.js";

const router = Router();

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
        res.send({ status: "success", token });
    }
);

router.get("/current",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const safeUser = new UserDTO(req.user);
        res.send({ status: "success", user: safeUser });
    }
);

export default router;
