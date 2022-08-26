export class DbColumnModel {

    ColumnId: string;
    TableId: string;
    WebsiteId: string;
    Name: string;
    DefaultValue: string;
    Value: string;
    DataType: string;
    OrderNumber: number;
    MinLen: number;
    MaxLen: number;
    IsRequired: string;
    CreateUserId: string;
    ModifyUserId: string;
    CreateDate: string;
    Columns: any[];
    StatusId: number;
    Id?: number;


    constructor(
        ColumnId: string,
        TableId: string,
        WebsiteId: string,
        Name: string,
        DefaultValue: string,
        DataType: string,
        OrderNumber: number,
        MinLen: number,
        MaxLen: number,
        IsRequired: string,
        CreateUserId: string,
        ModifyUserId: string,
        StatusId: number,
    ) {
        this.ColumnId = ColumnId;
        this.TableId = TableId;
        this.WebsiteId = WebsiteId;
        this.DataType = DataType;
        this.OrderNumber = OrderNumber;
        this.CreateUserId = CreateUserId;
        this.ModifyUserId = ModifyUserId;
        this.Name = Name;
        this.DefaultValue = DefaultValue;
        this.MinLen = MinLen;
        this.MaxLen = MaxLen;
        this.IsRequired = IsRequired;
        this.CreateDate = `${new Date()}`
        this.StatusId = StatusId
    }

}

