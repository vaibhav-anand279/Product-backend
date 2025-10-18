import express from "express";
import dotenv from "dotenv";
import routes from "./routes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/", routes);

if (process.env.NODE_ENV !== "test") {
  app.listen(process.env.PORT, () =>
    console.log(`🚀 Server running on port ${process.env.PORT}`)
  );
}

export default app;
