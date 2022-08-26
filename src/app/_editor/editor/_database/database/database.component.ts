import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DbCollectionModel } from 'src/app/_classes/DbCollectionModel';
import { DbColumnModel } from 'src/app/_classes/DbColumnModel';
import { DbTableModel } from 'src/app/_classes/DbTableModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { Itabs } from 'src/app/_classes/_interfaces/Itabs';
import { HelperClass } from 'src/app/_classes/_statics/HelperClass';
import { WebsiteService } from 'src/app/_services/website.service';
import { UserModel } from 'c:/ndu/apps/tybo-editor/src/app/_classes/UserModel';

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.scss']
})
export class DatabaseComponent implements OnInit {

  @Output() dbEvent: EventEmitter<any> = new EventEmitter();
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  newItems: string[];
  website: WebsiteModel
  user: UserModel;
  selectedTable: DbTableModel;
  design: boolean = false;
  collections: DbCollectionModel[];
  keys: any;
  allCollections: DbCollectionModel[];
  loading: boolean;

  tabs: Itabs[] = [
    { Id: 'data', Name: 'Data', Classes: [], Action: '' },
    { Id: 'structure', Name: 'Structure', Classes: [], Action: '' },
    { Id: 'insert', Name: 'Insert data', Classes: [], Action: '' },
  ]
  selectedTab: Itabs;
  constructor(private websiteService: WebsiteService) { }

  ngOnInit() {
    this.selectTab(this.tabs[0]);
    this.allCollections = [];
    this.websiteService.websiteObservable.subscribe(data => {
      if (data) {
        this.website = data;
        if (this.website && this.website.DbTables && this.website.DbTables.length)
          this.selectTable(this.website.DbTables[0]);
      }
    });
    this.websiteService.collectionsObservable.subscribe(data => {
      if (data) {
        this.allCollections = data;
        if (this.selectedTable && this.selectedTable.TableId)
          this.getCollections();
      }
    });

    this.websiteService.userObservable.subscribe(data => {
      if (data) {
        this.user = data;
      }
    })
  }
  close() {
    this.onClose.emit(false)
  }
  createTable() {
    if (!this.website.DbTables)
      this.website.DbTables = [];
    this.design = true;
    this.website.DbTables.push(new DbTableModel(HelperClass.getId('table'), this.website.WebsiteId, '', 1, this.user.UserId, this.user.UserId, 1))
    this.selectTable(this.website.DbTables[this.website.DbTables.length - 1]);
  }

  selectTable(table: DbTableModel) {
    this.selectedTable = table;
    this.website.DbTables.map(x => x.Classes = []);
    // this.selectedTable.Classes = ['btn btn-outline-primary'];
    this.selectedTable.Classes = ['bg-white'];
    if (!this.selectedTable.Columns || !this.selectedTable.Columns.length)
      this.selectedTable.Columns = [
        new DbColumnModel(HelperClass.getId('col'), table.TableId, this.website.WebsiteId, 'Id', '', 'Auto generate', 1, 1, 999999999, 'true', this.user.UserId, this.user.UserId, 1)
      ]

    this.getCollections();
  }
  addField() {
    if (!this.selectedTable)
      return;
    this.selectedTable.Columns.push(
      new DbColumnModel(HelperClass.getId('col'), this.selectedTable.TableId, this.website.WebsiteId, '', '', 'Text', 1, 1, 99999999, 'false', this.user.UserId, this.user.UserId, 1)
    )

  }
  showData() {
    this.design = !this.design;
  }

  getCollections() {
    this.websiteService.get(`column_data/get-column_data-by-table-id.php?TableId=${this.selectedTable.TableId}`).subscribe((data: any[]) => {
      console.log(data);
      this.collections = data || [];
      this.keys = [];
      this.selectedTable.Columns.forEach(col => {
        this.keys.push(col.Name);
      })
    })

  }
  tableNameChanged(table: DbTableModel) {
    console.log(table);
    if (!table.Name)
      return;
    this.websiteService.create(`tables/save-tables.php`, [table]).subscribe((data: WebsiteModel) => {
      if (data && data.WebsiteId && data.DbTables) {
        const tbl = data.DbTables.find(x => x.TableId === table.TableId);
        if (tbl)
          table.Id = tbl.Id;
      }
    })

  }
  columnNameChanged(column: DbColumnModel) {
    console.log(column);
    if (!column.Name)
      return;
    this.websiteService.create(`columns/save-columns.php`, [column]).subscribe((data: WebsiteModel) => {
      if (data && data.WebsiteId && data.DbTables) {
        const col = data.DbTables.find(x => x.TableId === column.TableId)?.Columns?.find(c => c.ColumnId === column.ColumnId);
        if (col)
          column.Id = col.Id;
      }
    })

  }
  selectTab(tab: Itabs) {
    this.tabs.map(x => x.Classes = [])
    this.selectedTab = tab;
    this.selectedTab.Classes = ['active']
  }
  formSubmited(e: any) {
    this.selectTab(this.tabs[0])
    this.getCollections();
  }
}
