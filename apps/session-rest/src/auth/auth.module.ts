import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule } from "@nestjs/config";

import { UserModule } from "../user/user.module";
import { SessionSerializer } from "./session.serializer";
import { AuthSessionController } from "./auth.session.controller";
import { AuthSocialController } from "./auth.social.controller";
import { FacebookStrategy, GoogleStrategy, LocalStrategy, OneloginStrategy } from "./strategies";
import { AuthService } from "./auth.service";

@Module({
  imports: [UserModule, PassportModule, ConfigModule],
  providers: [FacebookStrategy, GoogleStrategy, LocalStrategy, OneloginStrategy, SessionSerializer, AuthService],
  controllers: [AuthSessionController, AuthSocialController],
  exports: [AuthService],
})
export class AuthModule {}
