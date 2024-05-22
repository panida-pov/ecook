import express from "express";
import "dotenv/config";
import recipesRouter from "./routes/recipes";
import { myDataSource } from "./data-source";

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

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
