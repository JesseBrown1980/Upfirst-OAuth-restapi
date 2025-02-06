import { Router, Request, Response, RequestHandler } from "express";
import { generateAuthorizationCode } from "../utils/auth";
import { validateClient } from "../middleware/validateClient";
import { validateAuthorizationRequest } from "../middleware/validateRequest";
import { validate } from "../middleware/validateRequest";

const router = Router();

interface AuthQuery {
  response_type?: string;
  client_id?: string;
  redirect_uri?: string;
  state?: string;
}

router.get("/authorize", validateAuthorizationRequest, validate, validateClient, ((
  req: Request<{}, {}, {}, AuthQuery>,
  res: Response
) => {
  const { redirect_uri, state } = req.query;
  const code = generateAuthorizationCode();

  const redirectUrl = new URL(redirect_uri as string);
  redirectUrl.searchParams.append("code", code);

  if (state) {
    redirectUrl.searchParams.append("state", state as string);
  }

  res.setHeader("Location", redirectUrl.toString());
  res.status(302).end();
}) as RequestHandler);

export const authorizationRouter = router;
