import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { getUsers, exportCSV } from "./controllers/user-controller";

const app = express();

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Connection failed!", err);
  });

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

app.get("/users", getUsers);

app.get("/export", exportCSV);

app.get("/", (req, res) => {
  return res.status(200).send("Export Service is up and running");
});

app.listen(process.env.PORT, () => {
  console.log(`Export service started at port ${process.env.PORT}`);
});
