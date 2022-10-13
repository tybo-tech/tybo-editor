import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WebsiteModel } from '../_classes/WebsiteModel';
import { WidgetModel } from '../_classes/WidgetModel';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private keyEventBehaviorSubject: BehaviorSubject<string>;
  public keyEventObservable: Observable<string>;

  private optionsBehaviorSubject: BehaviorSubject<any>;
  public optionsObservable: Observable<any>;

  private updatedBehaviorSubject: BehaviorSubject<any>;
  public updatedObservable: Observable<any>;
  constructor() {
    this.optionsBehaviorSubject = new BehaviorSubject<any>(null);
    this.optionsObservable = this.optionsBehaviorSubject.asObservable();

    this.keyEventBehaviorSubject = new BehaviorSubject<string>('');
    this.keyEventObservable = this.keyEventBehaviorSubject.asObservable();

    this.updatedBehaviorSubject = new BehaviorSubject<any>(null);
    this.updatedObservable = this.updatedBehaviorSubject.asObservable();
  }

  updateOptionsState(site: WidgetModel | undefined | WebsiteModel) {
    this.optionsBehaviorSubject.next(site);
  }

  updateKeyEventState(key: string) {
    this.keyEventBehaviorSubject.next(key);
  }
}
