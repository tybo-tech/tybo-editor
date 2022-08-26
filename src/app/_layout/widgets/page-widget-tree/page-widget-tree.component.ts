import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { DbCollectionModel } from 'src/app/_classes/DbCollectionModel';
import { PageModel } from 'src/app/_classes/PageModel';
import { UserModel } from 'src/app/_classes/UserModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WebstyleModel } from 'src/app/_classes/WebstyleModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { DeviceTypes } from 'src/app/_classes/_statics/DeviceTypes';
import { HelperClass } from 'src/app/_classes/_statics/HelperClass';
import { JsonParserHelper } from 'src/app/_classes/_statics/JsonParserHelper';
import { SectionTypes } from 'src/app/_classes/_statics/SectionTypes';
import { StyleHelper } from 'src/app/_classes/_statics/StyleHelper';
import { WidgetHelper } from 'src/app/_classes/_statics/WidgetHelper';
import { Emitters } from 'src/app/_emmiters/Emitters';
import { ELEMENT_MINI_MENU } from 'src/app/_mocks/mini-menu';
import { CopyService } from 'src/app/_services/copy.service';
import { EventService } from 'src/app/_services/event.service';
import { SyncService } from 'src/app/_services/sync.service';
import { WebsiteService } from 'src/app/_services/website.service';

@Component({
  selector: 'app-page-widget-tree',
  templateUrl: './page-widget-tree.component.html',
  styleUrls: ['./page-widget-tree.component.scss']
})
export class PageWidgetTreeComponent implements OnInit, AfterViewInit {
  @Input() page: PageModel;
  @Input() website: WebsiteModel;
  @Input() widget: WidgetModel;
  SectionTypes = SectionTypes;
  selectedTreeNode: WidgetModel;
  showMiniMenu: boolean;
  miniMenu = ELEMENT_MINI_MENU;
  type: string;
  node: WidgetModel;
  stylesToPaste: any;
  @ViewChild('section') section: ElementRef;
  mouseDown: boolean;
  mouse: { x: number; y: number; };
  height: number = 100;
  private boxPosition: { left: number, top: number };
  currentY: number;
  selecedWidget: WidgetModel;
  DeviceTypes = DeviceTypes;
  moveMouseDown: boolean;
  y: number = 0;
  isPublic = false;
  widgetToPasted: WidgetModel;
  user: UserModel;

