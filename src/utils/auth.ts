import { SignJWT } from "jose";
import crypto from "crypto";
import { config } from "../config";

const authorizationCodes = new Map<string, { createdAt: number }>();
const refreshTokens = new Map<string, { sub: string; createdAt: number }>();

/**
 * Generates a cryptographically secure random authorization code
 * and stores it with creation timestamp
 * @returns {string} The generated authorization code
 */
export function generateAuthorizationCode(): string {
  const code = crypto.randomBytes(32).toString("hex");
  authorizationCodes.set(code, { createdAt: Date.now() });
  return code;
}

/**
 * Verifies if an authorization code is valid and not expired
 * @param {string} code - The authorization code to verify
 * @returns {boolean} True if code is valid and not expired, false otherwise
 */
export function verifyAuthorizationCode(code: string): boolean {
  const codeData = authorizationCodes.get(code);
  if (!codeData) return false;

  if (Date.now() - codeData.createdAt > config.oauth.authCodeExpiry) {
    authorizationCodes.delete(code);
    return false;
  }

  authorizationCodes.delete(code);
  return true;
}

export function storeRefreshToken(refreshToken: string, sub: string): void {
  refreshTokens.set(refreshToken, {
    sub,
    createdAt: Date.now(),
  });
}

export function verifyRefreshToken(token: string): string | null {
  const tokenData = refreshTokens.get(token);
  if (!tokenData) return null;

  // Check if refresh token is expired (30 days)
  if (Date.now() - tokenData.createdAt > 30 * 24 * 60 * 60 * 1000) {
    refreshTokens.delete(token);
    return null;
  }

  return tokenData.sub;
}

/**
 * Generates a new access token and refresh token pair
 * @returns {Promise<{accessToken: string, refreshToken: string, expiresIn: number}>}
 * @throws {Error} If JWT_SECRET is not configured
 */
export async function generateAccessToken(sub: string = "user123") {
  const secret = new TextEncoder().encode(config.jwt.secret);
  const refreshToken = crypto.randomBytes(32).toString("hex");

  const accessToken = await new SignJWT({ sub })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${config.oauth.tokenExpiry}s`)
    .sign(secret);

  storeRefreshToken(refreshToken, sub);

  return {
    accessToken,
    refreshToken,
    expiresIn: config.oauth.tokenExpiry,
  };
}
