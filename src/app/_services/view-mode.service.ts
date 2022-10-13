import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WebsiteModel } from '../_classes/WebsiteModel';
import { WidgetModel } from '../_classes/WidgetModel';
import { DeviceTypes } from '../_classes/_statics/DeviceTypes';



@Injectable({
  providedIn: 'root'
})
export class ViewModeService {



  private deviceModeBehaviorSubject: BehaviorSubject<any>;
  public deviceModeObservable: Observable<any>;



  constructor() {
    this.deviceModeBehaviorSubject = new BehaviorSubject<any>(null);
    this.deviceModeObservable = this.deviceModeBehaviorSubject.asObservable();
  }

  changeMode(itemInMoemory: any) {
    this.deviceModeBehaviorSubject.next(itemInMoemory);
  }

}