  constructor(private eventService: EventService, private websiteService: WebsiteService, private copyService: CopyService, private syncService: SyncService) { }
  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.section) {
        this.copyService.updateVW(this.section.nativeElement.offsetWidth);
      }

    }, 1);
  }
  ngOnInit(): void {
    this.websiteService.userObservable.subscribe(data => {
      if (data)
        this.user = data;
    });
    this.widget = WidgetHelper.proccessWidget(this.widget, this.website, this.page);
    this.copyService.copiedItemObservable.subscribe(data => {
      // debugger
      if (data && data.ItemType && !this.miniMenu.find(x => x.Action === "paste-item")) {
        this.miniMenu.push(
          { Name: `<i class="fas fa-paste"></i> Paste Item`, Action: 'paste-item' },
        );
        this.widgetToPasted = data;
      }
    })

  }
  public selectNode(node: WidgetModel): void {

    this.selectedTreeNode = node;

    console.group("Selected Tree Node");
    console.groupEnd();

  }


  onDrop(innElement: Element, containerWidget: WidgetModel) {
    // debugger
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

      // Text
      if (sectionType === SectionTypes.TEXT && containerWidget) {
        const text: WidgetModel = new WidgetModel(HelperClass.getId('text'), containerWidget.WidgetId, this.page.PageId, 'Text', SectionTypes.TEXT, ``);
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
        const text: WidgetModel = new WidgetModel(HelperClass.getId('heading'), containerWidget.WidgetId, this.page.PageId, 'Heading', SectionTypes.HEADING, ``);
        text.ElementType = "h1";
        text.ItemContent = `Heading`;
        text.Settings = JsonParserHelper.loadSettings(text);

        text.ParentId = containerWidget.WidgetId;
        text.GetClass(this.website, 'heading', StyleHelper.getTextStyles())
        containerWidget.AddChild(text);
        this.websiteService.updateWebsieState(this.website);
        this.websiteService.saveAddedWidget(text, this.website);
      }

      // Sub Heading
      if (sectionType === SectionTypes.SUB_HEADING && containerWidget) {
        const text: WidgetModel = new WidgetModel(HelperClass.getId('heading'), containerWidget.WidgetId, this.page.PageId, 'Sub Heading', SectionTypes.SUB_HEADING, ``);
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
        const element: WidgetModel = new WidgetModel(HelperClass.getId('image'), '', this.page.PageId, 'Image', SectionTypes.IMAGE, ``);
        element.ElementType = "image";
        element.ParentId = containerWidget.WidgetId;
        element.ItemContent = 'assets/images/widgets/image-palceholder-landscape.svg';
        element.GetClass(this.website, 'image', { 'width': '100%', position: 'relative', 'z-index': 1 });
        element.Settings = JsonParserHelper.loadSettings(element);
        containerWidget.AddChild(element);
        this.websiteService.updateWebsieState(this.website);
        this.websiteService.saveAddedWidget(element, this.website);
      }



      // Container
      if (sectionType === SectionTypes.CONTAINER && containerWidget) {
        const subContainer: WidgetModel = new WidgetModel(HelperClass.getId('container'), containerWidget.WidgetId, this.page.PageId, 'Container', SectionTypes.CONTAINER, ``);
        subContainer.ParentId = containerWidget.WidgetId;
        subContainer.Settings = JsonParserHelper.loadSettings(subContainer, 200, 50);

        subContainer.GetClass(this.website, 'sub-container', StyleHelper.getFlexChild())
        containerWidget.AddChild(subContainer);
        this.websiteService.updateWebsieState(this.website);
        this.websiteService.saveAddedWidget(subContainer, this.website);
      }

      // Grid
      if (sectionType === SectionTypes.DB_LIST && containerWidget) {
        const grid: WidgetModel = new WidgetModel(HelperClass.getId('tybo-grid'), containerWidget.WidgetId, this.page.PageId, 'Data List', SectionTypes.CONTAINER, ``);
        const gridTemplate: WidgetModel = new WidgetModel(HelperClass.getId('grid-temp'), containerWidget.WidgetId, this.page.PageId, 'Data Item', SectionTypes.CONTAINER, ``);
        grid.ParentId = containerWidget.WidgetId;
        grid.ItemCategory = SectionTypes.DB_LIST;
        gridTemplate.ItemCategory = SectionTypes.DB_ITEM;
        gridTemplate.ParentId = grid.WidgetId;
        grid.Settings = JsonParserHelper.loadSettings(grid);
        gridTemplate.Settings = JsonParserHelper.loadSettings(grid);
        grid.GetClass(this.website, 'tybo-grid', StyleHelper.getGridStyles())
        gridTemplate.GetClass(this.website, 'tybo-grid', StyleHelper.getFlexBox())
        grid.AddChild(gridTemplate);
        containerWidget.AddChild(grid);
        this.websiteService.updateWebsieState(this.website);
        this.websiteService.saveWidget([grid], this.website, this.page)

      }


      // Button
      if (sectionType === SectionTypes.BUTTON && containerWidget) {
        const button: WidgetModel = new WidgetModel(HelperClass.getId('button'), containerWidget.WidgetId, this.page.PageId, 'Button', SectionTypes.BUTTON, ``);
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
        const textBox: WidgetModel = new WidgetModel(HelperClass.getId('text-box'), containerWidget.WidgetId, this.page.PageId, 'Input Text', SectionTypes.TEXTBOX, ``);
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
        const textBox: WidgetModel = new WidgetModel(HelperClass.getId('text-area'), containerWidget.WidgetId, this.page.PageId, 'Text Area', SectionTypes.TEXTAREA, ``);
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
        const form: WidgetModel = new WidgetModel(HelperClass.getId('form'), containerWidget.WidgetId, this.page.PageId, 'Form', SectionTypes.CONTAINER, ``);
        const input: WidgetModel = new WidgetModel(HelperClass.getId('input'), containerWidget.WidgetId, this.page.PageId, 'Text input', SectionTypes.TEXTBOX, ``);
        const input2: WidgetModel = new WidgetModel(HelperClass.getId('input'), containerWidget.WidgetId, this.page.PageId, 'Text input', SectionTypes.TEXTBOX, ``);
        const button: WidgetModel = new WidgetModel(HelperClass.getId('button'), containerWidget.WidgetId, this.page.PageId, 'Button', SectionTypes.BUTTON, ``);
        input.ElementType = SectionTypes.TEXTBOX;
        input2.ElementType = SectionTypes.TEXTBOX;
        input.ItemStyle = StyleHelper.getInputStyles();
        input.ItemMobileStyle = StyleHelper.getInputStyles();
        input2.ItemStyle = StyleHelper.getInputStyles();
        input2.ItemMobileStyle = StyleHelper.getInputStyles();
        input.SelectedStyle = this.website.IsMobileMode() ? input.ItemMobileStyle : input.ItemStyle;
        input2.SelectedStyle = this.website.IsMobileMode() ? input2.ItemMobileStyle : input2.ItemStyle;

        button.ElementType = "button";
        button.ItemContent = 'Action Name';
        form.ElementType = "form";
        form.ParentId = containerWidget.WidgetId;
        input.ParentId = form.WidgetId;
        input2.ParentId = form.WidgetId;
        button.ParentId = form.WidgetId;
        form.AddText(this.page.PageId, 'Label here', undefined);
        form.AddChild(input);
        form.AddText(this.page.PageId, 'Label here', undefined);
        form.AddChild(input2);
        form.AddChild(button);
        containerWidget.AddChild(form);
      }


      // Textaraa
      if (sectionType === SectionTypes.TEXTAREA && containerWidget) {
        const textarea: WidgetModel = new WidgetModel(HelperClass.getId('button'), containerWidget.WidgetId, this.page.PageId, 'Textarea', SectionTypes.TEXTAREA, ``);
        textarea.ElementType = SectionTypes.TEXTAREA;
        textarea.ParentId = containerWidget.WidgetId;
        textarea.ItemStyle = StyleHelper.getInputStyles();
        textarea.ItemMobileStyle = StyleHelper.getInputStyles();
        textarea.SelectedStyle = this.website.IsMobileMode() ? textarea.ItemMobileStyle : textarea.ItemStyle;
        containerWidget.AddText(this.page.PageId, 'Label here', undefined);

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

      if (isTemplate) {
        this.widget.Children = WidgetHelper.removeDynamicWidgets(this.widget.Children);
        this.widget = WidgetHelper.proccessWidget(this.widget, this.website, this.page);
      }

    }
  }


  toggleOptions(event: MouseEvent) {
    // debugger
    const div = event.target as HTMLDivElement;
    if (div && div.id && div) {
      let inputContainer = WidgetHelper.getWidget(this.page.Widgets, div.id);

      if (!inputContainer && this.website.Header)
        inputContainer = WidgetHelper.getWidget([this.website.Header], div.id);

      if (!inputContainer)
        return;

      WidgetHelper.removeClass(this.page.Widgets, 'active-node')
      if (this.website.Header) {
        WidgetHelper.removeClass([this.website.Header], 'active-node')
        WidgetHelper.removeShowOptions([this.website.Header])
      }
      WidgetHelper.removeShowOptions(this.page.Widgets)
      inputContainer.ItemClass.push('active-node');
      this.eventService.updateOptionsState(undefined);
      setTimeout(() => {
        inputContainer.ShowOptions = true;
        if (inputContainer.ShowOptions) {
          this.eventService.updateOptionsState(inputContainer)
          this.selecedWidget = inputContainer
        }
        else
          this.eventService.updateOptionsState(undefined);
      }, 100)
    }

  }

  toogleMiniMenu(pointerEvent: MouseEvent) {
    pointerEvent.preventDefault();
    const div = pointerEvent.target as HTMLDivElement;
    if (div && div.id && div) {
      const node = WidgetHelper.getWidget(this.page.Widgets, div.id);
      if (!node)
        return;
      this.showMiniMenu = true;
      this.type = node.ElementType;
      this.node = node;
    }

    return false;
  }

  selectMenu(action: any) {

    if (action === 'close') {
      this.showMiniMenu = false;
      return;
    }
    // debugger

    if (action === 'delete') {
      this.delete();

    }
    if (action === 'paste-item' && this.node) {

      this.copyService.copiedItemObservable.subscribe(data => {
        if (data && data.ItemType) {
          const widgetToPasted: WidgetModel = WidgetHelper.pasteWidget(data, this.node, this.website);
          this.node.Children.push(widgetToPasted);
          this.websiteService.updateWebsieState(this.website);
        }
      })
    }

    // alert(action)
    if (action === 'copy-styles') {
      if (this.node && this.node.ItemClass && this.node.ItemClass.length && this.website && this.website.WebsiteStyles && this.website.WebsiteStyles.length) {
        const itemClass = this.website.WebsiteStyles.find(x => x.SelectorName === this.node.ItemClass[0]);
        if (itemClass) {
          if (this.website.ViewDevice === DeviceTypes.PC)
            this.copyService.copy(itemClass.PcStyles);

          if (this.website.ViewDevice === DeviceTypes.TABLET)
            this.copyService.copy(itemClass.TabStyles);

          if (this.website.ViewDevice === DeviceTypes.PHONE)
            this.copyService.copy(itemClass.PhoneStyles);

        }
      }
    }

    if (action === 'paste-styles') {
      if (this.node && this.node.ItemClass && this.node.ItemClass.length && this.website && this.website.WebsiteStyles && this.website.WebsiteStyles.length) {
        const itemClass = this.website.WebsiteStyles.find(x => x.SelectorName === this.node.ItemClass[0]);
        if (itemClass) {
          if (this.website.ViewDevice === DeviceTypes.PC)
            itemClass.PcStyles = this.stylesToPaste;

          if (this.website.ViewDevice === DeviceTypes.TABLET)
            itemClass.TabStyles = this.stylesToPaste;;

          if (this.website.ViewDevice === DeviceTypes.PHONE)
            itemClass.PhoneStyles = this.stylesToPaste;;

        }
      }
      this.websiteService.updateWebsieState(this.website);
    }

    // if (action === 'select-image') {
    //   this.showImage = true;
    // }
    // if (action === 'open-menu') {
    //   this.sideMenuEvent.emit(true);
    // }
    // this.valueChanged.emit(this.value)
    this.showMiniMenu = false;
  }
  menuEvent(e: string) {
    if (e === 'delete' && this.selecedWidget)
      this.delete();
  }
  delete() {
    const childrenToDelete = WidgetHelper.getChildrenToDelete([], this.selecedWidget);
    // childrenToDelete.forEach(c => {
    //   this.website.WidgetsToDelete.push(c);
    // });
    this.page.Widgets = this.recursiveRemove(this.page.Widgets, this.selecedWidget.WidgetId);
    if (this.website.Header)
      this.page.Widgets = this.recursiveRemove([this.website.Header], this.selecedWidget.WidgetId);

    if (this.node && this.node.ItemCategory === SectionTypes.HEADER) {
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
  resizeDown(event: MouseEvent, node: WidgetModel) {
    this.mouseDown = true;
    this.selecedWidget = node;
    this.loadPosition();
  }

  moveDown(pointerEvent: MouseEvent) {

    pointerEvent.preventDefault();
    const div = pointerEvent.target as HTMLDivElement;
    if (div && div.id && div) {
      const node = WidgetHelper.getWidget(this.page.Widgets, div.id);
      if (!node)
        return;
      this.selecedWidget = node;
      this.moveMouseDown = true;
      this.loadPosition();
    }

    return false;

  }
  resizeUp() {
    this.mouseDown = false;
  }
  moveUp() {
    this.moveMouseDown = false;
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouse = { x: event.clientX, y: event.clientY };
    if (this.mouseDown) this.resize();
    if (this.moveMouseDown) this.move();
  }

  @HostListener('window:mouseup', ['$event'])
  onMouseUp() {
    // event.preventDefault();
    this.mouseDown = false;
    this.moveMouseDown = false;
  }
  private resize() {
    if (this.mouse.y > this.currentY) {
      this.height += 2
    }

    if (this.mouse.y < this.currentY && this.height > 6) {
      this.height -= 2
    }

    this.currentY = this.mouse.y;
    this.setSettings();
    this.updateStyleClass();
    // this.height = Number(this.mouse.y > this.boxPosition.top) ? this.mouse.y - this.boxPosition.top : 0;
  }
  private move() {
    if (this.mouse.y > this.currentY) {
      this.y += 2
    }

    if (this.mouse.y < this.currentY && this.height > 6) {
      this.y -= 2
    }
    this.currentY = this.mouse.y;
    this.setSettings();
    this.updateStyleClass();
    // this.height = Number(this.mouse.y > this.boxPosition.top) ? this.mouse.y - this.boxPosition.top : 0;
  }

  updateStyleClass() {
    if (this.selecedWidget && this.selecedWidget.ItemClass && this.selecedWidget.ItemClass.length) {
      this.selecedWidget.SelectedClass = this.website.WebsiteStyles.find(x => x.SelectorName === this.selecedWidget.ItemClass[0]) || undefined;

    }
    if (this.selecedWidget && this.selecedWidget.SelectedClass) {

      if (!this.selecedWidget.SelectedClass.PcStyles)
        this.selecedWidget.SelectedClass.PcStyles = {};

      if (!this.selecedWidget.SelectedClass.PhoneStyles)
        this.selecedWidget.SelectedClass.PhoneStyles = {};

      if (!this.selecedWidget.SelectedClass.TabStyles)
        this.selecedWidget.SelectedClass.TabStyles = {};

      if (this.website.ViewDevice === DeviceTypes.PC || !this.website.ViewDevice) {
        this.selecedWidget.SelectedClass.PcStyles['min-height'] = this.height + 'px';
        this.selecedWidget.SelectedClass.PcStyles['top'] = this.y + 'px';
      }

      if (this.website.ViewDevice === DeviceTypes.TABLET) {
        this.selecedWidget.SelectedClass.TabStyles['min-height'] = this.height + 'px';
        this.selecedWidget.SelectedClass.TabStyles['top'] = this.y + 'px';
      }
      if (this.website.ViewDevice === DeviceTypes.PHONE) {
        this.selecedWidget.SelectedClass.PhoneStyles['min-height'] = this.height + 'px';
        this.selecedWidget.SelectedClass.PhoneStyles['top'] = this.y + 'px';
      }

      // this.websiteService.updateWebsieState(this.website);
      // this.syncService.updateStyleState(this.selecedWidget.SelectedClass)
      // this.syncService.empyWidgets();
      // this.syncService.updateWidgetState(this.selecedWidget, this.user?.UserId || this.selecedWidget.CreateUserId)


      this.websiteService.updateWebsieState(this.website);
      this.syncService.updateStyleState(this.selecedWidget.SelectedClass)
      this.syncService.empyWidgets();
      if (this.selecedWidget.ParentWidget) {
        if (this.selecedWidget.GrandParent) {
          this.syncService.updateWidgetState(this.selecedWidget.ParentWidget, this.user?.UserId || this.selecedWidget.GrandParent.CreateUserId)
        } else {
          this.syncService.updateWidgetState(this.selecedWidget, this.user?.UserId || this.selecedWidget.CreateUserId)

        }
      }

    }
  }

  loadPosition() {
    if (this.website) {
      this.website = this.website;
      if (!this.website.ViewDevice || this.website.ViewDevice === this.DeviceTypes.PC) {
        this.height = +this.selecedWidget.Settings["PcH"]
        this.y = +this.selecedWidget.Settings["PcTop"] || 0
      }
      if (this.website.ViewDevice === this.DeviceTypes.TABLET) {
        this.height = +this.selecedWidget.Settings["TabH"]
        this.y = +this.selecedWidget.Settings["TabTop"] || 0
      }
      if (this.website.ViewDevice === this.DeviceTypes.PHONE) {
        this.height = +this.selecedWidget.Settings["PhoneH"];
        this.y = +this.selecedWidget.Settings["PhoneTop"] || 0;
      }
    }
  }


  setSettings() {
    if (!this.website)
      return;
    if (!this.website.ViewDevice || this.website.ViewDevice === this.DeviceTypes.PC) {
      this.selecedWidget.Settings["PcH"] = this.height;
      this.selecedWidget.Settings["PcTop"] = this.y;
    }
    if (this.website.ViewDevice === this.DeviceTypes.TABLET) {
      this.selecedWidget.Settings["TabH"] = this.height;
      this.selecedWidget.Settings["TabTop"] = this.y;
    }
    if (this.website.ViewDevice === this.DeviceTypes.PHONE) {
      this.selecedWidget.Settings["PhoneH"] = this.height;
      this.selecedWidget.Settings["PhoneTop"] = this.y;
    }
  }

}
