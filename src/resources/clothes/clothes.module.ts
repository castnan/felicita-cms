import { Module } from "@nestjs/common";
import { ClothesService } from "./clothes.service";
import { ClothesController } from "./clothes.controller";
import { PrismaService } from "../../database/PrismaService";

@Module({
  controllers: [ClothesController],
  providers: [ClothesService,PrismaService],
  exports: [ClothesService],
})
export class ClothesModule {}
