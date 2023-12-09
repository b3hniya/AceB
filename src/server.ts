import dotenv from "dotenv";
import createApp from "./app";
import validateEnv from "./validations/validateEnv";

dotenv.config();
validateEnv();

const app = createApp();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
