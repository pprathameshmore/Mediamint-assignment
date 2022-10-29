import { User } from "../models/user";

class UserService {
  async getUsers() {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      throw error;
    }
  }
}

export default new UserService();
