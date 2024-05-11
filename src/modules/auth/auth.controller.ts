import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../users/dto';
import { UserLoginDTO } from './dto';
import { AuthUserResponse } from './response';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-guard';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {
  }

//registration users
  //to describer the documentation
  @ApiTags('API')
  @ApiResponse({status:201,type:CreateUserDTO})
  @HttpCode(200)
  //to describer the documentation end--
  @Post('register')
  register(@Body() dto: CreateUserDTO): Promise<CreateUserDTO> {
    return this.authService.registerUsers(dto);
  }
//registration users end-------------

//login users
  //to describer the documentation
  @ApiTags('API')
  @ApiResponse({status:200, type:AuthUserResponse})
  @HttpCode(200)
  //to describer the documentation end--
  @Post('login')
  login(@Body() dto:UserLoginDTO):Promise<AuthUserResponse> {
    return this.authService.lorinUser(dto)
  }
//login users end------------------


  @UseGuards(JwtAuthGuard)
  @Post('test')
  test(){
    return true
  }


}
