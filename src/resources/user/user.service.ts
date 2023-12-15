import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { paginate } from 'nestjs-typeorm-paginate';
import { defaultPassword } from './user.constants';
import { PaginationOptionsDto } from '@/common/pagination/pagination.dto';
import { PrismaService } from 'src/database/PrismaService'; 


@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {} 

  async findAll(options: PaginationOptionsDto) {
    const users = this.prisma.user.findMany({
      orderBy: {
        dateCreated: 'desc',
      },
      });

      const transformedUsers = (await users).map(users => ({
        id: users.id,
        username: users.username,
        isActive: users.isActive,
        dateCreated: users.dateCreated
      }));
      return transformedUsers
  }

  async findOneById(id: number) {
    return await this.prisma.user.findUnique({
      where: { id  },
    });
  }

 async findOneByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findOneByLogin(username: string) {
 
      const user = await this.prisma.user.findUnique({
        where: { username },
      });
  
      if (user == null) {
       throw new BadRequestException('Usuário não encontrado.');
      }
    
      return user;
  }
  

  async createUser(createUserDto: CreateUserDto) {
    const { fullName, email,username,userRole,password } = createUserDto;
    const existingUserWithLogin = await this.prisma.user.findUnique({
      where: { username },
    });
    if (existingUserWithLogin)
      throw new BadRequestException('Login já cadastrado.');

    const existingUserWithEmail = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existingUserWithEmail)
      throw new BadRequestException('E-mail já cadastrado.');

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await this.prisma.user.create({
      data: {
        fullName,
        email,
        username,
        userRole,
        hashedPassword,
        isActive: true,
        isFirstAccess: true,
      },
    });

    return newUser; 
  
  }


  async changeUserPassword(user_id: number, password: string) {
    const user = await this.findOneById(user_id);

    if (!user) throw new BadRequestException('Usuário não encontrado.');

    if (await bcrypt.compare(password, user.hashedPassword))
      throw new BadRequestException('Nova senha deve ser diferente da atual.');


    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        hashedPassword: await bcrypt.hash(password, 12),
        isFirstAccess: false,
      },
    });
    
  }
  async resetUserPassword(user_id: number) {
    const user = await this.findOneById(user_id);

    if (!user) throw new BadRequestException('Usuário não encontrado.');

    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        hashedPassword: await bcrypt.hash(defaultPassword(), 12),
        isFirstAccess: false,
      },
    });
  
  }
}
