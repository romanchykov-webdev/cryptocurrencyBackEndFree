import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AppError } from '../../common/constants/errors';
import { User } from '../user/models/user.model';
import { CreateUserDTO } from '../user/dto';
import { UserLoginDTO } from './dto';

import * as bcrypt from 'bcrypt';
import { AuthUserResponse } from './response';
import { TokenModule } from '../token/token.module';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {
  }


//registration user
  async registerUsers(dto: CreateUserDTO): Promise<CreateUserDTO> {
    //if has user
    const existUser = await this.userService.findUserByEmail(dto.email);

    if (existUser) throw new BadRequestException(AppError.USER_EXIST);
    //if  has user  end --
    return this.userService.createUser(dto);

  }

//registration user end---------------------


//login user
  async lorinUser(dto: UserLoginDTO): Promise<AuthUserResponse> {

    //find user by email in DB
    const existUser = await this.userService.findUserByEmail(dto.email);
    //find user by email in DB end--

    // has user or not if not has error
    if (!existUser) throw new BadRequestException(AppError.USER_NOT_EXIST);
    // has user or not if not has error end--

//verification re hash password
    const validatePassword = await bcrypt.compare(dto.password, existUser.password);

    // if password is error
    if (!validatePassword) throw new BadRequestException(AppError.WRONG_DATA);
    // if password is error end --

//verification re hash password end ---

    //create jwt token
    const token =await this.tokenService.generationJwtToken(dto.email)
    //create jwt token end--

    return {...existUser, token:token };
  }

//login user end-----------------------


}