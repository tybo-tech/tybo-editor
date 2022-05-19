import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ColumnModel } from 'src/app/_classes/ColumnModel';
import { PageModel } from 'src/app/_classes/PageModel';
import { RowModel } from 'src/app/_classes/RowModel';
import { SectionModel } from 'src/app/_classes/SectionModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { DeviceTypes } from 'src/app/_classes/_statics/DeviceTypes';
import { HelperClass } from 'src/app/_classes/_statics/HelperClass';
import { SectionTypes } from 'src/app/_classes/_statics/SectionTypes';
import { ROW_MINI_MENU } from 'src/app/_mocks/mini-menu';
import { CopyService } from 'src/app/_services/copy.service';
import { EventService } from 'src/app/_services/event.service';
import { ViewModeService } from 'src/app/_services/view-mode.service';

@Component({
    selector: 'app-row',
    templateUrl: 'row.component.html',
    styleUrls: ['row.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class RowComponent {
    @Input() section: SectionModel;
    @Input() website: WebsiteModel;
    @Input() page: PageModel;
    @Input() row: RowModel;
    @Input() rowIndex: number;
    miniMenu = ROW_MINI_MENU;
    stylesToPaste: any;

    constructor(private copyService: CopyService, private viewModeService: ViewModeService, private eventService: EventService) { }

    ngOnInit(): void {

        this.viewModeService.deviceModeObservable.subscribe(data => {
            if (data) {
                if (this.website && this.website.ViewDevice === DeviceTypes.PHONE) {
                    this.row.SelectedStyle = this.row.ItemMobileStyle;
                }


                if (this.website && this.website.ViewDevice === DeviceTypes.PC) {
                    this.row.SelectedStyle = this.row.ItemStyle;
                }
            }
        });

        this.copyService.copiedItemObservable.subscribe(data => {
            if (data) {
                // debugger
                this.stylesToPaste = this.copyService.getStylesToPaste(data);
                //   this.columnToPaste = this.copyService.getColumnToPaste(data);
                //   this.widgetToPaste = this.copyService.getWidgetToPaste(data);
                //   this.sectionContentToPaste = this.copyService.geSectionContentToPaste(data);
            }
        });

        // this.eventService.updatedObservable.subscribe(data => {

        //     if (this.row && data && data.ElementId === this.row.RowId) {
        //         // debugger
        //         this.row.SelectedStyle = data.SelectedStyle;
        //         console.log(this.row);
        //         // alert(3)

        //     }
        // })
    }


    onDrop(container: Element) {
        // debugger
        const draggable = document.querySelector('.dragging');
        if (draggable) {
            const containerId = container.getAttribute('id')
            const sectionType = draggable.getAttribute('id');
            if (!sectionType)
                return;



            //Columns

            if (sectionType.includes("Column")) {
                const count = parseFloat(sectionType);
                this.row.AddColumnRange(count);
            }
            draggable.classList.remove('dragging');
            container.classList.remove('over');

        }
    }

    onRightClick(pointerEvent: MouseEvent) {
        pointerEvent.preventDefault()
        this.section.Rows.map(c => c.ShowMiniMenu = false);
        this.row.ShowMiniMenu = true;
        return false;
    }

    showStyleMenu(e: boolean, row: RowModel) {
        row.ShowOptions = e;
    }

    closeMenu() {
        this.section.Rows.map(c => c.ShowMiniMenu = false);
    }
    miniMenuEvent(e:any) {
        this.section.Rows.map(c => c.ShowMiniMenu = false);
        if (e === "close") {
            this.closeMenu();
            return;
        }

        if (e === 'delete-row') {
            this.section.Rows.splice(this.rowIndex, 1);
        }

        if (e === 'copy-row-styles') {

            if (this.website && this.website.ViewDevice === DeviceTypes.PHONE) {
                this.copyService.copy(this.row.ItemMobileStyle);
            }


            if (this.website && this.website.ViewDevice === DeviceTypes.PC) {
                this.copyService.copy(this.row.ItemStyle);
            }
        }

        if (e == 'paste-row-styles') {

            if (this.website && this.website.ViewDevice === DeviceTypes.PHONE) {
                this.section.ItemMobileStyle = this.stylesToPaste;
            }

            if (this.website && this.website.ViewDevice === DeviceTypes.PC) {
                this.section.ItemStyle = this.stylesToPaste;
            }

            this.section.SelectedStyle = this.stylesToPaste;
        }

        if (e === 'position-up') {
            if (this.rowIndex > 0) {
                this.section.MoveRowUp(this.row, this.rowIndex);
            }

        }

    }

    toggleOptions() {
        // this.row.ElementId = this.row.RowId;




        this.eventService.updateOptionsState(null);
        setTimeout(() => {
            this.row.ShowOptions = !this.row.ShowOptions;
            if (this.row.ShowOptions) {
                this.row.ElementId = HelperClass.getId("element-id");
                this.eventService.updateOptionsState(this.row)
            }
            else
                this.eventService.updateOptionsState(null);
        }, 100)
    }
}
