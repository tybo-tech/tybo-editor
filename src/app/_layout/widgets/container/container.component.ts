import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { ContainerModel } from 'src/app/_classes/ContainerModel';
import { FormModel } from 'src/app/_classes/FormModel';
import { PageModel } from 'src/app/_classes/PageModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { HelperClass } from 'src/app/_classes/_statics/HelperClass';
import { SectionTypes } from 'src/app/_classes/_statics/SectionTypes';
import { StyleHelper } from 'src/app/_classes/_statics/StyleHelper';
import { EventService } from 'src/app/_services/event.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  @Input() container: ContainerModel;
  @Input() page: PageModel;
  @Input() website: WebsiteModel;
  constructor(private eventService: EventService) { }

  ngOnInit(): void {
  }

  toggleOptions(inputContainer: ContainerModel) {
    // this.row.ElementId = this.row.RowId;




    this.eventService.updateOptionsState(null);
    setTimeout(() => {
      inputContainer.ShowOptions = !inputContainer.ShowOptions;
      if (inputContainer.ShowOptions) {
        this.eventService.updateOptionsState(inputContainer)
      }
      else
        this.eventService.updateOptionsState(null);
    }, 100)
  }

  onDragEnded(event: CdkDragEnd) {
    console.log(event);

  }


  onDrop(innElement: Element, container: ContainerModel) {
    // debugger
    const draggable = document.querySelector('.dragging');
    if (draggable) {
      const containerId = innElement.getAttribute('id')
      const sectionType = draggable.getAttribute('id');
      if (!sectionType)
        return;

      if (sectionType === SectionTypes.TEXT && container) {
        const text: WidgetModel = new WidgetModel(HelperClass.getId('text'), container.ContainerId, this.page.PageId, 'Text', SectionTypes.CARD1, ``);
        text.ElementType = "p";
        text.ItemContent = "I ma text , click here to edit";
        container.AddWidget(text);

      }


      // Container
      if (sectionType === SectionTypes.CONTAINER && container) {
        const subContainer = new ContainerModel(HelperClass.getId('container'), this.page.PageId, 'Container', '', [], SectionTypes.CONTAINER);
        subContainer.ItemStyle = StyleHelper.getFlexRow();
        subContainer.ItemMobileStyle = StyleHelper.getFlexRow();
        subContainer.SelectedStyle = StyleHelper.getFlexRow();
        container.AddContainer(subContainer);
      }


      // Button
      if (sectionType === SectionTypes.BUTTON && container) {
        const button: WidgetModel = new WidgetModel(HelperClass.getId('button'), container.ContainerId, this.page.PageId, 'Text', SectionTypes.BUTTON, ``);
        button.ElementType = "button";
        button.ItemContent = 'Action Name';
        container.AddWidget(button);
      }

      // Image
      if (sectionType === SectionTypes.IMAGE && container) {
        container.AddImage(this.page.PageId);
      }


      //List
      if (sectionType === SectionTypes.LIST && container) {
        const listWidget: WidgetModel = new WidgetModel(HelperClass.getId('card-master-1'), container.ContainerId, this.page.PageId, 'Card-Master-1', SectionTypes.LIST, ``);
        const listItem1: WidgetModel = new WidgetModel(HelperClass.getId('list'), container.ContainerId, this.page.PageId, 'Item 1', SectionTypes.LIST_ITEM, ``);
        const listItem2: WidgetModel = new WidgetModel(HelperClass.getId('list'), container.ContainerId, this.page.PageId, 'Item 2', SectionTypes.LIST_ITEM, ``);
        const listItem3: WidgetModel = new WidgetModel(HelperClass.getId('list'), container.ContainerId, this.page.PageId, 'Item 3', SectionTypes.LIST_ITEM, ``);

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
        container.AddWidget(listWidget);
      }





      //Card
      if (sectionType === SectionTypes.CARD1 && container) {
        const card1: WidgetModel = new WidgetModel(HelperClass.getId('card'), container.ContainerId, this.page.PageId, 'Card-1', SectionTypes.CARD1, ``);
        card1.ItemCategory = SectionTypes.CARD;
        card1.ItemContent = 'Lorem Ipsum is simply dummy ';
        card1.ItemHeading = 'Lorem Ipsum.';
        card1.ImageUrl = 'assets/images/mock/27.png';
        card1.ImageStyles = { 'width': '100%' }

        container.AddWidget(card1);
      }



      //Menu
      if (sectionType === SectionTypes.MENU) {

      }

      // Bugger
      if (sectionType === SectionTypes.BURGER_MENU) {
        const menuWidget: WidgetModel = new WidgetModel(
          HelperClass.getId('card-master'), container.ContainerId, 'master', 'Card-Master-1', SectionTypes.BURGER_MENU, ``);
        menuWidget.ItemCategory = 'Menu';
        menuWidget.ItemEventName = '<i class="fas fa-bars"></i>';

        container.AddWidget(menuWidget);

      }

      //Forms
      if (sectionType === SectionTypes.FORM) {
        const menuWidget: WidgetModel = new WidgetModel(HelperClass.getId('form'), container.ContainerId, this.page.PageId, 'Form', SectionTypes.FORM, ``);
        menuWidget.ItemCategory = SectionTypes.FORM;

        menuWidget.Form = new FormModel(HelperClass.getId('form'), 'Contact', [], []);
        menuWidget.Form.AddInputRange(3, ['text', 'email', 'tel'], ['Your name', 'Your email', 'Phone number']);
        menuWidget.Form.AddInputRange(1, ['textarea'], ['Enter your message here']);
        menuWidget.Form.AddInputRange(1, ['button'], ['Send message now']);

        container.AddWidget(menuWidget);

      }


      draggable.classList.remove('dragging');
      innElement.classList.remove('over');

    }
  }
}
