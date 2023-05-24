import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AtGuard, RtGuard } from "./guards";

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("auth/signup")
  async signup(@Body() body) {
    return this.authService.signup(body);
  }

  @Post("auth/signin")
  async signin(@Body() body) {
    return this.authService.signin(body);
  }

  @Post("auth/logout")
  logout(@Body() body) {
    return this.authService.logout(body);
  }

  @UseGuards(RtGuard)
  @Post("auth/refresh")
  refreshTokens(@Request() req) {
    return this.authService.refreshTokens(req.user);
  }
  @UseGuards(AtGuard)
  @Get("auth/user")
  getProfile(@Request() req) {
    return this.authService.getUser(req.user.userId);
  }
}
