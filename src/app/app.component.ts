import { Component } from '@angular/core';
import Video from './models/video';
import { HistoryService } from './services/history.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  chosenVideo?: Video;

  constructor(private historyServce: HistoryService) {}

  onPlayVideo(video?: Video) {
    this.chosenVideo = video;
    if (video) {
      this.historyServce.put(video);
    }
  }
}
