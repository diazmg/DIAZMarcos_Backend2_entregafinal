export default class UsersRepository {
    constructor(dao) { this.dao = dao; }
    getByEmail(email) { return this.dao.getByEmail(email); }
    updateById(uid, data) { return this.dao.updateById(uid, data); }
}