import express from "express";
import dotenv from "dotenv";
import recipesRouter from "./routes/recipes";

//For env File
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use("/api/recipes", recipesRouter);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
