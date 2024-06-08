import {
  Body,
  Controller,
  Delete, Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { WatchlistDTO } from './dto';
import { JwtAuthGuard } from '../../guards/jwt-guard';
import { CreateAssetsResponse, GetUserAssetsResponse } from './response';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Watchlist } from './models/watchlist.model';

@Controller('watchlist')
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {
  }

  @ApiTags('API')
  @ApiResponse({ status: 201, type: CreateAssetsResponse })
  @UseGuards(JwtAuthGuard)
  @Post('create')
  createAsset(
    @Body() assetDto: WatchlistDTO,
    @Req() request,
  ): Promise<CreateAssetsResponse> {
    const user = request.user;
    return this.watchlistService.createAsset(user, assetDto);
  }

  // @Get('get-all')
  //getAllAssets() {
  //  return;
  //}

  // @Patch('update')
  //updateAsset() {
  //  return;
  // }
  //get asset element
  @ApiTags('API')
  @ApiResponse({ status: 200, type: GetUserAssetsResponse })
  @UseGuards(JwtAuthGuard)
  @Get('get-elements')
  getUserAssets(@Req() request): Promise<Watchlist[]> {
    const user = request.user;
    // console.log('------------');
    // console.log(user);
    // console.log(user.id);
    // console.log('-----------');
    return this.watchlistService.getUserAssets(user.id);
  }

  //deleteAsset
  @ApiTags('API')
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteAsset(@Query('id') assetId: string, @Req() request): Promise<boolean> {
    const { id } = request.user;
    return this.watchlistService.deleteAsset(id, assetId);
  }
}
