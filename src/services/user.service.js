import axios from "axios";
import {API_URL} from "../config/backend.config";

class UserService {
    static async getAllUsers() {
        return await axios.get(`${API_URL}/users`);
    }

    static async destroyUser(id) {
        return await axios.delete(`${API_URL}/users/${id}`);
    }

    static async createUser(data) {
        return await axios.post(`${API_URL}/users`, data);
    }

    static async findUserById(id) {
        return await axios.get(`${API_URL}/users/${id}`);
    }

    static async updateUser(id, data) {
        return await axios.put(`${API_URL}/users/${id}`, data);
    }
}

export default UserService