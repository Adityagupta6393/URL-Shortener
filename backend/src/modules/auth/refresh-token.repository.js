import RefreshToken from "./refresh-token.model.js";

class RefreshTokenRepository {

    async create(data) {
        return await RefreshToken.create(data);
    }

    async findByUserId(userId) {
        return await RefreshToken.find({ userId });
    }

    async deleteById(id) {
        return await RefreshToken.findByIdAndDelete(id);
    }

    async deleteAllByUser(userId) {
        return await RefreshToken.deleteMany({ userId });
    }

    async updateToken(id, data) {
        return await RefreshToken.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );
    }
}

export default new RefreshTokenRepository();