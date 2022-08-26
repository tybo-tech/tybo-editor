import { MainClass } from "./MainClass";
import { RowModel } from "./RowModel";

export class WebstyleModel extends MainClass {

    WebStyleId: string;
    WebsiteId: string;
    SelectorName: string;
    PcStyles: any;
    TabStyles: any;
    PhoneStyles: any;

    constructor(

        WebStyleId: string,
        WebsiteId: string,
        SelectorName: string,
        PcStyles: any = {},
        TabStyles: any = {},
        PhoneStyles: any = {},
    ) {
        super();
        this.WebStyleId = WebStyleId;
        this.WebsiteId = WebsiteId;
        this.SelectorName = SelectorName;
        this.PcStyles = PcStyles;
        this.TabStyles = TabStyles;
        this.PhoneStyles = PhoneStyles;

    }

}

