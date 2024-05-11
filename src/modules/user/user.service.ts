import { BadRequestException, Injectable } from '@nestjs/common';
import { users } from '../../moks';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from './dto';
import { AppError } from '../../common/constants/errors';


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


  //find user by email
  async findUserByEmail(email: string) {
    return this.userRepository.findOne(
      {
        where: {
          email: email,
        },
      },
    );

  }

  //create new user
  async createUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
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

  //remove password to respond
  async publicUser(email: string) {
    return this.userRepository.findOne(
      {
        where: { email: email },
        attributes: { exclude: ['password'] },
      },
    );
  }

  //remove password to respond end---


}
