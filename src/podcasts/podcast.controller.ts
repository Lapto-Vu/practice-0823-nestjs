import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { PodcastService } from './podcast.service';

@Controller('podcasts')
export class podcastController {
  constructor(private readonly podcastService: PodcastService) {}

  @Get()
  getAll() {
    return this.podcastService.getAllPodcast();
  }

  @Post()
  createPodcast(@Body() newPodcastData) {
    return this.podcastService.createPodcast(newPodcastData);
  }

  @Get(':id')
  getOnePodcast(@Param('id') id: string) {
    console.log(id);
    return this.podcastService.getOnePodcast(id);
  }

  @Patch(':id')
  updateOnePodcast(@Param('id') id: string, @Body() updatePoodcastData) {
    return this.podcastService.updateOnePodcast(id, updatePoodcastData);
  }

  @Delete(':id')
  deleteOnePodcast(@Param('id') id: string) {
    return this.podcastService.deleteOnePodcast(id);
  }

  @Get(':id/episodes')
  getEpisodeByPodcast(@Param('id') id: string) {
    return this.podcastService.getEpisodeByPodcast(id);
  }

  @Post(':id/episodes')
  createEpisodeByPodcast(@Param('id') id: string, @Body() newEpisodeData) {
    return this.podcastService.createEpisodeByPodcast(id, newEpisodeData);
  }

  @Patch(':id/episodes/:episodeId')
  updateEpisodeByPodcast(
    @Param('id') id: string,
    @Param('episodeId') episodeId: string,
    @Body() updateEpisodeData,
  ) {
    return this.podcastService.updateEpisodeByPodcast(
      id,
      episodeId,
      updateEpisodeData,
    );
  }

  @Delete(':id/episodes/:episodeId')
  deleteEpisode(
    @Param('id') id: string,
    @Param('episodeId') episodeId: string,
  ) {
    return this.podcastService.deleteEpisode(id, episodeId);
  }
}
