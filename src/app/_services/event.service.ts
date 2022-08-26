import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WebsiteModel } from '../_classes/WebsiteModel';
import { WidgetModel } from '../_classes/WidgetModel';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private optionsBehaviorSubject: BehaviorSubject<any>;
  public optionsObservable: Observable<any>;
  
  private updatedBehaviorSubject: BehaviorSubject<any>;
  public updatedObservable: Observable<any>;
  constructor() {
    this.optionsBehaviorSubject = new BehaviorSubject<any>(null);
    this.optionsObservable = this.optionsBehaviorSubject.asObservable();

    this.updatedBehaviorSubject = new BehaviorSubject<any>(null);
    this.updatedObservable = this.updatedBehaviorSubject.asObservable();
  }

  updateOptionsState(site: WidgetModel | undefined | WebsiteModel) {
    this.optionsBehaviorSubject.next(site);
  }
}
