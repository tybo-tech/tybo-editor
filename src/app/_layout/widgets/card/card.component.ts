
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { DeviceTypes } from 'src/app/_classes/_statics/DeviceTypes';
import { SectionTypes } from 'src/app/_classes/_statics/SectionTypes';
import { CopyService } from 'src/app/_services/copy.service';
import { ViewModeService } from 'src/app/_services/view-mode.service';

@Component({
    selector: 'app-card',
    templateUrl: 'card.component.html',
    styleUrls: ['card.component.scss']
})
export class CardComponent {
    @Input() card: WidgetModel;
    @Input() website: WebsiteModel;
    @Output() deleteEvent: EventEmitter<any> = new EventEmitter();

    stylesToPaste: any;
    constructor(
        private copyService: CopyService,
        private viewModeService: ViewModeService
    ) { }


    ngOnInit() {
        this.card.ShowMiniMenu = false;
        this.card.ShowOptions = false;
        this.copyService.copiedItemObservable.subscribe(data => {
            if (data)
                this.stylesToPaste = data;
        });

        this.viewModeService.deviceModeObservable.subscribe(data => {
            if (data) {
                if (this.website && this.website.ViewDevice === DeviceTypes.PHONE) {
                    this.card.SelectedStyle = this.card.ItemMobileStyle;
                }


                if (this.website && this.website.ViewDevice === DeviceTypes.PC) {
                    this.card.SelectedStyle = this.card.ItemStyle;
                }
            }
        });
    }

    OnCopyEvent(event: string, widget: WidgetModel, itemName: string) {
        // debugger
        if (itemName === 'ItemHeading')
            widget.HeadingStyles = event;

        if (itemName === 'ItemContent')
            widget.ContentStyles = event;

        if (itemName === 'ImageUrl')
            widget.ImageStyles = event;
    }



    valueChanged(event: string, widget: WidgetModel, itemName: string) {
        if (itemName === 'ItemHeading')
            widget.ItemHeading = event;

        if (itemName === 'ItemContent')
            widget.ItemContent = event;

        if (itemName === 'ImageUrl')
            widget.ImageUrl = event;

        if (itemName === 'ItemEventName')
            widget.ItemEventName = event;
    }


    showStyleMenu(e: boolean) {
        this.card.ShowOptions = e;
    }

    onRightClick(pointerEvent: MouseEvent) {
        pointerEvent.preventDefault();


        // this.card.Children.map(c => c.ShowMiniMenu = false);
        this.card.ShowMiniMenu = true;
        return false;
    }

    selectMenu(action: string, widget: WidgetModel) {
        if (action === 'copy-styles') {
            this.copyService.copy(widget.ItemStyle);
        }
        if (action === 'delete') {
            this.deleteEvent.emit(this.card);
        }
        if (action === 'paste-styles') {
            if (this.website && this.website.ViewDevice === DeviceTypes.PHONE) {
                this.card.ItemMobileStyle = this.stylesToPaste;
            }

            if (this.website && this.website.ViewDevice === DeviceTypes.PC) {
                this.card.ItemStyle = this.stylesToPaste;
            }

            this.card.SelectedStyle = this.stylesToPaste;
        }

    }

    closeMenu() {
        this.card.ShowMiniMenu = false;
    }

    onCardDrop(container: Element) {
        // debugger
        const draggable = document.querySelector('.dragging');
        console.log(draggable, this.card);

        if (draggable && this.card) {
            const sectionType = draggable.getAttribute('id');
            if (!sectionType)
                return;


            if (sectionType === SectionTypes.TEXT) {
                this.card.ItemContent = "I ma text , click here to edit";
            }


            if (sectionType === SectionTypes.IMAGE) {
                this.card.ImageUrl = 'assets/images/mock/27.png';
            }


            if (sectionType === SectionTypes.BUTTON) {
                this.card.ItemEventName = 'Click me';
            }

            draggable.classList.remove('dragging');
            container.classList.remove('over');

        }


    }

    onImageChange(event: string, card: WidgetModel) {
        card.ImageUrl = event;
    }
    onDelete(e:any, eventName:any) {
        if (e && eventName === 'ImageUrl')
            this.card.ImageUrl = e;
        return;
    }
}
