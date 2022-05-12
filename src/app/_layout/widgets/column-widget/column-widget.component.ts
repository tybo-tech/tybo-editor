
import { Component, Input, OnInit } from '@angular/core';
import { ColumnModel } from 'src/app/_classes/ColumnModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { DeviceTypes } from 'src/app/_classes/_statics/DeviceTypes';
import { SectionTypes } from 'src/app/_classes/_statics/SectionTypes';
import { CopyService } from 'src/app/_services/copy.service';
import { ViewModeService } from 'src/app/_services/view-mode.service';
import { WebsiteService } from 'src/app/_services/website.service';

@Component({
    selector: 'app-column-widget',
    templateUrl: 'column-widget.component.html',
    styleUrls: ['column-widget.component.scss']
})
export class ColumnWidgetComponent implements OnInit {

    @Input() widget: WidgetModel;
    @Input() index: number;
    @Input() column: ColumnModel;
    @Input() website: WebsiteModel;
    stylesToPaste: any;
    valueChanged(event: string, widget: WidgetModel) {
        widget.ItemContent = event;
    }
    SectionTypes = SectionTypes;
    constructor(private copyService: CopyService, private viewModeService: ViewModeService, private websiteService: WebsiteService) { }

    ngOnInit(): void {
        this.viewModeService.deviceModeObservable.subscribe(data => {
            if (data) {
                if (this.website && this.website.ViewDevice === DeviceTypes.PHONE) {
                    this.widget.SelectedStyle = this.widget.ItemMobileStyle;
                }


                if (this.website && this.website.ViewDevice === DeviceTypes.PC) {
                    this.widget.SelectedStyle = this.widget.ItemStyle;
                }
            }
        });



        this.copyService.copiedItemObservable.subscribe(data => {
            if (data)
                this.stylesToPaste = data;
        });
    }

    OnCopyEvent(event) {
        if (this.website && this.website.ViewDevice === DeviceTypes.PHONE) {
            this.widget.ItemMobileStyle = this.stylesToPaste;
        }

        if (this.website && this.website.ViewDevice === DeviceTypes.PC) {
            this.widget.ItemStyle = this.stylesToPaste;
        }

        this.widget.SelectedStyle = this.stylesToPaste;
    }

    onStyleChange(event) {
        debugger
        if (!event)
            return
        if (this.website && this.website.ViewDevice === DeviceTypes.PHONE) {
            this.widget.ItemMobileStyle = event;
        }


        if (this.website && this.website.ViewDevice === DeviceTypes.PC) {
            this.widget.ItemStyle = event;
        }
    }

    onImageChange(event: string, widget: WidgetModel) {
        widget.ItemContent = event;
    }

    deleteEvent(e) {
        if (e) {
            this.column.DeleteWidget(this.index);
            if (this.widget._id)
                this.websiteService.delete(`widgets/${this.widget._id}`).subscribe(data => {
                    console.log(data);
                })
        }
    }

}
