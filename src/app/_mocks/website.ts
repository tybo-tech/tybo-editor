import { PageModel } from "../_classes/PageModel";
import { ToolbarModel } from "../_classes/ToolbarModel";
import { WebsiteModel } from "../_classes/WebsiteModel";
import { DeviceTypes } from "../_classes/_statics/DeviceTypes";
import { HelperClass } from "../_classes/_statics/HelperClass";
import { WebsiteModes } from "../_classes/_statics/WebsiteModes";


export const pages: PageModel[] = [
    new PageModel(HelperClass.getId(`page`), true, false, 'Home', 'Home', '/', "Active", '{"color": "red"}', []),
    new PageModel(HelperClass.getId(`page`), true, true, 'Solutions', 'Solutions', '/pages/solutions', "Active", '{"color": "red"}', []),
    new PageModel(HelperClass.getId(`page`), true, true, 'Templates', 'Templates', '/pages/templates', "Active", '{"color": "red"}', []),
    new PageModel(HelperClass.getId(`page`), true, true, 'Website categories', 'Website categories', '/pages/website-categories', "Active", '{"color": "red"}', []),
    new PageModel(HelperClass.getId(`page`), true, true, 'Price List', 'Price List', '/pages/price-list', "Active", '{"color": "red"}', []),
    new PageModel(HelperClass.getId(`page`), true, true, 'Contacts', 'Contacts', '/pages/contacts', "Active", '{"color": "red"}', []),
    new PageModel(HelperClass.getId(`page`), true, true, 'Editor', 'Open Editor', '/pages/editor', "Active", '{"color": "red"}', [], 'btn btn-primary'),
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
        null,
        "fixed",
        "classic header",
        "visible",
        null,
        WebsiteModes.EDIT,
        DeviceTypes.PC,
        DeviceTypes.PC_WIDTH
    );
