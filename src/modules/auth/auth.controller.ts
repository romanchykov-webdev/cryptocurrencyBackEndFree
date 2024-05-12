import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../user/dto';
import { UserLoginDTO } from './dto';
import { AuthUserResponse } from './response';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-guard';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {
  }

//registration user
  //to describer the documentation
  @ApiTags('API')
  @ApiResponse({status:201,type:CreateUserDTO})
  //to describer the documentation end--
  @Post('register')
  register(@Body() dto: CreateUserDTO): Promise<CreateUserDTO> {
    return this.authService.registerUsers(dto);
  }
//registration user end-------------

//login user
  //to describer the documentation
  @ApiTags('API')
  @ApiResponse({status:200, type:AuthUserResponse})
  //to describer the documentation end--
  @Post('login')
  login(@Body() dto:UserLoginDTO):Promise<AuthUserResponse> {
    return this.authService.lorinUser(dto)
  }
//login user end------------------


  @UseGuards(JwtAuthGuard)
  @Post('test')
  test(){
    return 'серёга ты лудший'
  }

}
