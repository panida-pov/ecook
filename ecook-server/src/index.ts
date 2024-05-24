import express from "express";
import "dotenv/config";
import { recipesRouter } from "./routes/recipes";
import { myDataSource } from "./data-source";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { CustomError } from "./utils/CustomError";
import { Request, Response, NextFunction } from "express-serve-static-core";

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

app.use("/api/recipes", recipesRouter);
app.all("*", (req: Request, res: Response, next: NextFunction) =>
  next(new CustomError(`Cannot find ${req.url} on the server!`, 404))
);
app.use(globalErrorHandler);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
