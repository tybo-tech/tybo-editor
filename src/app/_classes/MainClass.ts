
export class MainClass {
    _id?: string;
    ParentId: string;
    CreateUserId: string;
    ModifyUserId: string;
    ModifiyDate: string;
    CreateDate: string;
    StatusName: string;
    StatusId: number;
    StyleString: string;
    ItemStyle: any;
    ItemMobileStyle: any;
    SelectedStyle: any;
    ItemClass: string[];
    ItemCategory: string;
    ShowOptions: boolean;
    ShowMiniMenu: boolean;
    OrderNumber: number;
    IsSelected: boolean;
    ElementId: string;
    Settings: any
    constructor(
        Id: string = '',
        ParentId: string = '',
        CreateUserId: string = '',
        ModifyUserId: string = '',
        CreateDate: string = `${new Date()}`,
        ModifiyDate: string = `${new Date()}`,
        StatusName: string = 'Active',
        StatusId: number = 1,
        StyleString: string = '',
        ItemStyle = {},
        ItemMobileStyle = {},
        SelectedStyle = {},
        ItemClass = [],
        ItemCategory = '',
        ShowOptions: boolean = false,
        ShowMiniMenu: boolean = false,
        OrderNumber = 1,
        IsSelected = false

    ) {
        this._id = Id;
        this.ParentId = ParentId;
        this.CreateUserId = CreateUserId;
        this.ModifyUserId = ModifyUserId;
        this.CreateDate = CreateDate;
        this.ModifiyDate = ModifiyDate;
        this.StatusName = StatusName;
        this.StatusId = StatusId;
        this.StyleString = StyleString;
        this.ItemStyle = ItemStyle;
        this.ItemMobileStyle = ItemMobileStyle;
        this.SelectedStyle = SelectedStyle;
        this.ShowOptions = ShowOptions;
        this.ItemClass = ItemClass;
        this.ItemCategory = ItemCategory;
        this.ShowMiniMenu = ShowMiniMenu;
        this.OrderNumber = OrderNumber;
        this.IsSelected = IsSelected;
    }

}
