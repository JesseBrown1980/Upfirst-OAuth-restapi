import { Router, RequestHandler } from "express";
import { generateAccessToken, verifyAuthorizationCode, verifyRefreshToken } from "../utils/auth";
import { validateContentType } from "../middleware/validateContentType";
import { validateClient } from "../middleware/validateClient";
import { validateTokenRequest, validate } from "../middleware/validateRequest";
import express from "express";

const router = Router();

interface TokenRequest {
  grant_type: string;
  code: string;
  client_id: string;
  redirect_uri: string;
  refresh_token: string;
}

router.post(
  "/token",
  express.urlencoded({ extended: true }),
  validateContentType("application/x-www-form-urlencoded"),
  validateTokenRequest,
  validate,
  validateClient,
  (async (req, res) => {
    res.setHeader("Content-Type", "application/json;charset=UTF-8");
    const { code } = req.body;

    if (!verifyAuthorizationCode(code)) {
      res.status(400).json({
        error: "invalid_grant",
        error_description: "Invalid or expired authorization code",
      });
      return;
    }

    const tokens = await generateAccessToken();
    res.status(200).json({
      access_token: tokens.accessToken,
      token_type: "bearer",
      expires_in: tokens.expiresIn,
      refresh_token: tokens.refreshToken,
    });
  }) as RequestHandler<{}, {}, TokenRequest>
);

export const tokenRouter = router;
