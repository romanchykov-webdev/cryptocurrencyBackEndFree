import { BadRequestException, Injectable } from '@nestjs/common';
import { users } from '../../moks';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from './dto';
import { AppError } from '../../common/errors';


@Injectable()
export class UserService {

  constructor(@InjectModel(User) private readonly userRepository: typeof User) {
  }

//getUsers(){
//  return users;
// }

  //hashing to password
  async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }


  async findUserByEmail(email: string) {
    return this.userRepository.findOne(
      {
        where: {
          email: email,
        },
      },
    );

  }


  async createUser(dto: CreateUserDTO): Promise<CreateUserDTO> {

    //if has user
    const existUser = await this.findUserByEmail(dto.email);
    if (existUser) {
      throw new BadRequestException(AppError.USER_EXIST);
    }
    //if  has user  end

    dto.password = await this.hashPassword(dto.password);

    //ts
    const newUser = {
      firstName: dto.firstName,
      userName: dto.userName,
      email: dto.email,
      password: dto.password,
    };
    //ts

    // await this.userRepository.create(dto);
    await this.userRepository.create(newUser);
    return dto;
  }


}
