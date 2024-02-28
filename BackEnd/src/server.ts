import express, { NextFunction, Request, Response, json } from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(json());

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.json({ message: error.toString() });
  console.log(error);
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.json({ message: error.toString() });
  console.log(error);
});

const port: number | string = process.env.PORT || 3110;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
