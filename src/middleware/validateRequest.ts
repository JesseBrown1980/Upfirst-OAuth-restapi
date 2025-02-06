import { body, query, ValidationChain } from "express-validator";
import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { logger } from "../utils/logger";

export const validateAuthorizationRequest: ValidationChain[] = [
  query("response_type").trim().equals("code").withMessage("response_type must be 'code'"),
  query("client_id").trim().equals("upfirst").withMessage("client_id must be 'upfirst'"),
  query("redirect_uri")
    .trim()
    .equals("http://localhost:8081/process")
    .withMessage("redirect_uri must be 'http://localhost:8081/process'"),
  query("state").optional().isString().withMessage("state must be a string if provided"),
];

export const validateTokenRequest: ValidationChain[] = [
  body("grant_type").equals("authorization_code").withMessage("grant_type must be 'authorization_code'"),
  body("code").notEmpty().withMessage("code is required"),
  body("client_id").equals("upfirst").withMessage("client_id must be 'upfirst'"),
  body("redirect_uri")
    .equals("http://localhost:8081/process")
    .withMessage("redirect_uri must be 'http://localhost:8081/process'"),
];

export const validate: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);

  logger.debug("Validating request", {
    query: req.query,
    validationErrors: errors.array(),
  });

  if (!errors.isEmpty()) {
    res.status(400).json({
      error: "invalid_request",
      error_description: errors.array()[0].msg,
    });
    return;
  }
  next();
};
