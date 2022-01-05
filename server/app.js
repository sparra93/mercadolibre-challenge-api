import express, {
  Router, json, urlencoded, static as _static,
} from "express";
import compression from "compression";
import { join } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import configureRoutes from "./routes";

const router = Router();
const app = express();

app.use(logger("dev"));
app.use(compression());
app.use(json());
app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(_static(join(__dirname, "public")));
app.use(configureRoutes(router));
app.listen(process.env.PORT || 9990, () => {
  console.log("Started on port ", process.env.PORT || 9990);
});

export default app;
