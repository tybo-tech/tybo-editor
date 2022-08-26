export class ImportsModel {

    ImportId: string;
    WebsiteId: string;
    Url: string;
    Name: string;
    ImportType: string;
    CreateUserId: string;
    ModifyUserId: string;
  StatusId: number;


    constructor(
        ImportId: string,
        WebsiteId: string,
        Url: string,
        Name: string,
        ImportType: string
    ) {
        this.ImportId = ImportId;
        this.WebsiteId = WebsiteId;
        this.Url = Url;
        this.Name = Name;
        this.ImportType = ImportType;
    }

}

