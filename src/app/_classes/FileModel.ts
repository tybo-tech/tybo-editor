export class FileModel {

    FileId: string;
    WebsiteId: string;
    Url: string;
    Name: string;
    AltText: string;
    CreateDate: string;
    StatusId: number;
    CreateUserId: string;
    ModifyUserId: string;
    Id: number;
    constructor(
        FileId: string,
        WebsiteId: string,
        Url: string,
        Name: string,
        AltText: string,
        StatusId: number
    ) {
        this.FileId = FileId;
        this.WebsiteId = WebsiteId;
        this.Url = Url;
        this.Name = Name;
        this.AltText = AltText;
        this.CreateDate = `${new Date()}`
        this.StatusId = StatusId;
    }

}

