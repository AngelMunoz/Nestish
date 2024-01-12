import { Logger, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AuthController } from "./auth/auth.controller";

@Module({
  imports: [],
  controllers: [AppController, AuthController],
  providers: [Logger],
})
export class AppModule {}
