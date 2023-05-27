import express, { Request, Response } from "express";

import { connectDB } from "./config/db";

const app = express();
const port = 8080;
connectDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
