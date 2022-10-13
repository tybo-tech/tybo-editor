import { Component, Input, OnInit } from '@angular/core';
import { PageModel } from 'src/app/_classes/PageModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { CoordinatesHelper } from 'src/app/_classes/_statics/CoordinatesHelper';
import { GroupHelper } from 'src/app/_classes/_statics/GroupHelper';
import { HelperClass } from 'src/app/_classes/_statics/HelperClass';
import { JsonParserHelper } from 'src/app/_classes/_statics/JsonParserHelper';
import { SectionTypes } from 'src/app/_classes/_statics/SectionTypes';
import { StyleHelper } from 'src/app/_classes/_statics/StyleHelper';
import { WidgetHelper } from 'src/app/_classes/_statics/WidgetHelper';
import { EventService } from 'src/app/_services/event.service';
import { GroupService } from 'src/app/_services/group.service';
import { WebsiteService } from 'src/app/_services/website.service';

@Component({
  selector: 'app-dock-page',
  templateUrl: './dock-page.component.html',
  styleUrls: ['./dock-page.component.scss']
})
export class DockPageComponent implements OnInit {
  @Input() website: WebsiteModel;
  @Input() page: PageModel;
  @Input() widget: WidgetModel;
  SectionTypes = SectionTypes;
  selecedWidget: any;
  key: string;
  selectedWidgets: WidgetModel[];
  constructor(private websiteService: WebsiteService, private eventService: EventService, private groupService: GroupService) { }

  ngOnInit(): void {
    if (!this.page.Widgets?.length) {
      const section: WidgetModel = WidgetHelper.createWidget('Section 1', SectionTypes.CONTAINER, this.page.PageId, 'section');
      section.GetClass(this.website, 'page-section', StyleHelper.getFlex());
      this.page.Widgets.push(section);
      console.log(section);
      this.websiteService.saveAddedWidget(section, this.website);
      this.websiteService.updateWebsieState(this.website);
    }
    if (this.page.Widgets?.length) {
      WidgetHelper.proccessWidget(this.widget, this.website, this.page);

    }
    this.eventService.keyEventObservable.subscribe(key => {
      this.key = key;
    })
  }


