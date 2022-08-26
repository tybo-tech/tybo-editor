import { DbColumnModel } from "./DbColumnModel";

export class DbCollectionModel {

    _id?: string;
    DataId: string;
    WebsiteId: string;
    TableId: string;
    TableName: string;
    Data: any;
    CreatedBy: string;
    CreateDate: string;
    Classes: string[];
    IsEdit: boolean;


    constructor(
        DataId: string,
        WebsiteId: string,
        TableId: string,
        TableName: string,
        Data: any,
        CreatedBy: string
    ) {
        this.DataId = DataId;
        this.TableId = TableId;
        this.WebsiteId = WebsiteId;
        this.CreatedBy = CreatedBy;
        this.TableName = TableName;
        this.Data = Data;
        this.CreateDate = `${new Date()}`
    }

}

