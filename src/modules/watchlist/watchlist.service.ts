import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Watchlist } from './models/watchlist.model';
import { CreateAssetsResponse } from './response';

@Injectable()
export class WatchlistService {
  constructor(
    @InjectModel(Watchlist)
    private readonly watchlistRepository: typeof Watchlist,
  ) {}

  async createAsset(user, dto): Promise<CreateAssetsResponse> {
    const watchlist = {
      userId: user.id,
      name: dto.name,
      assetId: dto.assetId,
    };
    await this.watchlistRepository.create(watchlist);
    return watchlist;
  }

  async deleteAsset(userId: number, assetId: string): Promise<boolean> {
    await this.watchlistRepository.destroy({
      where: {
        id: assetId,
        userId: userId,
      },
    });
    return true;
  }
}
