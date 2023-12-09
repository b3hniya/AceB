import fs from "fs";
import path from "path";
import { Router } from "express";

const toKebabCase = (str: string) =>
  str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

const dynamicRouter = (baseDir: string): Router => {
  const router = Router();

  const loadControllers = (dir: string) => {
    const relativePath = path.relative(baseDir, dir).replace(/\\/g, "/"); // Replace backslashes

    fs.readdirSync(dir).forEach((item) => {
      const fullPath = path.join(dir, item);

      if (fs.statSync(fullPath).isDirectory()) {
        loadControllers(fullPath);
      } else if (item.endsWith("Controller.ts")) {
        const controller = require(fullPath);

        const baseRoute = `/${
          relativePath ? relativePath + "/" : ""
        }${toKebabCase(item.replace("Controller.ts", ""))}`;
        console.log(`baseRoute: ${baseRoute}`); // Log the baseRoute for debugging

        if (controller.put) router.put(baseRoute, controller.put);
        if (controller.get) router.get(baseRoute, controller.get);
        if (controller.post) router.post(baseRoute, controller.post);
        if (controller.patch) router.patch(baseRoute, controller.patch);
        if (controller.delete) router.delete(baseRoute, controller.delete);
      }
    });
  };

  loadControllers(baseDir);
  return router;
};

export default dynamicRouter;
