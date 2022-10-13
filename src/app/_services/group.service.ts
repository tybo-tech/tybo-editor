import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WebsiteModel } from '../_classes/WebsiteModel';
import { WidgetModel } from '../_classes/WidgetModel';

@Injectable({
  providedIn: 'root'
})
export class GroupService {


  private groupBehaviorSubject: BehaviorSubject<any>;
  public groupObservable: Observable<any>;
  constructor() {


    this.groupBehaviorSubject = new BehaviorSubject<any>(null);
    this.groupObservable = this.groupBehaviorSubject.asObservable();
  }

  updateGroupState(site:any) {
    this.groupBehaviorSubject.next(site);
  }
}
