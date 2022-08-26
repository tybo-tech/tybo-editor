import { Component, Input, OnInit } from '@angular/core';
import { PageModel } from 'src/app/_classes/PageModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { HelperClass } from 'src/app/_classes/_statics/HelperClass';
import { SectionTypes } from 'src/app/_classes/_statics/SectionTypes';
import { StyleHelper } from 'src/app/_classes/_statics/StyleHelper';
import { EventService } from 'src/app/_services/event.service';

@Component({
  selector: 'app-page-widgets',
  templateUrl: './page-widgets.component.html',
  styleUrls: ['./page-widgets.component.scss']
})
export class PageWidgetsComponent implements OnInit {
  @Input() page: PageModel;
  @Input() website: WebsiteModel;
  SectionTypes = SectionTypes;
  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    // SectionTypes.CONTAINER
  }
  onDrop(innElement: Element, containerWidget: WidgetModel) {
    // debugger
    const draggable = document.querySelector('.dragging');
    if (draggable) {
      const containerId = innElement.getAttribute('id')
      const sectionType = draggable.getAttribute('id');
      if (!sectionType)
        return;

      if (sectionType === SectionTypes.TEXT && containerWidget) {
        const text: WidgetModel = new WidgetModel(HelperClass.getId('text'), containerWidget.WidgetId, this.page.PageId, 'Text', SectionTypes.CARD1, ``);
        text.ElementType = "p";
        text.ItemContent = "I ma text , click here to edit";
        containerWidget.AddChild(text);

      }


      // Container
      if (sectionType === SectionTypes.CONTAINER && containerWidget) {
        const subContainer: WidgetModel = new WidgetModel(HelperClass.getId('text'),containerWidget.WidgetId, this.page.PageId, 'Text', SectionTypes.CONTAINER, ``);
        subContainer.ItemStyle = StyleHelper.getFlexChild();
        subContainer.ItemMobileStyle = StyleHelper.getFlexChild();
        subContainer.SelectedStyle = StyleHelper.getFlexChild();
        containerWidget.AddChild(subContainer)
      }


      // Button
      if (sectionType === SectionTypes.BUTTON && containerWidget) {
        const button: WidgetModel = new WidgetModel(HelperClass.getId('button'), containerWidget.WidgetId, this.page.PageId, 'Text', SectionTypes.BUTTON, ``);
        button.ElementType = "button";
        button.ItemContent = 'Action Name';
        containerWidget.AddChild(button);
      }

      // Image
      if (sectionType === SectionTypes.IMAGE && containerWidget) {
        containerWidget.AddImage(this.page.PageId);
      }




      //Menu
      if (sectionType === SectionTypes.MENU) {

      }

      // Bugger
      if (sectionType === SectionTypes.BURGER_MENU) {
        const menuWidget: WidgetModel = new WidgetModel(
          HelperClass.getId('card-master'), containerWidget.WidgetId, 'master', 'Card-Master-1', SectionTypes.BURGER_MENU, ``);
        menuWidget.ItemCategory = 'Menu';
        menuWidget.ItemEventName = '<i class="fas fa-bars"></i>';

        containerWidget.AddChild(menuWidget);

      }


      draggable.classList.remove('dragging');
      innElement.classList.remove('over');

    }
  }
  onPageDrop(innElement: Element, page: PageModel = this.page) {
    // debugger
    const draggable = document.querySelector('.dragging');
    if (draggable) {
      const containerId = innElement.getAttribute('id')
      const sectionType = draggable.getAttribute('id');
      if (!sectionType)
        return;

      // Container
      if (sectionType === SectionTypes.CONTAINER && page) {
        const subContainer: WidgetModel = new WidgetModel(HelperClass.getId('text'), page.PageId, this.page.PageId, 'Text', SectionTypes.CONTAINER, ``);
        subContainer.ItemStyle = StyleHelper.getFlexRow();
        subContainer.ItemMobileStyle = StyleHelper.getFlexRow();
        subContainer.SelectedStyle = StyleHelper.getFlexRow();
        page.AddContainerWidget(subContainer);
      }
      draggable.classList.remove('dragging');
      innElement.classList.remove('over');

    }
  }
  toggleOptions(inputContainer: WidgetModel) {
    // this.row.ElementId = this.row.RowId;




    this.eventService.updateOptionsState(undefined);
    setTimeout(() => {
      inputContainer.ShowOptions = !inputContainer.ShowOptions;
      if (inputContainer.ShowOptions) {
        this.eventService.updateOptionsState(inputContainer)
      }
      else
        this.eventService.updateOptionsState(undefined);
    }, 100)
  }
}
