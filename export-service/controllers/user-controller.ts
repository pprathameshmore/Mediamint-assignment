import { Request, Response } from "express";
import userService from "../services/user-service";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.import();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const exportCSV = async (req: Request, res: Response) => {
  try {
    const csv = await userService.exportCSV();
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=users.csv");
    res.status(200).send(csv);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
