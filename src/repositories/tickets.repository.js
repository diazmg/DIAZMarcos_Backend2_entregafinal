export default class TicketsRepository {
    constructor(dao) {
        this.dao = dao;
    }

    create = async (data) => {
        return await this.dao.create(data);
    };
}