  onDrop(innElement: Element, containerWidget: WidgetModel) {
    const draggable = document.querySelector('.dragging');
    let isTemplate = false;
    if (draggable) {
      const sectionType = draggable.getAttribute('id');
      if (!sectionType) {
        draggable.classList.remove('dragging');
        innElement.classList.remove('over');
        return;
      }
      // Check if contianer is a database placeholder
      if (containerWidget.ParentWidget) {
        isTemplate = true;
        containerWidget = containerWidget.ParentWidget;
      }


      // Check if item beng dragged is na existing widget
      // const existingWidget: WidgetModel = WidgetHelper.getWidget(this.page.Widgets, sectionType);
      // if (existingWidget) {
      //   const temp = existingWidget;
      //   temp.ParentId = containerWidget.WidgetId;
      //   this.page.Widgets = this.recursiveRemove(this.page.Widgets, sectionType);
      //   containerWidget.Children.push(temp);
      //   draggable.classList.remove('dragging');
      //   innElement.classList.remove('over');
      //   return;
      // }
      // debugger
      // Text
      if (sectionType === SectionTypes.TEXT && containerWidget) {
        const text: WidgetModel = new WidgetModel(HelperClass.getId('text'), containerWidget.WidgetId, containerWidget.PageId, 'Text', SectionTypes.TEXT, ``);
        text.ElementType = "p";
        text.ItemContent = `
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum harum illum perspiciatis atque consequatur delectus amet
          impedit nam ullam nisi, similique vel maxime? 
          Nostrum quia non nam placeat, alias iste.
`;
        text.Settings = JsonParserHelper.loadSettings(text);

        text.ParentId = containerWidget.WidgetId;
        text.GetClass(this.website, 'text', StyleHelper.getTextStyles())
        containerWidget.AddChild(text);
        this.websiteService.updateWebsieState(this.website);
        this.websiteService.saveAddedWidget(text, this.website);
      }

      // Heading
      if (sectionType === SectionTypes.HEADING && containerWidget) {
        const text: WidgetModel = new WidgetModel(HelperClass.getId('heading'), containerWidget.WidgetId, containerWidget.PageId, 'Heading', SectionTypes.HEADING, ``);
        text.ElementType = "h1";
        text.ItemContent = `Heading`;
        text.Settings = JsonParserHelper.loadSettings(text);

        text.ParentId = containerWidget.WidgetId;
        text.GetClass(this.website, 'heading', StyleHelper.getTextStyles())
        containerWidget.AddChild(text);
        this.websiteService.updateWebsieState(this.website);
        this.websiteService.saveAddedWidget(text, this.website);
        console.log(this.page);

      }

      // Sub Heading
      if (sectionType === SectionTypes.SUB_HEADING && containerWidget) {
        const text: WidgetModel = new WidgetModel(HelperClass.getId('heading'), containerWidget.WidgetId, containerWidget.PageId, 'Sub Heading', SectionTypes.SUB_HEADING, ``);
        text.ElementType = "h2";
        text.ItemContent = `Sub  Heading`;
        text.Settings = JsonParserHelper.loadSettings(text);

        text.ParentId = containerWidget.WidgetId;
        text.GetClass(this.website, 'sub-heading', StyleHelper.getTextStyles())
        containerWidget.AddChild(text);
        this.websiteService.updateWebsieState(this.website);
        this.websiteService.saveAddedWidget(text, this.website);
      }



      // Image
      if (sectionType === SectionTypes.IMAGE && containerWidget) {
        const element: WidgetModel = new WidgetModel(HelperClass.getId('image'), '', containerWidget.PageId, 'Image', SectionTypes.IMAGE, ``);
        element.ElementType = "image";
        element.ParentId = containerWidget.WidgetId;
        element.ItemContent = 'assets/images/widgets/image-palceholder-landscape.svg';
        element.GetClass(this.website, 'image', StyleHelper.getImageStyles());
        element.Settings = JsonParserHelper.loadSettings(element);
        containerWidget.AddChild(element);
        this.websiteService.updateWebsieState(this.website);
        this.websiteService.saveAddedWidget(element, this.website);
      }


      // Video
      if (sectionType === SectionTypes.VIDEO && containerWidget) {
        const element: WidgetModel = new WidgetModel(HelperClass.getId('vid'), '', containerWidget.PageId, 'Image', SectionTypes.VIDEO, ``);
        element.ElementType = "Video";
        element.ParentId = containerWidget.WidgetId;
        element.ItemContent = 'http://editor.tybo.co.za/api/api/upload/uploads/1661769931.mp4';
        element.GetClass(this.website, 'vid', StyleHelper.getVidBg());
        element.Settings = JsonParserHelper.loadSettings(element);
        containerWidget.AddChild(element);
        this.websiteService.updateWebsieState(this.website);
        this.websiteService.saveAddedWidget(element, this.website);
      }



      // Container
      if (sectionType === SectionTypes.CONTAINER && containerWidget) {
        const subContainer: WidgetModel = new WidgetModel(HelperClass.getId('container'), containerWidget.WidgetId, containerWidget.PageId, 'Container', SectionTypes.CONTAINER, ``);
        subContainer.ParentId = containerWidget.WidgetId;
        subContainer.Settings = JsonParserHelper.loadSettings(subContainer, 200, 50);

        subContainer.GetClass(this.website, 'sub-container', StyleHelper.getFoatingContainerStyles())
        containerWidget.AddChild(subContainer);
        this.websiteService.updateWebsieState(this.website);
        this.websiteService.saveAddedWidget(subContainer, this.website);
      }

      // Grid
      if (sectionType === SectionTypes.DB_LIST && containerWidget) {
        const grid: WidgetModel = new WidgetModel(HelperClass.getId('tybo-grid'), containerWidget.WidgetId, containerWidget.PageId, 'Data List', SectionTypes.CONTAINER, ``);
        grid.ParentId = containerWidget.WidgetId;
        grid.ItemCategory = SectionTypes.DB_LIST;
        grid.GetClass(this.website, 'tybo-grid', StyleHelper.getGridStyles())

        const card: WidgetModel = new WidgetModel(HelperClass.getId('grid-temp'), containerWidget.WidgetId, containerWidget.PageId, 'Data Item', SectionTypes.CONTAINER, ``);
        card.ItemCategory = SectionTypes.DB_ITEM;
        card.ParentId = grid.WidgetId;
        card.GetClass(this.website, 'tybo-card', StyleHelper.getCardStyles())
        grid.AddChild(card);
        containerWidget.AddChild(grid);

        this.websiteService.updateWebsieState(this.website);
        this.websiteService.saveWidget([grid], this.website, this.page)

      }


      // Button
      if (sectionType === SectionTypes.BUTTON && containerWidget) {
        const button: WidgetModel = new WidgetModel(HelperClass.getId('button'), containerWidget.WidgetId, containerWidget.PageId, 'Button', SectionTypes.BUTTON, ``);
        button.Settings = {};
        button.ElementType = "button";
        button.ParentId = containerWidget.WidgetId;
        button.ItemContent = 'Button';
        button.Settings["PcH"] = 50;
        button.Settings["TabH"] = 50;
        button.Settings["PhoneH"] = 50;
        button.Settings = JsonParserHelper.loadSettings(button);
        containerWidget.AddChild(button);
        button.GetClass(this.website, 'tybo-button', StyleHelper.getButtonStyles())
        this.websiteService.updateWebsieState(this.website);
        this.websiteService.saveAddedWidget(button, this.website);
      }



      // Text box
      if (sectionType === SectionTypes.TEXTBOX && containerWidget) {
        const textBox: WidgetModel = new WidgetModel(HelperClass.getId('text-box'), containerWidget.WidgetId, containerWidget.PageId, 'Input Text', SectionTypes.TEXTBOX, ``);
        textBox.ElementType = "input-text";
        textBox.ItemContent = ``;
        textBox.Settings = JsonParserHelper.loadSettings(textBox, 300, 20);

        textBox.ParentId = containerWidget.WidgetId;
        textBox.GetClass(this.website, 'input-text', { width: '100%', height: '40px', 'color': '#367AF6', position: 'relative', 'z-index': 1 })
        containerWidget.AddChild(textBox);
        this.websiteService.updateWebsieState(this.website);
        this.websiteService.saveAddedWidget(textBox, this.website);
      }



      // Text area
      if (sectionType === SectionTypes.TEXTAREA && containerWidget) {
        const textBox: WidgetModel = new WidgetModel(HelperClass.getId('text-area'), containerWidget.WidgetId, containerWidget.PageId, 'Text Area', SectionTypes.TEXTAREA, ``);
        textBox.ElementType = "text-area";
        textBox.ItemContent = ``;
        textBox.Settings = JsonParserHelper.loadSettings(textBox, 300, 20);

        textBox.ParentId = containerWidget.WidgetId;
        textBox.GetClass(this.website, 'text-area', { width: '100%', 'min-height': '120px', 'color': '#367AF6', position: 'relative', 'z-index': 1 })
        containerWidget.AddChild(textBox);
        this.websiteService.updateWebsieState(this.website);
        this.websiteService.saveAddedWidget(textBox, this.website);
      }




      // Form
      if (sectionType === SectionTypes.FORM && containerWidget) {
        // debugger
        const form: WidgetModel = new WidgetModel(HelperClass.getId('form'), containerWidget.WidgetId, containerWidget.PageId, 'Form', SectionTypes.CONTAINER, ``);
        const input: WidgetModel = new WidgetModel(HelperClass.getId('input'), containerWidget.WidgetId, containerWidget.PageId, 'Text input', SectionTypes.TEXTBOX, ``);
        const input2: WidgetModel = new WidgetModel(HelperClass.getId('input'), containerWidget.WidgetId, containerWidget.PageId, 'Text input', SectionTypes.TEXTBOX, ``);
        const button: WidgetModel = new WidgetModel(HelperClass.getId('button'), containerWidget.WidgetId, containerWidget.PageId, 'Button', SectionTypes.BUTTON, ``);
        input.ElementType = SectionTypes.TEXTBOX;
        input2.ElementType = SectionTypes.TEXTBOX;
        button.ElementType = "button";
        button.ItemContent = 'Action Name';
        form.ElementType = "form";
        form.ParentId = containerWidget.WidgetId;
        input.ParentId = form.WidgetId;
        input2.ParentId = form.WidgetId;
        button.ParentId = form.WidgetId;
        form.AddText(containerWidget.PageId, 'Label here', undefined);
        form.AddChild(input);
        form.AddText(containerWidget.PageId, 'Label here', undefined);
        form.AddChild(input2);
        form.AddChild(button);
        containerWidget.AddChild(form);
      }


      // Textaraa
      if (sectionType === SectionTypes.TEXTAREA && containerWidget) {
        const textarea: WidgetModel = new WidgetModel(HelperClass.getId('button'), containerWidget.WidgetId, containerWidget.PageId, 'Textarea', SectionTypes.TEXTAREA, ``);
        textarea.ElementType = SectionTypes.TEXTAREA;
        textarea.ParentId = containerWidget.WidgetId;
        containerWidget.AddText(containerWidget.PageId, 'Label here', undefined);

        containerWidget.AddChild(textarea);
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

      // if (isTemplate) {
      //   this.widget.Children = WidgetHelper.removeDynamicWidgets(this.widget.Children);
      //   this.widget = WidgetHelper.proccessWidget(this.widget, this.website, this.page);
      // }

    }
  }



  toggleOptions(event: MouseEvent) {
    const div = event.target as HTMLDivElement;
    if (div && div.id && div) {
      let inputContainer = WidgetHelper.getWidget(this.page.Widgets, div.id);

      if (!inputContainer && this.website.Header)
        inputContainer = WidgetHelper.getWidget([this.website.Header], div.id);

      if (!inputContainer)
        return;
console.log(inputContainer.ItemCategory);

      this.selecedWidget = inputContainer
      // debugger
      // if (this.selecedWidget.ShowOptions && this.key === "Shift") {
      //   WidgetHelper.removeClass([this.selecedWidget], 'active-node')
      //   this.selecedWidget.ShowOptions = false;
      //   this.eventService.updateOptionsState(undefined);
      //   CoordinatesHelper.RemoveLines();
      //   this.selectedWidgets = WidgetHelper.GetSelectedWidgets(this.page.Widgets);
      //   if (this.selectedWidgets && this.selectedWidgets.length <= 1)
      //     this.groupService.updateGroupState(undefined);
      //   return;
      // }
      if (this.key !== "Shift") {
        WidgetHelper.removeClass(this.page.Widgets, 'active-node')
        if (this.website.Header) {
          WidgetHelper.removeClass([this.website.Header], 'active-node')
          WidgetHelper.removeShowOptions([this.website.Header])
        }
        WidgetHelper.removeShowOptions(this.page.Widgets)
        WidgetHelper.toggleOptions(this.page.Widgets)
      }
      CoordinatesHelper.RemoveLines();
      this.selecedWidget.ItemClass.push('active-node');
      this.selecedWidget.ShowOptions = true;
      this.eventService.updateOptionsState(this.selecedWidget)
      this.selecedWidget.EditText != !this.selecedWidget.EditText;
      this.selectedWidgets = WidgetHelper.GetSelectedWidgets(this.page.Widgets);
      console.log(this.selectedWidgets);

      if (this.selectedWidgets.length > 1) {
        this.groupService.updateGroupState({ top: '1%' })
      }

    }

  }
  menuEvent(e: string) {
    if (e === 'delete' && this.selecedWidget) {
      this.delete();
    }
  }
  resizeUp() { }
  resizeDown(a: any, b: any) { }
  moveUp() { }
  moveDown(e: any) { }

  clickHandler(pointerEvent: MouseEvent) {
    const div = pointerEvent.target as HTMLElement;
    if (div && div.id && div) {
      // div.style.cursor = 'grab'
      const node = WidgetHelper.getWidget(this.page.Widgets, div.id);
      if (!node)
        return;
      this.selecedWidget = node;
      // this.toggleOptions();
    }

    return false;

  }
  delete() {
    const childrenToDelete = WidgetHelper.getChildrenToDelete([], this.selecedWidget);
    // childrenToDelete.forEach(c => {
    //   this.website.WidgetsToDelete.push(c);
    // });
    this.page.Widgets = this.recursiveRemove(this.page.Widgets, this.selecedWidget.WidgetId);
    if (this.website.Header)
      this.page.Widgets = this.recursiveRemove([this.website.Header], this.selecedWidget.WidgetId);

    if (this.selecedWidget && this.selecedWidget.ItemCategory === SectionTypes.HEADER) {
      this.website.Header = undefined;
    }
    this.websiteService.create(`widgets/delete-widgets-range.php`, childrenToDelete).subscribe(data => { });
  }

  recursiveRemove(arr: WidgetModel[], id: string) {
    return arr
      .filter((el) => el.WidgetId !== id)
      .map((el) => {
        if (!el.Children || !Array.isArray(el.Children)) return el;
        el.Children = this.recursiveRemove(el.Children, id);
        return el;
      });
  }

}
