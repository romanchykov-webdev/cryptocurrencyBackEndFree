import { Body, Controller, Delete, Patch, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO, UpdateUserDTO } from './dto';
import { JwtAuthGuard } from '../../guards/jwt-guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  //update user
  @ApiTags('API')
  @ApiResponse({status:200,type:UpdateUserDTO})
  @UseGuards(JwtAuthGuard)
  @Patch()
  updateUser(@Body() updateDTO: UpdateUserDTO, @Req() request):Promise<UpdateUserDTO> {

    const user = request.user;
    //console.log(user);
    return this.userService.updateUser(user.email, updateDTO);
  }

  //update user end--

  //delete account user
  @ApiTags('API')
  @ApiResponse({status:200,})
  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteUser(@Req() request){
    const user=request.user
    return this.userService.deleteUser(user.email)
  }
  //delete account user end---
}
