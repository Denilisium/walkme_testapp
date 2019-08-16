import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import Video from 'src/app/models/video';
import { SafeResourceUrl } from '@angular/platform-browser';
import { youtubeSdk } from '../../../assets/config.json';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.less']
})
export class PlayerComponent implements OnInit, OnChanges {

  private readonly ELEMENT_ID = 'player';

  safeSrc: SafeResourceUrl;
  player: any;

  @Input() video: Video;

  constructor() {
  }

  ngOnInit(): void {
    this.initYoutubeSdk();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const videoProp = 'video';
    const prop = changes[videoProp];
    if (prop.currentValue !== prop.previousValue && prop.currentValue) {
      this.playVideo((prop.currentValue as Video).videoId);
    }
  }

  /**
   * Downloads youtube sdk script and inserts it into the page
   */
  private initYoutubeSdk() {
    const tag = document.createElement('script');

    tag.src = youtubeSdk;
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  private playVideo(videoId: string) {
    if (this.player) {
      this.player.clearVideo();
      this.player.loadVideoById(videoId);
    } else {
      this.player = new (window as any).YT.Player(this.ELEMENT_ID, {
        height: '100%',
        width: '100%',
        videoId,
        events: {
          onReady: (event) => event.target.playVideo()
        }
      });
    }
  }
}
