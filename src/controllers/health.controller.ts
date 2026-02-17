import { Request, Response } from "express";

export function checkHealth(_req: Request, res: Response): void {
  res.json({
    status: "OK",
    message: "Server is running",
  });
}
