import { ToolbarModel } from "../_classes/ToolbarModel";
import { SectionTypes } from "../_classes/_statics/SectionTypes";
import { buttons, images, lists, menus, quickAdd, sections as columns, texts, wid_cards } from "./widgets";

// export const mainMenu: ToolbarModel[] = [
//     new ToolbarModel('Add Item', `["color: red"]`, 'Section', [], '<i class="fas fa-plus"></i>')
// ];


// export const menuSections: ToolbarModel[] = [
//     new ToolbarModel('Cards',`["color: red"]`,'Cards', [],'assets/images/web.svg',[],wid_cards),
//     new ToolbarModel('About',`["color: red"]`,'Image', [],'assets/images/web.svg'),
//     new ToolbarModel('Blank',`["color: red"]`,'Section', [], 'assets/images/web.svg'),
//     new ToolbarModel('Text',`["color: red"]`,'Text', [],'assets/images/web.svg'),
//     new ToolbarModel('Image',`["color: red"]`,'Image', [],'assets/images/web.svg'),
// ];


export const subMenu: ToolbarModel[] = [
    new ToolbarModel('Quick Add', `["color: red"]`, 'Quick-Add', [], 'assets/images/web.svg', [], quickAdd),
    new ToolbarModel('Columns', `["color: red"]`, 'Section', [], 'assets/images/web.svg', [], columns),
    new ToolbarModel('Cards', `["color: red"]`, 'Text', [], 'assets/images/web.svg', [], wid_cards),
    new ToolbarModel('Text', `["color: red"]`, 'Text', [], 'assets/images/web.svg', [], texts),
    new ToolbarModel('Buttons', `["color: red"]`, 'Text', [], 'assets/images/web.svg', [], buttons),
    new ToolbarModel('Image', `["color: red"]`, 'Image', [], 'assets/images/web.svg', [], images),
    new ToolbarModel('List', `["color: red"]`, 'List', [], 'assets/images/list.svg', [], lists),
    new ToolbarModel('Menu', `["color: red"]`, 'Menu', [], 'assets/images/list.svg', [], menus),
];

export const COL_IMAGES = [

    { Id: 1, Name: SectionTypes.COL1, ImageUrl: `assets/images/editor/g-1.svg` },
    { Id: 2, Name: SectionTypes.COL2, ImageUrl: `assets/images/editor/g-2.svg` },
    { Id: 3, Name: SectionTypes.COL3, ImageUrl: `assets/images/editor/g-3.svg` },
    { Id: 4, Name: SectionTypes.COL4, ImageUrl: `assets/images/editor/g-4.svg` }
]

