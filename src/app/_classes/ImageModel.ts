import { MainClass } from "./MainClass";

export class ImageModel extends MainClass {
    Url: string;
    Name: string;
    constructor(
        Url: string,
        Name: string = '',
    ) {
        super();
        this.Url = Url;
        this.Name = Name;
    }

}
