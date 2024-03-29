import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { userDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  signUp(@Body() req: userDto): Promise<{}> {
    return this.authService.signUp(req);
    // return { req };
  }
  @Post('signin')
  signIn(@Body() req: userDto): Promise<{}> {
    return this.authService.signin(req);
  }
}
