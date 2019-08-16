import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HistoryService } from 'src/app/services/history.service';
import { Observable } from 'rxjs';
import Video from 'src/app/models/video';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.less']
})
export class HistoryComponent {

  items: Observable<Video[]>;

  @Output() play = new EventEmitter<Video>();

  constructor(private historyService: HistoryService) {
    this.items = historyService.get();
  }

  open(item: Video) {
    this.play.emit(item);
  }

  remove(item: Video) {
    this.historyService.remove(item);
  }
}
