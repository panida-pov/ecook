import express from "express";
import "dotenv/config";
import { recipesRouter } from "./routes/recipes";
import { myDataSource } from "./data-source";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { CustomError } from "./utils/CustomError";
import { Request, Response, NextFunction } from "express-serve-static-core";
import { labelsRouter } from "./routes/labels";
import cors from "cors";

// establish database connection
myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

// create and setup express app
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/recipes", recipesRouter);
app.use("/api/labels", labelsRouter);
app.all("*", (req: Request, res: Response, next: NextFunction) =>
  next(new CustomError(`Cannot find ${req.url} on the server!`, 404))
);
app.use(globalErrorHandler);

const port = parseInt(process.env.PORT || "8000");
const ip = process.env.HOST_NAME || "127.0.0.1";
app.listen(port, ip, () => {
  console.log(`Server is Fire at https://${ip}:${port}`);
});
