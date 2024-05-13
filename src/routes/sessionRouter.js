import { Router } from "express";
import passport from "passport";
import * as sessionController from "../controllers/sessionController.js";
const sessionRouter = Router();

sessionRouter.get(
  "/login",
  passport.authenticate("login"),
  sessionController.login
);
sessionRouter.post(
  "/register",
  passport.authenticate("register"),
  sessionController.register
);
sessionRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);
sessionRouter.get(
  "/githubSession",
  passport.authenticate("github"),
  sessionController.sessionGithub
);
sessionRouter.get("/current", passport.authenticate("jwt"), (req, res) => {
  res.status(200).send("Usuario logueado");
});
sessionRouter.get("/logout", sessionController.logout);
sessionRouter.get(
  "/testJWT",
  passport.authenticate("jwt", { session: false }),
  sessionController.testJWT
);
export default sessionRouter;
