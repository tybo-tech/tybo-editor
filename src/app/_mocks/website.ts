import { PageModel } from "../_classes/PageModel";
import { ToolbarModel } from "../_classes/ToolbarModel";
import { WebsiteModel } from "../_classes/WebsiteModel";
import { WebstyleModel } from "../_classes/WebstyleModel";
import { DeviceTypes } from "../_classes/_statics/DeviceTypes";
import { HelperClass } from "../_classes/_statics/HelperClass";
import { WebsiteModes } from "../_classes/_statics/WebsiteModes";


export const pages: PageModel[] = [
    new PageModel(HelperClass.getId(`page`), true, false, 'Home', 'Home', '/', "Active", {}, []),
    new PageModel(HelperClass.getId(`page`), true, true, 'Templates', 'Templates', '/pages/templates', "Active", {}, []),
    new PageModel(HelperClass.getId(`page`), true, true, 'Price List', 'Price List', '/pages/price-list', "Active", {}, []),
    new PageModel(HelperClass.getId(`page`), true, true, 'Contacts', 'Contacts', '/pages/contacts', "Active", {}, []),
    new PageModel(HelperClass.getId(`page`), true, true, 'Editor', 'Create a website', '/home/create-website', "Active", {}, [], 'btn btn-primary'),
];

export const newWebsite: WebsiteModel =
    new WebsiteModel(
        'tybo.co.za',
        'Tybo',
        'tybo.co.za',
        'assets/images/mock/19.png',
        {},
        {},
        'Tybo Editor',
        'Technology',
        'Software development',
        'assets/images/mock/logo.png',
        pages,
        undefined,
        "fixed",
        "classic header",
        "visible",
        undefined,
        WebsiteModes.EDIT,
        DeviceTypes.PC,
        DeviceTypes.PC_WIDTH
    );


const homePage = new PageModel(HelperClass.getId(`page`), true, false, 'Home', 'Home', '/', "Active", {}, []);
const servicePage = new PageModel(HelperClass.getId(`page`), true, true, 'Solutions', 'Solutions', '/pages/solutions', "Active", {}, []);
const contactPage = new PageModel(HelperClass.getId(`page`), true, true, 'Contacts', 'Contacts', '/pages/contacts', "Active", {}, []);
const editPage = new PageModel(HelperClass.getId(`page`), true, true, 'Editor', 'Open Editor', '/pages/editor', "Active", {}, [], 'btn btn-primary');
editPage.Settings = {'role': 'admin'};
export const blackWebsite: WebsiteModel =
    new WebsiteModel(
        HelperClass.getId('website'),
        '',
        '',
        '',
        {},
        {},
        '',
        '',
        '',
        '',
        [homePage, servicePage, contactPage,editPage],
        undefined,
        "fixed",
        "classic header",
        "visible",
        undefined,
        WebsiteModes.EDIT,
        DeviceTypes.PC,
        DeviceTypes.PC_WIDTH
    );
    blackWebsite.ItemClass = ['body']
    blackWebsite.WebsiteStyles= [];
    const style : WebstyleModel = new WebstyleModel(HelperClass.getId('style'),blackWebsite.WebsiteId, 'body',{},{},{});
    blackWebsite.WebsiteStyles.push(style)