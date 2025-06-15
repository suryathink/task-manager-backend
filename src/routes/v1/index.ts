import { Express } from "express";
import auth from "./auth"
import users from "./users"

export const v1Apis = function (app: Express) {
  app.use("/auth", auth);
  app.use("/users", users);
};
