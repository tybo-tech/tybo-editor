import { WidgetModel } from "../_classes/WidgetModel";
import { HelperClass } from "../_classes/_statics/HelperClass";
import { SectionTypes } from "../_classes/_statics/SectionTypes";

export const wid_card: WidgetModel = new WidgetModel('card-1', 'master-column', 'master-page', 'Card', SectionTypes.CARD1);


export const hero_headig: WidgetModel = new WidgetModel('hero-1', 'master-column', 'master-page', "Hero", SectionTypes.HERO);
export const hero_sub_headig: WidgetModel = new WidgetModel('hero-1', 'master-column', 'master-page', 'master-page', "Hero-1", SectionTypes.HERO);
export const hero_button: WidgetModel = new WidgetModel('hero-1', 'master-column', 'master-page', "Hero-1", SectionTypes.HERO);
export const hero_image: WidgetModel = new WidgetModel('hero-1', 'master-column', 'master-page', "Hero-1", SectionTypes.HERO);

export const button: WidgetModel = new WidgetModel('button', 'master-column', 'master-page', "Button", SectionTypes.BUTTON, `assets/images/editor/buttons.svg`);
export const image: WidgetModel = new WidgetModel('image', 'master-column', 'master-page', 'Image', SectionTypes.CARD1, `assets/images/editor/image.svg`)
export const text: WidgetModel = new WidgetModel('text', 'master-column', 'master-page', 'Text', SectionTypes.CARD1, `assets/images/editor/text.svg`);
export const list: WidgetModel = new WidgetModel('list', 'master-column', 'master-page', 'List', SectionTypes.LIST, `assets/images/lists.svg`);
export const menu: WidgetModel = new WidgetModel(HelperClass.getId('pc-menu'), 'master-column', 'master-page', 'Menu', SectionTypes.MENU, `assets/images/navigations.svg`);
export const mobilemenu: WidgetModel = new WidgetModel(HelperClass.getId('mobile-menu'), 'master-column', 'master-page', 'Burger Menu', SectionTypes.BURGER_MENU, `assets/images/widgets/burger.svg`);


hero_headig.ItemContent = 'I am a heading, click me to edit'
hero_headig.ItemStyle["margin-top"] = "80px";
hero_headig.RowNumber = 1;
hero_headig.ColNumber = 1
hero_headig.ElementType = "h1"

hero_sub_headig.ItemContent = 'I am a sub heading, also you can click me';
hero_sub_headig.RowNumber = 2;
hero_sub_headig.ColNumber = 1
hero_sub_headig.ElementType = "h6"

hero_button.ItemContent = 'Get started';
hero_button.RowNumber = 3;
hero_button.ColNumber = 1
hero_button.ElementType = "button"

hero_image.ItemContent = 'assets/images/mock/tech.gif';
hero_image.ItemStyle["width"] = "500px";
hero_image.RowNumber = 1;
hero_image.ColNumber = 2;
hero_image.ElementType = "image"


export const hero_col_1 = [hero_headig, hero_sub_headig, hero_button];
export const hero_col_2 = [hero_image];


// hero_1.HeadingStyles["left"] = "50px"

export const wid_cards: WidgetModel[] = [
    new WidgetModel('card-1', 'master-column', 'master-page', '1 Card', SectionTypes.CARD1, `assets/images/editor/1card.svg`),
    new WidgetModel('card-2', 'master-column', 'master-page', '2 Cards', SectionTypes.CARD2, `assets/images/editor/2cards.svg`),
    new WidgetModel('card-3', 'master-column', 'master-page', '3 Cards', SectionTypes.CARD3, `assets/images/editor/3cards.svg`),
    new WidgetModel('card-4', 'master-column', 'master-page', '4 Cards', SectionTypes.CARD4, `assets/images/editor/4cards.svg`),
    new WidgetModel('card-5', 'master-column', 'master-page', '5 Cards', SectionTypes.CARD5, `assets/images/editor/4cards.svg`),
    new WidgetModel('card-6', 'master-column', 'master-page', '6 Cards', SectionTypes.CARD6, `assets/images/editor/4cards.svg`),
];



export const sections: WidgetModel[] = [
    new WidgetModel('grid-1', 'master-column', 'master-page', '1 Column', SectionTypes.COL1, `assets/images/editor/grid-1.svg`),
    new WidgetModel('grid-2', 'master-column', 'master-page', '2 Columns', SectionTypes.COL2, `assets/images/editor/grid-2.svg`),
    new WidgetModel('grid-3', 'master-column', 'master-page', '3 Columns', SectionTypes.COL3, `assets/images/editor/grid-3.svg`),
    new WidgetModel('grid-4', 'master-column', 'master-page', '4 Columns', SectionTypes.COL4, `assets/images/editor/grid-4.svg`),
    new WidgetModel('grid-5', 'master-column', 'master-page', '5 Columns', SectionTypes.COL5, `assets/images/editor/grid-4.svg`),
    new WidgetModel('grid-6', 'master-column', 'master-page', '6 Columns', SectionTypes.COL6, `assets/images/editor/grid-4.svg`),

];

export const buttons: WidgetModel[] = [
    button
]
export const images: WidgetModel[] = [
    image
]
export const texts: WidgetModel[] = [
    text
]
export const lists: WidgetModel[] = [
    list
]
export const menus: WidgetModel[] = [
    menu
]

export const quickAdd: WidgetModel[] = [
    new WidgetModel('Container', 'master-column', 'master-page', 'Container', SectionTypes.CONTAINER,`assets/images/editor/container.svg`),
    // new WidgetModel('section-empty', 'master-column', 'master-page', 'Empty Section', SectionTypes.EMPTY),
    new WidgetModel('text', 'master-column', 'master-page', 'Text', SectionTypes.TEXT, `assets/images/editor/text.svg`),
    new WidgetModel('image', 'master-column', 'master-page', 'Image', SectionTypes.IMAGE, `assets/images/editor/image.svg`),
    new WidgetModel('card-1', 'master-column', 'master-page', 'Card', SectionTypes.CARD1, `assets/images/editor/1card.svg`),
    button,
    wid_cards[2], wid_cards[3],
    new WidgetModel('card-1', 'master-column', 'master-page', 'Header', SectionTypes.HEADER, `assets/images/editor/1card.svg`),
    new WidgetModel('form-1', 'master-column', 'master-page', 'Forms', SectionTypes.FORM, `assets/images/editor/1card.svg`),
    menu,
    mobilemenu
];

// export const wid_simple_header: WidgetModel = new WidgetModel('simple-nav', 'Simple Navigation bar', "Nav-1", SectionTypes.NAV, []);
