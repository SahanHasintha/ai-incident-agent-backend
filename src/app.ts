import express from "express";
import { checkHealth } from "./modules/health/health.controller";
import incidentRouter from "./modules/incident/incident.route";
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/incident', incidentRouter);
app.get("/health", checkHealth);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
