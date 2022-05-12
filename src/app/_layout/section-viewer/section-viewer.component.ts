import { Component, Input, OnInit } from '@angular/core';
import { ColumnModel } from 'src/app/_classes/ColumnModel';
import { PageModel } from 'src/app/_classes/PageModel';
import { RowModel } from 'src/app/_classes/RowModel';
import { SectionModel } from 'src/app/_classes/SectionModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { DeviceTypes } from 'src/app/_classes/_statics/DeviceTypes';
import { HelperClass } from 'src/app/_classes/_statics/HelperClass';
import { SectionTypes } from 'src/app/_classes/_statics/SectionTypes';
import { SECTION_MINI_MENU } from 'src/app/_mocks/mini-menu';
import { CopyService } from 'src/app/_services/copy.service';
import { EventService } from 'src/app/_services/event.service';
import { ViewModeService } from 'src/app/_services/view-mode.service';

@Component({
  selector: 'app-section-viewer',
  templateUrl: './section-viewer.component.html',
  styleUrls: ['./section-viewer.component.scss']
})
export class SectionViewerComponent implements OnInit {
  @Input() section: SectionModel;
  @Input() website: WebsiteModel;
  @Input() page: PageModel;
  @Input() sectionIndex: number;
  showElementOptions: boolean;
  miniMenu = SECTION_MINI_MENU;
  stylesToPaste: any;
  columnToPaste: ColumnModel;
  widgetToPaste: WidgetModel;
  sectionContentToPaste: SectionModel;
  childStylesToPaste: any;

  constructor(private viewModeService: ViewModeService, private copyService: CopyService, private eventService: EventService) { }

  ngOnInit() {
    this.section.Sort();
    this.viewModeService.deviceModeObservable.subscribe(data => {
      if (data) {
        if (this.website && this.website.ViewDevice === DeviceTypes.PHONE) {
          this.section.SelectedStyle = this.section.ItemMobileStyle;
        }


        if (this.website && this.website.ViewDevice === DeviceTypes.PC) {
          this.section.SelectedStyle = this.section.ItemStyle;
        }
      }
    });


    this.copyService.copiedItemObservable.subscribe(data => {
      if (data) {
        // debugger
        this.stylesToPaste = this.copyService.getStylesToPaste(data);
        this.columnToPaste = this.copyService.getColumnToPaste(data);
        this.widgetToPaste = this.copyService.getWidgetToPaste(data);
        this.sectionContentToPaste = this.copyService.geSectionContentToPaste(data);
      }
    });
  }
  onHover(e: boolean) {
    this.showElementOptions = e;
  }

  showSectionStyleMenu(e: boolean, section: SectionModel) {
    section.ShowOptions = e;
  }
  onStyleChange(event) {
    if (!event)
      return

    if (this.website && this.website.ViewDevice === DeviceTypes.PHONE) {
      this.section.ItemMobileStyle = event;
    }


    if (this.website && this.website.ViewDevice === DeviceTypes.PC) {
      this.section.ItemStyle = event;
    }
  }


  onRightClickSection(pointerEvent: PointerEvent, section: SectionModel) {
    pointerEvent.preventDefault();
    const __target = <HTMLDivElement>pointerEvent.target;
    const classes = Array.from(__target.classList).find(x => x === 'contextmenu_section');
    if (!classes)
      return;
    if (this.page && this.page.Sections)
      this.page.Sections.map(c => c.ShowMiniMenu = false);
    section.ShowMiniMenu = true;
    let cursorX = pointerEvent.pageX;
    let cursorY = pointerEvent.pageY;
    localStorage.setItem("xy", JSON.stringify({ top: `${cursorY - 100}px`, left: `${cursorX}px` }))
    return false;
  }
  selectSectionMenu(action: string, section: SectionModel) {
    section.ShowMiniMenu = false;
    if (action == 'paste-column') {
      section.AddColumn(this.columnToPaste);
    }
    if (action == 'duplicate-section') {
      const sec = new SectionModel(`section-${HelperClass.getId('sec')}`, this.page.PageId, `Section ${this.page.Sections.length + 1}`, '', [], [], SectionTypes.SEC, 'max-width', '80rem');
      sec.ItemStyle = section.ItemStyle;
      sec.ItemClass = section.ItemClass;
      sec.GridStyle = section.GridStyle;
      sec.Rows = section.Rows;
      this.page.AddSection(sec);
    }
    if (action == 'copy-section-styles') {
      this.copyService.copy(section.ItemStyle);

      // But sections also have grid styles, so let copy them too.

      this.copyService.copyChildItem(section.GridStyle)
    }
    if (action == 'paste-section-styles') {

      if (this.website && this.website.ViewDevice === DeviceTypes.PHONE) {
        this.section.ItemMobileStyle = this.stylesToPaste;
      }

      if (this.website && this.website.ViewDevice === DeviceTypes.PC) {
        this.section.ItemStyle = this.stylesToPaste;
      }

      this.section.SelectedStyle = this.stylesToPaste;
    }
    if (action == 'delete-section') {
      if (section.SectionType === SectionTypes.HEADER) {
        this.website.Header = null;
        return;
      }
      if (section.SectionType === SectionTypes.FOOTER) {
        this.website.Footer = null;
        return;
      }
      this.page.Sections.splice(this.sectionIndex, 1);
    }
    if (action == 'copy-section-content') {
      this.copyService.copy(section);
    }
    if (action == 'paste-section-content') {
      section.ItemStyle = this.sectionContentToPaste.ItemStyle;
      section.Columns = this.sectionContentToPaste.Columns;
      section.ItemClass = this.sectionContentToPaste.ItemClass;
    }

    if (action === 'position-up') {
      if (this.sectionIndex > 0) {
        this.page.MoveSectionUp(this.section, this.sectionIndex);
      }

    }

    if (action === 'top') {
      this.page.MoveSectionToTop(this.section);
    }
  }

  preventRightClick(e) {
    e.preventDefault();
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

      if (sectionType === SectionTypes.ROW && this.section) {
        const row = new RowModel(HelperClass.getId('row'), this.section.SectionId, 'Section Row', [], 'Row');
        const col = new ColumnModel(HelperClass.getId('col'), row.RowId, 'Col-1', '', [], 'Grid-col');
        row.ItemStyle = { 'grid-template-columns': col, 'display': 'grid', 'min-height': SectionTypes.BODY_MIN_HEIGHT, }

        row.AddColumn(col);
        this.section.AddRow(row)

      }

      draggable.classList.remove('dragging');
      container.classList.remove('over');

    }
  }

  toggleOptions() {
    this.section.ElementId = HelperClass.getId("element-id");
    this.eventService.updateOptionsState(this.section)
  }
}
