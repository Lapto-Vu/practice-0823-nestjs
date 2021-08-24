import { Injectable, NotFoundException } from '@nestjs/common';
import { Episode } from './entities/episode.entity';
import { Podcast } from './entities/podcast.entity';

@Injectable()
export class PodcastService {
  private podcastList: Podcast[] = [];

  getAllPodcast(): Podcast[] {
    return this.podcastList;
  }

  createPodcast(newPodcastData) {
    this.podcastList.push({
      id: this.podcastList.length + 1,
      episodes: [],
      ...newPodcastData,
    });
  }

  getOnePodcast(id: string): Podcast {
    const podcast = this.podcastList.find((podcast) => podcast.id === +id);
    if (!podcast) {
      throw new NotFoundException(`Podcast with ID ${id} is Not Found.`);
    }
    return podcast;
  }

  updateOnePodcast(id: string, updatePodcastData) {
    const podcast = this.getOnePodcast(id);
    this.deleteOnePodcast(id);
    this.podcastList.push({
      ...podcast,
      ...updatePodcastData,
    });
  }

  deleteOnePodcast(id: string) {
    this.getOnePodcast(id);
    this.podcastList = this.podcastList.filter((podcast) => podcast.id !== +id);
  }

  getEpisodeByPodcast(id: string): Episode[] {
    const podcast = this.getOnePodcast(id);
    return podcast.episodes;
  }

  createEpisodeByPodcast(id: string, newEpisodeData) {
    const podcast = this.getOnePodcast(id);
    podcast.episodes.push({
      id: podcast.episodes.length + 1,
      ...newEpisodeData,
    });
    this.deleteOnePodcast(id);
    this.podcastList.push(podcast);
  }

  updateEpisodeByPodcast(id: string, episodeId: string, updateEpisodeData) {
    const podcast = this.getOnePodcast(id);
    const episode = podcast.episodes.find(
      (episode) => episode.id === +episodeId,
    );
    this.deleteEpisode(id, episodeId);
    podcast.episodes.push({
      ...episode,
      ...updateEpisodeData,
    });
    this.updateOnePodcast(id, podcast);
  }

  deleteEpisode(id: string, episodeId: string) {
    const podcast = this.getOnePodcast(id);
    podcast.episodes = podcast.episodes.filter(
      (epiosde) => epiosde.id !== +episodeId,
    );
    console.log(podcast);
    this.deleteOnePodcast(id);
    this.podcastList.push(podcast);
  }
}
