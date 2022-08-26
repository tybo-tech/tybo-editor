import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DbCollectionModel } from 'src/app/_classes/DbCollectionModel';
import { DbColumnModel } from 'src/app/_classes/DbColumnModel';
import { DbTableModel } from 'src/app/_classes/DbTableModel';
import { UserModel } from 'src/app/_classes/UserModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { IColumn_data } from 'src/app/_classes/_interfaces/IColumn_data';
import { DataTypes } from 'src/app/_classes/_statics/DataTypes';
import { HelperClass } from 'src/app/_classes/_statics/HelperClass';
import { WebsiteService } from 'src/app/_services/website.service';
import { NO_SQL_DB } from 'src/environments/environment';

@Component({
  selector: 'app-form-column',
  templateUrl: './form-column.component.html',
  styleUrls: ['./form-column.component.scss']
})
export class FormColumnComponent implements OnInit {
  @Input() table: DbTableModel;
  @Input() website: WebsiteModel;
  @Input() user: UserModel;
  // @Input() collection: DbCollectionModel;
  @Output() done: EventEmitter<any> = new EventEmitter<any>();
  DataTypes = DataTypes;
  files: any;
  constructor(private websiteService: WebsiteService) { }

  ngOnInit(): void {
    console.log(this.table);

    // if (this.collection && this.collection.DataId && this.collection.Data) {
    //   this.table.Columns.forEach(column => {
    //     column.Value = this.collection.Data[column.Name];
    //   })
    // }
  }
  save() {
    let collections: IColumn_data[] = [];
    const dataId = HelperClass.getId('data');
    this.table.Columns.forEach((column, index) => {
      // data[column.Name] = column.Value;
      let collection: IColumn_data = {
        DataId: dataId,
        WebsiteId: this.website.WebsiteId,
        ColumnId: column.Name,
        TableId: this.table.TableId,
        Value: column.Value,
        CreateUserId: this.user.UserId,
        ModifyUserId: this.user.UserId,
        StatusId: 1
      }
      collections.push(collection);
    });
    this.websiteService.create(`column_data/save-column_data.php`, collections).subscribe((data: WebsiteModel) => {
      this.done.emit(collections);
      if (data && data.WebsiteId && data.DbTables) {

      }
    })
    // console.log(data);

    // if (this.collection) {
    //   this.collection.Data = data;
    //   this.done.emit(this.collection);
    //   return;
    // }
    // console.log(data);
  }

  selectImages(event: any, item: any) {
    if (event && event.target.files.length) {
      this.files = event.target.files;
      this.submitFiles(item);
    }
  }

  submitFiles(item: any) {
    const formData = new FormData();


    for (let file of this.files) {
      formData.append('files', file);
    }
    this.websiteService.create('upload', formData).subscribe(data => {
      if (data && data.length) {
        let newItems = data.map((x: any) => `${NO_SQL_DB}/${x.path.replace("\\", "/")}`);
        if (newItems && newItems.length) {
          item.Value = newItems[0];
        }
        console.log(newItems);
      }

    })
  }

  saveText(column: DbColumnModel, value: string) {
    column.Value = value;
    let col = document.getElementById(column.ColumnId);
    if (col) {
      console.log(col.innerHTML);
      column.Value = col.innerHTML;
    }
  }
  onImageSelect(url:string, column: DbColumnModel){
    column.Value = url;
  }
}
