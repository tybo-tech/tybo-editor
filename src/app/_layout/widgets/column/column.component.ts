
import { Component, Input } from '@angular/core';
import { ColumnModel } from 'src/app/_classes/ColumnModel';
import { FormModel } from 'src/app/_classes/FormModel';
import { PageModel } from 'src/app/_classes/PageModel';
import { RowModel } from 'src/app/_classes/RowModel';
import { SectionModel } from 'src/app/_classes/SectionModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { HelperClass } from 'src/app/_classes/_statics/HelperClass';
import { SectionTypes } from 'src/app/_classes/_statics/SectionTypes';
import { COl_MINI_MENU } from 'src/app/_mocks/mini-menu';
import { EventService } from 'src/app/_services/event.service';

@Component({
    selector: 'app-column',
    templateUrl: 'column.component.html',
    styleUrls: ['column.component.scss']
})
export class ColumnComponent {
    @Input() column: ColumnModel;
    @Input() section: SectionModel;
    @Input() page: PageModel;
    @Input() row: RowModel;
    @Input() website: WebsiteModel;
    @Input() colIndex: number;
    miniMenu = COl_MINI_MENU;

    constructor( private eventService: EventService){}
    closeMenu() {
        this.row.Columns.map(c => c.ShowMiniMenu = false);
    }

    showStyleMenu(e: boolean, column: ColumnModel) {
        column.ShowOptions = e;
    }

    onRightClick(pointerEvent: PointerEvent) {
        pointerEvent.preventDefault()
        this.row.Columns.map(c => c.ShowMiniMenu = false);
        this.column.ShowMiniMenu = true;
        return false;
    }

    miniMenuEvent(event) {
        if (event === "close") {
            this.closeMenu();
            return;
        }

        if (event === 'delete-column') {
            this.row.Columns.splice(this.colIndex, 1);
        }

        if (event === 'position-up') {
            alert('Event not handled')

        }

    }



