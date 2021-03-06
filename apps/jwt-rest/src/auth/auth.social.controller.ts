import { Controller, Get, UseGuards } from "@nestjs/common";

import { FacebookGuard, GoogleGuard } from "../common/guards";
import { UserEntity } from "../user/user.entity";
import { AuthService } from "./auth.service";
import { Public, User } from "../common/decorators";

@Public()
@Controller("/auth")
export class AuthSocialController {
  constructor(private readonly authService: AuthService) {}

  @Get("/google")
  @UseGuards(GoogleGuard)
  public googleLogin(): void {
    // initiates the Google OAuth2 login flow
  }

  @Get("/google/callback")
  @UseGuards(GoogleGuard)
  public async googleLoginCallback(@User() userEntity: UserEntity): Promise<string> {
    const auth = await this.authService.loginUser(userEntity);
    return `
      <html lang="en">
      	<script>
					function handleAuth() {
            window.opener.postMessage(${JSON.stringify(auth)});
            window.close();
					}
				</script>
        <body onload="handleAuth()" />
      </html>
    `;
  }

  @Get("/facebook")
  @UseGuards(FacebookGuard)
  public facebookLogin(): void {
    // initiates the Google OAuth2 login flow
  }

  @Get("/facebook/callback")
  @UseGuards(FacebookGuard)
  public async facebookLoginCallback(@User() userEntity: UserEntity): Promise<string> {
    const auth = await this.authService.loginUser(userEntity);
    return `
      <html lang="en">
      	<script>
					function handleAuth() {
            window.opener.postMessage(${JSON.stringify(auth)});
            window.close();
					}
				</script>
        <body onload="handleAuth()" />
      </html>
    `;
  }
}
