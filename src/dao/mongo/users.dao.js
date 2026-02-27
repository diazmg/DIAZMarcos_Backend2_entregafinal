import { UserModel } from "../models/user.model.js";

export default class UsersDAO {
    getByEmail = (email) => UserModel.findOne({ email });
    updateById = (uid, data) => UserModel.updateOne({ _id: uid }, data);
}