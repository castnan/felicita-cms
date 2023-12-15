import {
  Injectable
} from '@nestjs/common';
import {
  PrismaService
} from 'src/database/PrismaService'; 
import {
  CreateClotheDto
} from './dto/create-clothe.dto';
import {
  UpdateClotheDto
} from './dto/update-clothe.dto';

@Injectable()
export class ClothesService {
  constructor(private readonly prisma: PrismaService) {} 
  async create(data: CreateClotheDto) {
    const book = await this.prisma.clothing.create({
      data,
    });
    return


  }

  async findAll() {
    const clothes = await this.prisma.clothing.findMany({
      orderBy: {
        dateCreated: 'desc', // Ordena por tamanho em ordem ascendente
      },
      include: {
        size: true, // Inclui o relacionamento com a tabela Size
      },
    });
    const transformedClothes = clothes.map(cloth => ({
      id: cloth.id,
      code: cloth.code,
      sizeName: cloth.size.name,
      clothDescription: cloth.description,
      dateCreated: cloth.dateCreated

    }));

    return transformedClothes;
  }

  async findOne(id: number) {
    const clothe = await this.prisma.clothing.findUnique({
      where: {
        id
      },
    });

    return clothe;
  }

  async update(id: number, updateClotheDto: UpdateClotheDto) {
    const updatedClothe = await this.prisma.clothing.update({
      where: {
        id
      },
      data: updateClotheDto,
    });

    return updatedClothe;
  }

  async remove(id: number) {
    const deletedClothe = await this.prisma.clothing.delete({
      where: {
        id
      },
    });

    return deletedClothe;
  }
}
