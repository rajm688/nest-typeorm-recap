import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { userDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private authReporstory: AuthRepository,
    private jwtService: JwtService,
  ) {}
  signUp(req: userDto): Promise<{}> {
    return this.authReporstory.creatingUser(req);
  }
  signin(req: userDto): Promise<{}> {
    return this.authReporstory.finduser(req, this.jwtService); // is it ok to send the service to repo
  }
}
