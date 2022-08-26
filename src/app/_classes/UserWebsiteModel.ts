export class UserWebsiteModel {

    WebsiteId: string;
    Url: string;
    Name: string;
    CreateDate: string;


    constructor(
        WebsiteId: string,
        Url: string,
        Name: string,
    ) {
        this.WebsiteId = WebsiteId;
        this.Url = Url;
        this.Name = Name;
        this.CreateDate = `${new Date()}`
    }

}

