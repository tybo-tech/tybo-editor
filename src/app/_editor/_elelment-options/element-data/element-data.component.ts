import { Component, Input, OnInit } from '@angular/core';
import { DbColumnModel } from 'src/app/_classes/DbColumnModel';
import { DbTableModel } from 'src/app/_classes/DbTableModel';
import { IOptions } from 'src/app/_classes/IOptions';
import { PageModel } from 'src/app/_classes/PageModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { SectionTypes } from 'src/app/_classes/_statics/SectionTypes';
import { WidgetHelper } from 'src/app/_classes/_statics/WidgetHelper';
import { Emitters } from 'src/app/_emmiters/Emitters';
import { WebsiteService } from 'src/app/_services/website.service';

@Component({
  selector: 'app-element-data',
  templateUrl: './element-data.component.html',
  styleUrls: ['./element-data.component.scss']
})
export class ElementDataComponent implements OnInit {

  @Input() widget: WidgetModel;
  @Input() website: WebsiteModel;
  @Input() page: PageModel;
  @Input() type: any;
  settings: IOptions[] = ELEMENT_DATA;
  tables: DbTableModel[];
  columns: DbColumnModel[];
  SectionTypes = SectionTypes;
  constructor(private websiteService: WebsiteService) {
    websiteService.websiteObservable.subscribe(data => {
      if (data)
        this.tables = data.DbTables;
    })
  }

  ngOnInit() {
    console.log(this.widget.Settings);
    this.columns = [];
    if (this.widget.Children) {
      this.widget.Children.forEach(child => {
        if (!child.FeildName) {
          child.FeildName = "Static";
        }
      })
    }

    if (this.widget.Settings && this.widget.Settings["Data-source"] && this.settings.length) {
      this.settings[0].Type = this.widget.Settings["Data-source"];
    }
    if (this.widget.Settings && this.widget.Settings["Data-table"] && this.settings.length) {
      this.settings[0].Value = this.widget.Settings["Data-table"];
      if (this.tables && this.tables.length) {
        let tbl = this.tables.find(x => x.Name === this.widget.Settings["Data-table"]);
        if (tbl)
          this.columns = tbl.Columns;
      }
    }

  }
  onInputEvent(section: IOptions) {
    if (!this.widget.Settings)
      this.widget.Settings = {};

    if (section.SectionName === 'Data source') {
      this.widget.Settings["Data-source"] = section.Type
    }

    if (section.SectionName === 'Data source') {
      this.widget.Settings["Data-source"] = section.Type
    }
    if (section.Value) {
      this.widget.Settings["Data-table"] = section.Value;
      let tbl = this.tables.find(x => x.Name === this.widget.Settings["Data-table"]);
      if (tbl)
        this.columns = tbl.Columns;
    }

    if (this.widget.ParentWidget) {
      console.log(this.widget.ParentWidget)
      // this.widget.ParentWidget.Children.forEach(child=>{
      //   console.log(child.DataType);

      // })
    }
  }

  tableChanged() {
    let tbl = this.tables.find(x => x.Name === this.widget.DbTable);
    if (tbl)
      this.columns = tbl.Columns;
  }
  itemContentSource(widget: WidgetModel) {
    if (this.widget.ParentWidget && this.widget.ParentWidget.Children) {
      const child = this.widget.ParentWidget.Children.find(x => x.WidgetId === widget.RelatedId);
      if (child) {
        child.FeildName = widget.FeildName;
        Emitters.dyanamicEmmiter.emit(true);
      }
    }
  }
  dataTypeChnaged(){
    if (this.widget.ParentWidget) {
      if(this.widget.GrandParent){
        this.widget.ParentWidget.FeildName = this.widget.FeildName;
        this.widget.GrandParent.Children = WidgetHelper.removeDynamicWidgets( this.widget.GrandParent.Children);
        WidgetHelper.proccessWidget(this.widget.GrandParent, this.website, this.page);
      }
      return;
    }
  }
  dbTableChnaged(){
    this.tableChanged()
    if (this.widget.ParentWidget) {
      if(this.widget.GrandParent){
        this.widget.ParentWidget.DbTable = this.widget.DbTable;
        this.widget.GrandParent.Children = WidgetHelper.removeDynamicWidgets( this.widget.GrandParent.Children);
        WidgetHelper.proccessWidget(this.widget.GrandParent, this.website, this.page);
      }
      return;
    }
  }
}


export const ELEMENT_DATA: IOptions[] =
  [
    {
      SectionName: 'Data source',
      IsOpen: true,
      Type: 'Static',
      Inputs: undefined,
      Url: '',
      EventOptions: [{ Action: 'Static' }, { Action: 'Data List' }, { Action: 'Data single item' }]
    }
  ];
