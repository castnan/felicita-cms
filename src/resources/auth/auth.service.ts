import { Injectable, UnauthorizedException, Logger, BadRequestException, NotFoundException } from '@nestjs/common';
import { UserService } from '@/resources/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { Role } from '@/common/enums/role.enum';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOneByLogin(username);
    if (user == null) {
      throw new NotFoundException('Usuário não encontrado.');
    }
   else  if (!user.isActive) {
    throw new NotFoundException('Usuário está inativo');
    }
    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
    console.log(isPasswordValid)
    if (!isPasswordValid) {
      throw new NotFoundException('Senha inválida!');
    }

    const { hashedPassword, ...result } = user;
    return result;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.username, loginDto.password);

    const { access_token, refresh_token } = await this.createTokens(user);

    return { access_token, refresh_token };
  }

  async logout(token: string) {

  }

  async refresh(refreshTokenDto: RefreshTokenDto) {
    try {
      const { user_id } = await this.jwtService.verifyAsync(
        refreshTokenDto.refresh_token,
        {
          secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
        },
      );

      const refresh_token = 'a'
      if (refreshTokenDto.refresh_token !== refresh_token) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const user = await this.userService.findOneById(user_id);
      if (!user) {
        this.logger.warn(`User not found for ID: ${user_id}`);
        throw new UnauthorizedException('User not found');
      }

      const { access_token, refresh_token: new_refresh_token } = await this.createTokens(user);
      await this.logout(refreshTokenDto.access_token);

      this.logger.log(`User refreshed token: ${user.username}`);
      return { access_token, refresh_token: new_refresh_token };
    } catch (error) {
      this.logger.error(`Error refreshing token: ${error.message}`);
      throw new UnauthorizedException('Error refreshing token');
    }
  }

  async createTokens(user: {
    id?: number;
    fullName?: string;
    username?: string;
    userRole?: string | null;
    email?: string;
    isActive?: boolean;
    isFirstAccess?: boolean;
    dateCreated?: Date;
    hashedPassword?: string;
    user_id?: any;
    user_name?: any;
    user_role?: any;
    user_first_access?: any;
    user_status?: any;
  }) {
    const access_token = this.jwtService.sign({
      user_id: user.id,
      user_name: user.fullName,
      user_role: user.userRole,
      user_first_access: user.isFirstAccess,
      user_status: user.isActive,
    });

    const refresh_token = this.jwtService.sign(
      {
        user_id: user.id,
      },
      {
        secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRES_IN'),
      },
    );

    return { access_token, refresh_token };
  }
}
