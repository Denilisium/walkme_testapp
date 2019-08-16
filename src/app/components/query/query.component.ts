import { Component, OnInit, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchService } from 'src/app/services/search.service';
import { Observable, timer } from 'rxjs';
import Video from 'src/app/models/video';
import { mergeMap, debounce, filter } from 'rxjs/operators';
import { MatAutocompleteTrigger } from '@angular/material';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.less']
})
export class QueryComponent {
  private typeWaiting = 0.5 * 1000;

  videoCtrl = new FormControl();
  suggestedVideos: Observable<Video[]>;

  @ViewChild(MatAutocompleteTrigger) trigger;
  @Output() play = new EventEmitter<Video>();

  constructor(
    private searchService: SearchService
  ) {
    this.suggestedVideos = this.videoCtrl.valueChanges
      .pipe(
        // filter(term => term && term.length > 2),
        debounce(() => timer(this.typeWaiting)),
        mergeMap(term => this.searchService.get(term.trim()))
      );
  }

  ignoreSelection(event: MouseEvent) {
    // this prevents the click event => selection isn't triggered
    event.stopPropagation();
  }

  open(video: Video) {
    this.play.emit(video);
    this.trigger.closePanel();
  }
}
