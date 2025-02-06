import express from "express";
import { config } from "dotenv";
import { tokenRouter } from "./routes/token";
import { authorizationRouter } from "./routes/authorization";
import { logger } from "./utils/logger";

config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json({ limit: "10mb" }));

// Routes
app.use("/api/oauth", authorizationRouter);
app.use("/api/oauth", tokenRouter);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error("Unexpected error occurred", err, {
    path: req.path,
    method: req.method,
  });

  res.status(500).json({
    error: "server_error",
    error_description: "An unexpected error occurred",
  });
});

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
