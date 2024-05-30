import express from "express";

import authControllers from "../controllers/authControllers.js";

import isEmptyBody from "../middlewares/isEmptyBody.js";
import authenticate from "../middlewares/authenticate.js";

import validateBody from "../decorators/validateBody.js";

import {
  authSignupSchema,
  authSigninSchema,
  userSubscriptionSchema,
} from "../schemas/authSchemas.js";
import isValidId from "../middlewares/isValidId.js";
import upload from "../middlewares/upload.js";
import isFilePresent from "../middlewares/isFilePresent.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  isEmptyBody,
  validateBody(authSignupSchema),
  authControllers.signup,
);

authRouter.post(
  "/login",
  isEmptyBody,
  validateBody(authSigninSchema),
  authControllers.signin,
);

authRouter.get("/current", authenticate, authControllers.getCurrent);

authRouter.post("/logout", authenticate, authControllers.signout);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  isFilePresent,
  authControllers.updateAvatar,
);

authRouter.patch(
  "/:id",
  authenticate,
  isValidId,
  isEmptyBody,
  validateBody(userSubscriptionSchema),
  authControllers.updateSubscription,
);

export default authRouter;
