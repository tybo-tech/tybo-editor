import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WebstyleModel } from '../_classes/WebstyleModel';
import { WidgetModel } from '../_classes/WidgetModel';


@Injectable({
    providedIn: 'root'
})
export class SyncService {

    url: string;

    private stylesBehaviorSubject: BehaviorSubject<WebstyleModel[]>;
    public stylesObservable: Observable<WebstyleModel[]>;


    private widgetBehaviorSubject: BehaviorSubject<IUpdateWidget[]>;
    public widgetObservable: Observable<IUpdateWidget[]>;

    constructor(
        private http: HttpClient,
    ) {

        this.url = environment.API_URL;
        this.stylesBehaviorSubject = new BehaviorSubject<WebstyleModel[]>([]);
        this.stylesObservable = this.stylesBehaviorSubject.asObservable();

        this.widgetBehaviorSubject = new BehaviorSubject<IUpdateWidget[]>([]);
        this.widgetObservable = this.widgetBehaviorSubject.asObservable();
    }


    updateStyleState(style: WebstyleModel) {
        let styles = this.stylesBehaviorSubject.value || [];
        styles = styles.filter(x => x.WebStyleId != style.WebStyleId);
        styles.push(style);
        this.stylesBehaviorSubject.next(styles);
    }
    empyStyles() {
        this.stylesBehaviorSubject.next([]);
    }

    public get getStylsToSave() {
        return this.stylesBehaviorSubject.value;
    }
    updateWidgetState(widget: WidgetModel, userId: string) {
        const iwid: IUpdateWidget = {
            ParentId: widget.ParentId,
            Name: widget.Name,
            OrderNumber: widget.OrderNumber,
            Settings: widget.Settings,
            ItemFormat: widget.ItemFormat,
            BackgroundType: widget.BackgroundType,
            FeildName: widget.FeildName || '',
            DbTable: widget.DbTable,
            ItemEventName: widget.ItemEventName || '',
            ItemEvent: widget.ItemEvent,
            UrlId: widget.UrlId,
            ItemContent: widget.ItemContent,
            ItemClass: widget.ItemClass.filter((x: string) => x !== "active-node"),
            ItemCategory: widget.ItemCategory,
            ModifyUserId: userId,
            StatusId: widget.StatusId,
            Id: Number(widget.Id)
        }
        let widgets = this.widgetBehaviorSubject.value || [];
        widgets = widgets.filter(x => x.Id != widget.Id);
        widgets.push(iwid);
        this.widgetBehaviorSubject.next(widgets);
    }
    empyWidgets() {
        this.widgetBehaviorSubject.next([]);
    }

    public get getWidgetsToSave() {
        return this.widgetBehaviorSubject.value;
    }
}


export interface IUpdateWidget {
    Id: any;
    Name: string;
    ParentId: string;
    OrderNumber: number;
    Settings: string;
    BackgroundType: string;
    FeildName: any;
    ItemFormat: any;
    DbTable: string;
    ItemEventName: string;
    ItemEvent: string;
    UrlId: string;
    ItemContent: string;
    ItemClass: any;
    ItemCategory: string;
    ModifyUserId: string;
    StatusId: number;
}