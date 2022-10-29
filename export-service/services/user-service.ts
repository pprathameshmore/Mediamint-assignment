import axios from "axios";
const { Parser } = require("json2csv");
import { User } from "../models/user";

class UserService {
  async get() {
    const response = await axios.get(process.env.EXTERNAL_SERVICE!);
    return response.data.data;
  }

  async import() {
    const users = await this.get();
    const insertedUsers = await User.insertMany(users);
    return insertedUsers;
  }

  async exportCSV() {
    const users = await User.find();
    const fields = ["name", "email", "phone", "website", "gender", "status"];
    const opts = { fields };
    const parser = new Parser(opts);
    const csv = parser.parse(users);
    return csv;
  }
}

export default new UserService();
