import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AppError } from '../../common/constants/errors';
import { User } from '../user/models/user.model';
import { CreateUserDTO } from '../user/dto';
import { UserLoginDTO } from './dto';

import * as bcrypt from 'bcrypt';
import { AuthUserResponse } from './response';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {
  }

//if has user
//const existUser = await this.findUserByEmail(dto.email);
//if (existUser) {
// throw new BadRequestException(AppError.USER_EXIST);
// }
//if  has user  end

  //registration user
  async registerUsers(dto: CreateUserDTO): Promise<CreateUserDTO> {
    //if has user
    const existUser = await this.userService.findUserByEmail(dto.email);

    if (existUser) throw new BadRequestException(AppError.USER_EXIST);
    //if  has user  end
    return this.userService.createUser(dto);

  }


  //login user
  async lorinUser(dto: UserLoginDTO):Promise<AuthUserResponse> {

// has user or not
    const existUser = await this.userService.findUserByEmail(dto.email);

    if (!existUser) throw new BadRequestException(AppError.USER_NOT_EXIST);
// has user or not end

//verification re hash password
    const validatePassword = await bcrypt.compare(dto.password, existUser.password);

    // if password is error
    if (!validatePassword) throw new BadRequestException(AppError.WRONG_DATA);
    // if password is error end

//verification re hash password end

    return existUser;


  }


}
