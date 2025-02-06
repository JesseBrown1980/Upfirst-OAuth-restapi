import { RequestHandler } from "express";

export const validateContentType =
  (type: string): RequestHandler =>
  (req, res, next) => {
    if (req.headers["content-type"] !== type) {
      res.status(400).json({
        error: "invalid_request",
        error_description: `Content-Type must be ${type}`,
      });
      return;
    }
    next();
  };
