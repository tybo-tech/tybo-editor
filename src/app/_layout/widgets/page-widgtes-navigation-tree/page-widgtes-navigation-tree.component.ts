import { Component, Input, OnInit } from '@angular/core';
import { PageModel } from 'src/app/_classes/PageModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { HelperClass } from 'src/app/_classes/_statics/HelperClass';
import { SectionTypes } from 'src/app/_classes/_statics/SectionTypes';
import { StyleHelper } from 'src/app/_classes/_statics/StyleHelper';
import { EventService } from 'src/app/_services/event.service';

@Component({
  selector: 'app-page-widgtes-navigation-tree',
  templateUrl: './page-widgtes-navigation-tree.component.html',
  styleUrls: ['./page-widgtes-navigation-tree.component.scss']
})
export class PageWidgtesNavigationTreeComponent implements OnInit {

  @Input() page: PageModel;
  @Input() website: WebsiteModel;
  @Input() widget: WidgetModel;
  SectionTypes = SectionTypes;
  selectedTreeNode: WidgetModel;
  constructor(private eventService: EventService) { }

  ngOnInit(): void {

  }
  public selectNode(node: WidgetModel): void {

    this.selectedTreeNode = node;

    console.group("Selected Tree Node");
    console.log("Label:", node.Name);
    console.log("Children:", node.Children.length);
    console.groupEnd();

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
