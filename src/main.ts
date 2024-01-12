import { join } from "node:path";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { Logger } from "@nestjs/common";
import { AppModule } from "./app.module.js";

const dirname = new URL(import.meta.url + "/..").pathname;
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useLogger(app.get(Logger));
  app.useStaticAssets(join(dirname, "..", "public"));
  await app.listen(3000);
}
bootstrap();
