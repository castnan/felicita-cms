import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesGuard } from '@/resources/auth/guards/roles.guard';
import { Roles } from '@/common/decorators/role.decorator';
import { Role } from '@/common/enums/role.enum';
import { Request } from 'express';
import { ChangeUserPasswordDto } from './dto/change-user-password.dto';
import { PaginationOptionsDto } from '@/common/pagination/pagination.dto';
import { PaginationPipe } from '@/common/pipes/pagination.pipe';

@ApiTags('User')
@Controller('users')
@ApiBearerAuth()
//@UseGuards(RolesGuard)
//@Roles(Role.ADMIN)
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Creates a new user.
   */
  @Post('/create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  /**
   * Changes a user password.
   */
  @Patch('/password')
  async changeUserPassword(
    @Req() req: Request,
    @Body() changeUserPassword: ChangeUserPasswordDto,
  ) {
    const { user_id } = req.user as { user_id: number };
    const { user_password } = changeUserPassword;
    //return this.userService.changeUserPassword(user_id, user_password);
  }

  /**
   * Resets a given user's password.
   */
  @Patch(':user_id/reset/password')
  async resetUserPassword(@Param('user_id') user_id: string) {
   // return this.userService.resetUserPassword(+user_id);
  }

  /**
   * Gets a user by id.
   */
  @Get(':user_id')
  async findOneById(@Param('user_id') user_id: string) {
   return this.userService.findOneById(+user_id);
  }

  /**
   * Gets all users.
   */
  @Get()
  async findAll(@Query(PaginationPipe) queryPagination: PaginationOptionsDto) {
    return this.userService.findAll(queryPagination);
  }
}
