import express, { Request, Response } from "express";

const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());
import "./src/db/ConnectDb";
import UserRoute from "./src/routes/userRoutes";

app.use("/api/users", UserRoute);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
