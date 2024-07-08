import dotenv from "dotenv";
import createApp from "./app";
import validateEnv from "./validations/validateEnv";
import logger from "./configs/logger";

dotenv.config();
validateEnv();

const app = await createApp();
const PORT = process.env.PORT || 3000;

process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception:", error);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
