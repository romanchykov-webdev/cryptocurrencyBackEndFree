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
    try {
      const watchlist = {
        userId: user.id,
        name: dto.name,
        assetId: dto.assetId,
      };
      await this.watchlistRepository.create(watchlist);
      return watchlist;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteAsset(userId: number, assetId: string): Promise<boolean> {
    try {
      await this.watchlistRepository.destroy({
        where: {
          id: assetId,
          userId: userId,
        },
      });
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
}
