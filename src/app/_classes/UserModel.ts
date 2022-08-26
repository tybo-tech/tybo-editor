import { Company } from "./CompanyModel";
import { UserWebsiteModel } from "./UserWebsiteModel";
import { WebsiteModel } from "./WebsiteModel";

export class UserModel {

    UserId: string;
    CompanyId: string;
    UserType: string;
    Name: string;
    Surname: string;
    Email: string;
    PhoneNumber: string;
    Password: string;
    Dp: string;
    CreateDate: string;
    CreateUserId: string;
    ModifyDate: string;
    ModifyUserId: string;
    StatusId: string;
    UserToken: string;
    AddressLineHome: string;
    AddressUrlHome: string;
    AddressLineWork: string;
    AddressUrlWork: string;
    Company: Company;
    Websites: WebsiteModel[];

    constructor(
        UserId: string,
        Email: string,
        Password: string,
        Name: string,
        UserType: string,
    ) {
        this.UserId = UserId;
        this.Email = Email;
        this.Password = Password;
        this.Name = Name;
        this.UserType = UserType;
        this.CreateDate = `${new Date()}`
    }

}