    onDrop(container: Element) {
        // debugger
        const draggable = document.querySelector('.dragging');
        if (draggable) {
            const containerId = container.getAttribute('id')
            const sectionType = draggable.getAttribute('id');
            if (!sectionType)
                return;

            if (sectionType === SectionTypes.TEXT && this.column) {
                const text: WidgetModel = new WidgetModel(HelperClass.getId('text'), this.column.ColumnId, this.page.PageId, 'Text', SectionTypes.CARD1, ``);
                text.ElementType = "p";
                text.ItemContent = "I ma text , click here to edit";
                this.column.AddWidget(text);

            }


            // Button
            if (sectionType === SectionTypes.BUTTON && this.column) {
                const button: WidgetModel = new WidgetModel(HelperClass.getId('button'), this.column.ColumnId, this.page.PageId, 'Text', SectionTypes.BUTTON, ``);
                button.ElementType = "button";
                button.ItemContent = 'Action Name';
                this.column.AddWidget(button);
            }

            // Image
            if (sectionType === SectionTypes.IMAGE && this.column) {
                const image: WidgetModel = new WidgetModel(HelperClass.getId('image'), this.column.ColumnId, this.page.PageId, 'Text', SectionTypes.CARD1, ``);
                image.ElementType = "image";
                image.ItemContent = 'assets/images/mock/27.png';
                if (this.section.SectionType === SectionTypes.HEADER) {
                    image.PageId = 'master';
                }
                this.column.AddWidget(image);
            }


            //List
            if (sectionType === SectionTypes.LIST && this.column) {
                const listWidget: WidgetModel = new WidgetModel(HelperClass.getId('card-master-1'), this.column.ColumnId, this.page.PageId, 'Card-Master-1', SectionTypes.LIST, ``);
                const listItem1: WidgetModel = new WidgetModel(HelperClass.getId('list'), this.column.ColumnId, this.page.PageId, 'Item 1', SectionTypes.LIST_ITEM, ``);
                const listItem2: WidgetModel = new WidgetModel(HelperClass.getId('list'), this.column.ColumnId, this.page.PageId, 'Item 2', SectionTypes.LIST_ITEM, ``);
                const listItem3: WidgetModel = new WidgetModel(HelperClass.getId('list'), this.column.ColumnId, this.page.PageId, 'Item 3', SectionTypes.LIST_ITEM, ``);

                listWidget.ItemCategory = 'List';
                listWidget.ItemClass = ['grid-3'];
                listItem1.ItemContent = 'Lorem Ipsum is simply dummy ';
                listItem2.ItemContent = 'Lorem Ipsum is simply dummy ';
                listItem3.ItemContent = 'Lorem Ipsum is simply dummy ';
                listWidget.AddChild(listItem1)
                listWidget.AddChild(listItem2)
                listWidget.AddChild(listItem3);
                listWidget.ElementType = "list";
                listWidget.ItemContent = '';
                this.column.AddWidget(listWidget);
            }





            //Card
            if (sectionType === SectionTypes.CARD1 && this.column) {
                const card1: WidgetModel = new WidgetModel(HelperClass.getId('card'), this.column.ColumnId, this.page.PageId, 'Card-1', SectionTypes.CARD1, ``);
                card1.ItemCategory = SectionTypes.CARD;
                card1.ItemContent = 'Lorem Ipsum is simply dummy ';
                card1.ItemHeading = 'Lorem Ipsum.';
                card1.ImageUrl = 'assets/images/mock/27.png';
                card1.ImageStyles = { 'width': '100%' }

                this.column.AddWidget(card1);
            }



            //Menu
            if (sectionType === SectionTypes.MENU) {
                const menuWidget: WidgetModel = new WidgetModel(
                    HelperClass.getId('card-master'), this.column.ColumnId, 'master', 'Card-Master-1', SectionTypes.MENU, ``);
                menuWidget.ItemCategory = 'Menu';

                if (this.website && this.website.Pages) {
                    menuWidget.Children = [];
                    this.website.Pages.forEach(page => {
                        const menuItem: WidgetModel = new WidgetModel(HelperClass.getId('menu'), this.column.ColumnId, 'master', 'Item', SectionTypes.MENU_ITEM, ``);
                        menuItem.ItemContent = page.Name;
                        menuItem.ItemEvent = page.Url;
                        menuWidget.Children.push(menuItem);
                    })
                }

                this.column.AddWidget(menuWidget);

            }

            if (sectionType === SectionTypes.BURGER_MENU) {
                const menuWidget: WidgetModel = new WidgetModel(
                    HelperClass.getId('card-master'), this.column.ColumnId, 'master', 'Card-Master-1', SectionTypes.BURGER_MENU, ``);
                menuWidget.ItemCategory = 'Menu';
                menuWidget.ItemEventName = '<i class="fas fa-bars"></i>';


                if (this.website && this.website.Pages) {
                    menuWidget.Children = [];
                    this.website.Pages.forEach(page => {
                        const menuItem: WidgetModel = new WidgetModel(HelperClass.getId('menu'), this.column.ColumnId, 'master', 'Item', SectionTypes.MENU_ITEM, ``);
                        menuItem.ItemContent = page.Name;
                        menuItem.ItemEvent = page.Url;
                        menuItem.ItemStyle = {
                            "color": "#000000",
                            "font-weight": "700",
                            "text-align": "center",
                            "width": "100%",
                            "display": "block",
                            'margin-top': '2px',
                            'margin-bottom': '2px',
                        }

                        menuItem.ItemMobileStyle = menuItem.ItemStyle;
                        menuItem.SelectedStyle = menuItem.ItemStyle;
                        menuWidget.Children.push(menuItem);
                    });

                    const menuItemWrapper: WidgetModel = new WidgetModel(HelperClass.getId('menu-wrapper'), this.column.ColumnId, 'master', 'Item', SectionTypes.MENU_WRAPPER, ``);
                    menuItemWrapper.ItemStyle = {
                        'position': 'absolute',
                        top: 0,
                        right: 0,
                        height: '100vh',
                        width: '90%',
                        'z-index': 1000,
                        'background': '#ffffff',
                        'padding-left': '4px',
                        'padding-right': '4px',
                        'color': '#000000',
                        'border': 'none',
                        'border-radius': '0',
                        'padding-top': "15px"
                    }
                    menuItemWrapper.ItemMobileStyle = menuItemWrapper.ItemStyle;
                    menuItemWrapper.SelectedStyle = menuItemWrapper.ItemStyle;
                    menuWidget.Children.push(menuItemWrapper);

                }

                this.column.AddWidget(menuWidget);

            }

            //Forms
            if (sectionType === SectionTypes.FORM) {
                const menuWidget: WidgetModel = new WidgetModel(HelperClass.getId('form'), this.column.ColumnId, this.page.PageId, 'Form', SectionTypes.FORM, ``);
                menuWidget.ItemCategory = SectionTypes.FORM;

                menuWidget.Form = new FormModel(HelperClass.getId('form'), 'Contact', [], []);
                menuWidget.Form.AddInputRange(3, ['text', 'email', 'tel'], ['Your name', 'Your email', 'Phone number']);
                menuWidget.Form.AddInputRange(1, ['textarea'], ['Enter your message here']);
                menuWidget.Form.AddInputRange(1, ['button'], ['Send message now']);

                this.column.AddWidget(menuWidget);

            }


            draggable.classList.remove('dragging');
            container.classList.remove('over');

        }
    }
    toggleOptions() {
        this.column.ElementId = HelperClass.getId("element-id");
        this.eventService.updateOptionsState(this.column)
    }
}
