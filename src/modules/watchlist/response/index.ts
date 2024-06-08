import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAssetsResponse {
  @ApiProperty() //это декоратор из модуля @nestjs/swagger, который используется для добавления метаданных к свойствам класса. Эти метаданные затем используются для автоматической генерации OpenAPI (Swagger) документации вашего API.
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  assetId: string;
}

export class GetUserAssetsResponse {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  assetId: string;

  @ApiProperty()
  @IsString()
  createdAt: string;

  @ApiProperty()
  @IsString()
  updatedAt: string;

  @ApiProperty()
  @IsNumber()
  userId: number;
}
