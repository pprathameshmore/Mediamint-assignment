import { Request, Response } from "express";
import userService from "../services/user-service";

export const updateUser = async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "User data is required" });
    }
    const { id } = req.params;
    const updatedUser = await userService.update(id, req.body);
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
