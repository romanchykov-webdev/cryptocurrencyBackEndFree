import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO, UpdatePasswordDTO, UpdateUserDTO } from './dto';
import { Watchlist } from '../watchlist/models/watchlist.model';
import { TokenService } from '../token/token.service';
import { AuthUserResponse } from '../auth/response';
import { AppError } from '../../common/constants/errors';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
    private readonly tokenService: TokenService,
  ) {}

  //hashing to password
  async hashPassword(password: string): Promise<string> {
    try {
      return bcrypt.hash(password, 10);
    } catch (error) {
      throw new Error(error);
    }
  }

  //find user by email
  async findUserByEmail(email: string): Promise<User> {
    try {
      return this.userRepository.findOne({
        where: { email: email },
        include: {
          model: Watchlist,
          required: false,
        },
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  //find user by id
  async findUserById(id: number): Promise<User> {
    try {
      return this.userRepository.findOne({
        where: { id },
        include: {
          model: Watchlist,
          required: false,
        },
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  //create new user
  async createUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
    try {
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
    } catch (error) {
      throw new Error(error);
    }
  }

  //
  async publicUser(email: string): Promise<AuthUserResponse> {
    try {
      const user = await this.userRepository.findOne({
        where: { email: email },
        attributes: { exclude: ['password'] },
        include: {
          model: Watchlist,
          required: false,
        },
      });
      const token = await this.tokenService.generationJwtToken(user);
      return { user, token };
    } catch (error) {
      throw new Error(error);
    }
  }

  //remove password to respond end---

  //Update user
  async updateUser(userId: number, dto: UpdateUserDTO): Promise<UpdateUserDTO> {
    try {
      await this.userRepository.update(dto, { where: { id: userId } });
      return dto;
    } catch (error) {
      throw new Error(error);
    }
  }

  //Update user end------

  //Update user password
  async updatePassword(userId: number, dto: UpdatePasswordDTO): Promise<any> {
    try {
      const { password } = await this.findUserById(userId);
      // console.log(password);
      const currentPassword = await bcrypt.compare(dto.oldPassword, password);
      // console.log(currentPassword);
      if (!currentPassword) return new BadRequestException(AppError.WRONG_DATA);
      const newPassword = await this.hashPassword(dto.newPassword);
      const data = {
        password: newPassword,
      };
      return this.userRepository.update(data, { where: { id: userId } });
    } catch (e) {
      throw new Error(e);
    }
  }

  //Update user password end------

  //delete user account
  async deleteUser(email: string): Promise<boolean> {
    try {
      await this.userRepository.destroy({ where: { email: email } });
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  //delete user account end---
}
