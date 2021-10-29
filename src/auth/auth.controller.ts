import { Post, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { User } from "../users/models/user";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guard/local-auth.guard";


export class AuthController{
  constructor(private readonly authService: AuthService){}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: Request): {access_token: string}{
    return this.authService.login(req.user as User)
  }
}