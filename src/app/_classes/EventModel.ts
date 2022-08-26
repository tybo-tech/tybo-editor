export class EventModel {

    EventId: string;
    WebsiteId: string;
    WidgetId: string;
    Name: string;
    EventType: string;
    Params: any;
    OrderNumber: number;
    CreateUserId: string;
    ModifyUserId: string;
    StatusId: number;


    constructor(
        EventId: string,
        WebsiteId: string,
        WidgetId: string,
        Name: string,
        EventType: string,
        OrderNumber: number,
        Params: string
    ) {
        this.EventId = EventId;
        this.WebsiteId = WebsiteId;
        this.WidgetId = WidgetId;
        this.Name = Name;
        this.EventType = EventType;
        this.OrderNumber = OrderNumber;
        this.Params = Params;
    }

}

