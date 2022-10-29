import { User } from "../models/user";

class UserService {
  async update(id: string, user: any) {
    try {
      const updatedUser = await User.findOneAndUpdate({ id: id }, user, { new: true });
      if (!updatedUser) {
        return null;
      }
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }
}

export default new UserService();
