import express from "express";
import { checkHealth } from "./controllers/health.controller";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/health", checkHealth);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
