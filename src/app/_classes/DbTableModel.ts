import { DbColumnModel } from "./DbColumnModel";

export class DbTableModel {

    Id?: number;
    TableId: string;
    WebsiteId: string;
    Name: string;
    OrderNumber: number;
    CreateDate: string;
    Columns: DbColumnModel[];
    CreateUserId: string;
    ModifyUserId: string;
    Classes: string[];
    StatusId: number;
    
    constructor(
        TableId: string,
        WebsiteId: string,
        Name: string,
        OrderNumber: number,
        CreateUserId: string,
        ModifyUserId: string,
        StatusId: number
    ) {
        this.TableId = TableId;
        this.WebsiteId = WebsiteId;
        this.Name = Name;
        this.OrderNumber = OrderNumber;
        this.StatusId = StatusId;
        this.CreateUserId = CreateUserId;
        this.ModifyUserId = ModifyUserId;
        this.CreateDate = `${new Date()}`
    }

}

