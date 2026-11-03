import express from "express";
import fruitRouter from "./routes/fruitRoutes";

const app = express();
const port = 5000;

app.use(express.json());

app.use("/api/v1/fruits", fruitRouter);

app.get("/", (req, res) => {
  res.status(200).send("Welcome to Blox Fruit Card Value API");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
