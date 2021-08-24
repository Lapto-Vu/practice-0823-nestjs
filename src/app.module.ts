import { Module } from '@nestjs/common';
import { podcastController } from './podcasts/podcast.controller';
import { PodcastService } from './podcasts/podcast.service';

@Module({
  imports: [],
  controllers: [podcastController],
  providers: [PodcastService],
})
export class AppModule {}
