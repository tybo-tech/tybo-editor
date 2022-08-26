import { Component, Input, OnInit } from '@angular/core';
import { DbCollectionModel } from 'src/app/_classes/DbCollectionModel';
import { DbTableModel } from 'src/app/_classes/DbTableModel';
import { UserModel } from 'src/app/_classes/UserModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { IColumn_data } from 'src/app/_classes/_interfaces/IColumn_data';
import { WebsiteService } from 'src/app/_services/website.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent implements OnInit {
  @Input() website: WebsiteModel;
  @Input() selectedTable: DbTableModel;
  @Input() user: UserModel;
  @Input() collections: any[];
  @Input() keys: string[];
  showForm: boolean;
  collection: DbCollectionModel;
  constructor(private websiteService: WebsiteService) { }

  ngOnInit(): void {

  }
  addCollectionItem() {
    this.showForm = true;
  }

  dataItemClicked(collectionItem: DbCollectionModel, action: string) {
    if (action === 'delete')
      this.deleteCollection(collectionItem);

    if (action === 'edit') {
      this.showForm = true;
      this.collection = collectionItem;

    }
    // this.updateCollection(collectionItem);
  }

  formSubmited(data: any) {
    if (data && data._id) {
      this.updateCollection(data);
      return;
    }
    const item = new DbCollectionModel('', this.website.WebsiteId, this.selectedTable.TableId, this.selectedTable.Name, {}, this.user.UserId);
    item.Data = data;
    item.DataId = data['Id'] || ''
    console.log(item);
    this.websiteService.create('collections', item).subscribe(d => {
      this.websiteService.getCollections();
      this.showForm = false;
    })

  }
  updateCollection(collectionItem: IColumn_data) {
    this.websiteService.create(`column_data/update-column_data.php`, collectionItem).subscribe(d => {
      this.websiteService.getCollections();
      this.showForm = false;
    })
  }
  deleteCollection(collectionItem: DbCollectionModel) {
    this.websiteService.delete(`collections/${collectionItem._id}`).subscribe(d => {
      this.websiteService.getCollections();
    })
  }
  doubleClickFunction(collectionItem: DbCollectionModel) {
    console.log(collectionItem);
    this.collections.map(x => x.IsEdit = false);
    collectionItem.IsEdit = true;
    // console.log();

  }

  colChanged(collectionItem: any, DataId: string, key: string) {
    let collection: IColumn_data = {
      DataId: DataId,
      WebsiteId: this.website.WebsiteId,
      ColumnId: key,
      TableId: this.selectedTable.TableId,
      Value:collectionItem[key],
      CreateUserId: this.user.UserId,
      ModifyUserId: this.user.UserId,
      StatusId: 1
    }
    this.updateCollection(collection)

  }

  onImageSelect(url: string, collectionItem: any, DataId: string, key: string) {
    collectionItem[key] = url;
    let collection: IColumn_data = {
      DataId: DataId,
      WebsiteId: this.website.WebsiteId,
      ColumnId: key,
      TableId: this.selectedTable.TableId,
      Value:collectionItem[key],
      CreateUserId: this.user.UserId,
      ModifyUserId: this.user.UserId,
      StatusId: 1
    }
    this.updateCollection(collection)
  }
}
