import passport from "passport";
import local from "passport-local";
import { UserModel } from "../dao/models/user.model.js";
import { createHash, isValidPassword } from "../utils/hash.js";
import jwt from "passport-jwt";

const LocalStrategy = local.Strategy;
const JwtStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const initializePassport = () => {

    passport.use("register", new LocalStrategy(
        { usernameField: "email", passReqToCallback: true },
        async (req, email, password, done) => {
            try {
                const exists = await UserModel.findOne({ email });
                if (exists) return done(null, false);

                const newCart = await CartModel.create({ products: [] });
                const user = await UserModel.create({
                    ...req.body,
                    password: createHash(password),
                    cart: newCart._id
                });
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    ));

    passport.use("login", new LocalStrategy(
        { usernameField: "email" },
        async (email, password, done) => {
            try {
                const user = await UserModel.findOne({ email });
                if (!user || !isValidPassword(user, password)) return done(null, false);
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    ));

    passport.use("jwt", new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "jwtSecret"
        },
        async (jwt_payload, done) => {
            try {
                return done(null, jwt_payload.user);
            } catch (error) {
                return done(error);
            }
        }
    ));
};

export default initializePassport;
