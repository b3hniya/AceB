import fs from "fs";
import path from "path";
import { Router } from "express";

const toKebabCase = (str: string) => str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

/**
 * Dynamically loads controllers from a given directory and attaches them to a router.
 * @param baseDir The base directory to start loading controllers from.
 * @returns A router with all the controllers attached.
 * @example
 * const router = dynamicRouter(path.join(__dirname, "controllers/"));
 * app.use("/api", router);
 */
const MODE = process.env.MODE || "DEV";

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

        const baseRoute = `/${relativePath ? relativePath + "/" : ""}${toKebabCase(item.replace("Controller.ts", ""))}`;

        if (controller.put) router.put(baseRoute, controller.put);
        if (controller.get) router.get(baseRoute, controller.get);
        if (controller.post) router.post(baseRoute, controller.post);
        if (controller.patch) router.patch(baseRoute, controller.patch);
        if (controller.delete) router.delete(baseRoute, controller.delete);

        if (MODE === "DEV") {
          const methods: string[] = [];

          if (controller.put) methods.push("PUT");
          if (controller.get) methods.push("GET");
          if (controller.post) methods.push("POST");
          if (controller.patch) methods.push("PATCH");
          if (controller.delete) methods.push("DELETE");

          // Log the baseRoute for debugging
          if (methods.length > 0) {
            console.log(`baseRoute: ${baseRoute} with following methods: ${methods.join(", ")}`);
          } else {
            console.log(`No methods found for baseRoute: ${baseRoute}`);
          }
        }
      }
    });
  };

  loadControllers(baseDir);
  return router;
};

export default dynamicRouter;
