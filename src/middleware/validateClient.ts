import { RequestHandler } from "express";
import { config } from "../config";

export const validateClient: RequestHandler = (req, res, next) => {
  const clientId = req.query.client_id || req.body.client_id;
  const redirectUri = req.query.redirect_uri || req.body.redirect_uri;

  if (clientId !== config.oauth.clientId || redirectUri !== config.oauth.redirectUri) {
    res.status(401).json({
      error: "invalid_client",
      error_description: "Invalid client credentials",
    });
    return;
  }
  return next();
};
