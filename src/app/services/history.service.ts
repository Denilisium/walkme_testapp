import { Injectable } from '@angular/core';
import Video from '../models/video';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private readonly LS_KEY = 'video_history';

  private observer: Subscriber<Video[]>;
  private observableItems = new Observable<Video[]>((observer) => {
    this.observer = observer;

    observer.next(this.items);

    return { unsubscribe() { } };
  });

  constructor() { }

  private get items() {
    const json = window.localStorage.getItem(this.LS_KEY);
    if (json) {
      return JSON.parse(json) as Video[];
    }

    return [];
  }

  private set items(items: Video[]) {
    const json = JSON.stringify(items);
    window.localStorage.setItem(this.LS_KEY, json);
  }

  get() {
    return this.observableItems;
  }

  put(item: Video) {
    this.items = [item, ...this.items.filter(t => t.videoId !== item.videoId)];
    this.onChanged();
  }

  remove(item: Video) {
    this.items = this.items.filter(sitem => item.videoId !== sitem.videoId);
    this.onChanged();
  }

  private onChanged() {
    if (this.observer) {
      this.observer.next(this.items);
    }
  }
}
