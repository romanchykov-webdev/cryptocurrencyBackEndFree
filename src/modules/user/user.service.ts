import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO, UpdateUserDTO } from './dto';
import { Watchlist } from '../watchlist/models/watchlist.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
  ) {}

  //hashing to password
  async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  //find user by email
  async findUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email: email } });
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
    return this.userRepository.findOne({
      where: { email: email },
      attributes: { exclude: ['password'] },
      include: {
        model: Watchlist,
        required: false,
      },
    });
  }

  //remove password to respond end---

  //Update user
  async updateUser(email: string, dto: UpdateUserDTO): Promise<UpdateUserDTO> {
    await this.userRepository.update(dto, { where: { email: email } });
    return dto;
  }

  //Update user end------

  //delete user account
  async deleteUser(email: string): Promise<boolean> {
    await this.userRepository.destroy({ where: { email: email } });
    return true;
  }

  //delete user account end---
}
