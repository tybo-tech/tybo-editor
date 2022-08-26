import { Component, Input, OnInit } from '@angular/core';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { IKeyValueModel } from 'src/app/_classes/_interfaces/IKeyValueModel';
import { SectionTypes } from 'src/app/_classes/_statics/SectionTypes';
import { WidgetHelper } from 'src/app/_classes/_statics/WidgetHelper';
import { SyncService } from 'src/app/_services/sync.service';
import { WebsiteService } from 'src/app/_services/website.service';

@Component({
  selector: 'app-element-class-betta',
  templateUrl: './element-class-betta.component.html',
  styleUrls: ['./element-class-betta.component.scss']
})
export class ElementClassBettaComponent implements OnInit {
  @Input() widget: WidgetModel;
  website: WebsiteModel;
  SectionTypes = SectionTypes
  savingStyles: any;
  constructor(private websiteService: WebsiteService, private stylesService: SyncService) { }

  ngOnInit(): void {
    this.websiteService.websiteObservable.subscribe(data => {
      if (data) {             
        this.website = data;
      }
    })

    let timeer = setInterval(() => {
      // auto update styles
      const styles = this.stylesService.getStylsToSave;
      if (styles && styles.length) {
        const temp = styles;
        this.savingStyles = true;
        this.stylesService.empyStyles();
        this.websiteService.create(`webstyles/save-webstyles.php`, styles).subscribe(data => {
          this.savingStyles = false;

        });
      }

      // auto update widget
      const widgets = this.stylesService.getWidgetsToSave;
      if (widgets && widgets.length) {
        const temp = widgets;
        this.savingStyles = true;
        this.stylesService.empyWidgets();
      this.websiteService.saveWidgetChanges(widgets[0])
      }
    }, 2000);
  }
  styleChaged(style: IKeyValueModel) {
    // debugger
    if (!this.website)
      return;
    if (this.deleteZeroBorder(style)) {
      WidgetHelper.removeCassClass(this.website, this.widget, style.Key)
      this.websiteService.updateWebsieState(this.website);
      return;
    }
    if (this.deleteZeroPadding(style)) {
      WidgetHelper.removeCassClass(this.website, this.widget, style.Key)
      this.websiteService.updateWebsieState(this.website);
      return;
    }


    const styles = WidgetHelper.updateCassClass(this.website, this.widget, style.Key, style.Value, '');
    if (styles && this.widget.SelectedClass) {
      this.websiteService.updateWebsieState(this.website);
      this.stylesService.updateStyleState(this.widget.SelectedClass)
    }

  }

  deleteZeroBorder(style: IKeyValueModel) {
    if (
      (style.Key === 'border-right' ||
        style.Key === 'border-left' ||
        style.Key === 'border' ||
        style.Key === 'border-top' ||
        style.Key === 'border-bottom') &&

      style.Value.includes("0px")
    ) {
      return true;
    }
    return false
  }
  deleteZeroPadding(style: IKeyValueModel) {
    if (
      (style.Key === 'padding-right' ||
        style.Key === 'padding-left' ||
        style.Key === 'padding' ||
        style.Key === 'padding-top' ||
        style.Key === 'padding-bottom') &&

      style.Value.includes("0px")
    ) {
      return true;
    }
    return false
  }
}
