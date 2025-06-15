import { Express } from "express";
import auth from "./auth"
import users from "./users"
import tasks from "./tasks"

export const v1Apis = function (app: Express) {
  app.use("/auth", auth);
  app.use("/users", users);
  app.use("/tasks", tasks);
};
