import {
  Injectable,
  ForbiddenException,
  UnauthorizedException
} from '@nestjs/common';

import { User } from 'src/db/users/entities/user.entity';
import { UsersService } from 'src/db/users/users.service';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { SignUpDto } from './dto/signup.dto';
import { RefreshDto } from './dto/refresh.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  private async validateUser(
    login: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.usersService.findOne();
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  private singTokens(payload: any) {
    return {
      accessToken: this.jwtService.sign(
        { payload },
        { secret: process.env.JWT_SECRET_KEY },
      ),
      refreshToken: this.jwtService.sign(
        { payload },
        { secret: process.env.JWT_SECRET_REFRESH_KEY },
      ),
    };
  }

  async verifyAccessToken() {
    return this.jwtService.verifyAsync({
      secret: process.env.JWT_SECRET_KEY,
    });
  }
  async verifyRefreshToken() {
    return this.jwtService.verifyAsync( {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
    });
  }

  //METHODS
  async signUp(signUpDto: SignUpDto): Promise<any> {
    await this.usersService.create(signUpDto);
  }

  async refresh(refreshDto: RefreshDto) {
    if (!refreshDto.refreshToken) {
      throw new UnauthorizedException();
    }
    try {
      const data = await this.verifyRefreshToken(refreshDto.refreshToken);
      return this.singTokens(data.payload);
    } catch (err) {
      throw new ForbiddenException();
    }
  }

  async login(loginDto: LoginDto) {
    const { login, password } = loginDto;
    const user = await this.validateUser(login, password);
    if (!user) {
      throw new ForbiddenException();
    } else {
      const payload = { login: user.login, userId: user.id };
      return this.singTokens(payload);
    }
  }
}
