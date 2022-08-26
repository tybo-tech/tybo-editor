import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/_classes/FontModel';
import { ImportsModel } from 'src/app/_classes/ImportsModel';
import { BACKGROUND, BORDER, BORDER_RADIUS, IInput, IOptions, POSITION, SELECTOR, SIZING, SPACING, STYLE_CLASSES, TYPOGRAPHY } from 'src/app/_classes/IOptions';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WebstyleModel } from 'src/app/_classes/WebstyleModel';
import { WidgetModel } from 'src/app/_classes/WidgetModel';
import { HelperClass } from 'src/app/_classes/_statics/HelperClass';
import { SectionTypes } from 'src/app/_classes/_statics/SectionTypes';
import { WebsiteService } from 'src/app/_services/website.service';
import { interval, Subscription } from 'rxjs';
import { DeviceTypes } from 'src/app/_classes/_statics/DeviceTypes';

@Component({
  selector: 'app-element-class',
  templateUrl: './element-class.component.html',
  styleUrls: ['./element-class.component.scss']
})
export class ElementClassComponent implements OnInit {
  @Input() ItemStyle: any;
  @Input() type: any;
  @Input() element: WidgetModel;

  styles: IOptions[] = STYLE_CLASSES;
  selector: IOptions = SELECTOR;
  typography: IOptions = TYPOGRAPHY;
  spacing: IOptions = SPACING;
  position: IOptions = POSITION;
  sizing: IOptions = SIZING;
  background: IOptions = BACKGROUND;
  borderRadius: IOptions = BORDER_RADIUS;
  border: IOptions = BORDER;

  selectedInput: IInput | undefined;
  selectedInputOption: any;
  website: WebsiteModel;
  currentIndex = -1;
  newClassName: string;
  duplicatFrom: string;
  viewCss: boolean;
  cssString: string;

  SectionTypes = SectionTypes
  fonts: Item[];
  intervalSubscription: Subscription;
  source = interval(10);
  showImage: boolean;
  showGradient: boolean;
  constructor(private websiteService: WebsiteService) { }

  ngOnInit(): void {
    if (this.spacing.Inputs && this.spacing.Inputs.length) {
      this.selectedInput = this.spacing?.Inputs[0];
      this.selectedInputOption = this.selectedInput.Options.find(x => x.Id === 'center')
    }

    this.websiteService.websiteObservable.subscribe(data => {
      if (data) {
        this.website = data;
        // Page widget
        if (this.element && this.element.PageId) {
          if (!this.element.ItemClass || !this.element.ItemClass.length) {
            if (!this.website.WebsiteStyles || !this.website.WebsiteStyles.length) {
              //Create new class
              const newClass: WebstyleModel = new WebstyleModel(HelperClass.getId('class'), this.website.WebsiteId, 'class-1', {});
              this.website.WebsiteStyles = [newClass];
              this.element.ItemClass = [newClass.SelectorName];
              this.element.SelectedClass = newClass;
            }
          }
          else if (this.element.ItemClass && this.element.ItemClass.length) {
            // debugger
            this.element.SelectedClass = this.website.WebsiteStyles.find(x => x.SelectorName === this.element.ItemClass[0]) || undefined;
          }
        }

        // Main Body

        if (this.element && !this.element.PageId) {
          if (!this.element.ItemClass || !this.element.ItemClass.length) {
            const newClass: WebstyleModel = new WebstyleModel(HelperClass.getId('class'), this.website.WebsiteId, 'body', {});
            if (!this.website.WebsiteStyles || !this.website.WebsiteStyles.length)
              this.website.WebsiteStyles = [];
            this.website.WebsiteStyles.push(newClass);
            this.element.ItemClass = [newClass.SelectorName];
            this.element.SelectedClass = newClass;
          }

          if (this.element.ItemClass.length && this.website.WebsiteStyles && this.website.WebsiteStyles.length) {
            this.element.SelectedClass = this.website.WebsiteStyles.find(x => x.SelectorName === this.element.ItemClass[0]);
          }

        }




        if (this.element && this.element.ItemClass && this.element.ItemClass.length && this.website.WebsiteStyles && this.website.WebsiteStyles.length) {
          // Assign values
          this.assignValues(this.sizing.Inputs);
          this.assignValues(this.typography.Inputs);
          this.styles.forEach(s => this.assignValues(s.Inputs));
        
          this.element.SelectedClass = this.website.WebsiteStyles.find(x => x.SelectorName === this.element.ItemClass[0]) || undefined;
          if (!this.element.SelectedClass) {
            const newClass: WebstyleModel = new WebstyleModel(HelperClass.getId('class'), this.website.WebsiteId, this.element.ItemClass[0], {});
            this.website.WebsiteStyles.push(newClass);
            this.element.SelectedClass = newClass;
          }
          if (this.element.SelectedClass && this.element.SelectedClass.PcStyles) {
            const pcStyles = this.element.SelectedClass.PcStyles;
            if (pcStyles['background'] && this.background) {
              const bg = this.background.Inputs?.find(x => x.Id === 'background');
              if (bg) {
                bg.Value = pcStyles['background'];
              }

              const type = this.background.Inputs?.find(x => x.Id === 'background-type');
              if (type) {
                type.Value = this.element.BackgroundType;
              }
            }
          }


        }
      }
    })




    this.websiteService.fontsObservable.subscribe(data => {
      if (data && data.items && data.items.length) {
        this.fonts = data.items;
        const typo = this.typography.Inputs?.find(x => x.Id === 'font-family');
        if (typo) {
          typo.Options = this.fonts.map(x => {
            return {
              Name: x.family,
              Value: x.family
            };
          })
        }
      }
    })
  }
  clickSection(optionSection: IOptions, isOpen: boolean) {
    this.styles.map(x => x.IsOpen = false);
    optionSection.IsOpen = isOpen;
  }
  classChanged() {

  }
  toggleSites() {

  }

  assignValues(items: IInput[] | undefined) {
    if (!items)
      return;
    items.forEach(input => {
      const value = this.website.WebsiteStyles.find(x => x.SelectorName === this.element.ItemClass[0] && x.PcStyles[input.Id]);
      if (value && input.Unit) {
        input.Value = parseFloat(value.PcStyles[input.Id])
      }
      if (value && !input.Unit) {
        input.Value = value.PcStyles[input.Id];
      }

    })
  }
  checkChange(inputItem: IInput) {
    this.showImage = false;
    if (!inputItem.HasValue) {
      inputItem.Value = 'none';
      if (this.element && this.element.SelectedClass)
        delete this.element.SelectedClass.PcStyles["background-color"];
    }
    this.styleChanged(inputItem);
  }

  styleChanged(inputItem: IInput) {
    // debugger
    if (this.element && this.element.SelectedClass) {

      if (!this.element.SelectedClass.PcStyles)
        this.element.SelectedClass.PcStyles = {};

      if (!this.element.SelectedClass.PhoneStyles)
        this.element.SelectedClass.PhoneStyles = {};

      if (!this.element.SelectedClass.TabStyles)
        this.element.SelectedClass.TabStyles = {};

      if (this.website.ViewDevice === DeviceTypes.PC || !this.website.ViewDevice) {
        this.element.SelectedClass.PcStyles[inputItem.Id] = inputItem.Value + inputItem.Unit || '';
      }

      if (this.website.ViewDevice === DeviceTypes.TABLET) {
        this.element.SelectedClass.TabStyles[inputItem.Id] = inputItem.Value + inputItem.Unit || '';
      }
      if (this.website.ViewDevice === DeviceTypes.PHONE) {
        this.element.SelectedClass.PhoneStyles[inputItem.Id] = inputItem.Value + inputItem.Unit || '';
      }



      //remove unsude styles
      if (inputItem.Id == 'font-family') {
        this.website.Imports.forEach((item, i) => {
          let style = this.website.WebsiteStyles.find(x => x.PcStyles['font-family'] === item.Name)
            || this.website.WebsiteStyles.find(x => x.TabStyles['font-family'] === item.Name)
            || this.website.WebsiteStyles.find(x => x.PhoneStyles['font-family'] === item.Name);

          if (!style)
            this.website.Imports.splice(i);
        })
      }

      this.websiteService.updateWebsieState(this.website);

    }
  }
  dublicate(style: string) {
    this.duplicatFrom = style;
    this.newClassName = this.duplicatFrom;
    this.currentIndex = -1;
  }


  saveNewClass() {

    if (!this.website || !this.website.WebsiteStyles || !this.website.WebsiteStyles.length) {
      alert("Error while tryng to copy");
      return;
    }


    const newClass: WebstyleModel = new WebstyleModel(HelperClass.getId('class'), this.website.WebsiteId, this.newClassName, {});
    newClass.PcStyles = {};
    newClass.TabStyles = {};
    newClass.PhoneStyles = {};

    this.website.WebsiteStyles.push(newClass);
    this.element.ItemClass = [newClass.SelectorName];
    this.element.SelectedClass = newClass;
    this.websiteService.updateWebsieState(this.website);
    this.duplicatFrom = '';
  }


  saveDublicateClass() {

    if (!this.website || !this.website.WebsiteStyles || !this.website.WebsiteStyles.length) {
      alert("Error while tryng to copy");
      return;
    }

    // check if class exist
    const check = this.website.WebsiteStyles.find(x => x.SelectorName === this.newClassName);
    if (check) {
      this.element.ItemClass = [this.newClassName];
      return;
    }

    const oldClass = this.website.WebsiteStyles.find(x => x.SelectorName === this.duplicatFrom);
    if (!oldClass || !this.newClassName) {
      this.saveNewClass();
      return;
    }
    const newClass: WebstyleModel = new WebstyleModel(HelperClass.getId('class'), this.website.WebsiteId, this.newClassName, {});
    newClass.PcStyles = this.copyStyles(oldClass.PcStyles);
    newClass.TabStyles = this.copyStyles(oldClass.TabStyles);
    newClass.PhoneStyles = this.copyStyles(oldClass.PhoneStyles);

    this.website.WebsiteStyles.push(newClass);
    this.element.ItemClass = [newClass.SelectorName];
    this.element.SelectedClass = newClass;
    this.websiteService.updateWebsieState(this.website);
    this.duplicatFrom = '';
  }



  copyStyles(from: any) {
    let newItem: any = {};
    for (const [key, value] of Object.entries(from)) {
      newItem[key] = value;
    }
    return newItem;
  }

  stylesToString() {
    if (this.element.SelectedClass) {
      this.cssString = '';
      if (!this.element.SelectedClass.PcStyles) {
        this.element.SelectedClass.PcStyles = {};
      }

      for (const [key, value] of Object.entries(this.element.SelectedClass.PcStyles)) {
        this.cssString += `\n \t${key} : ${value};`;
      }
      this.viewCss = true;

    }
  }
  doneProccessing(e: any) {
    if (this.element && this.element.SelectedClass)
      this.element.SelectedClass.PcStyles = e || {};
    this.viewCss = false;
    this.websiteService.updateWebsieState(this.website);
  }


  onInputEvent(e: IInput) {
    if (!e)
      return
    if (e.Value === this.ItemStyle[e.Id]) {
      delete this.ItemStyle[e.Id];
      return;
    }
    if (e.Id === 'background-type') {
      const parent = this.styles.find(x => x.Id === e.ParentId);
      if (!parent)
        return;
      if (parent.Inputs)
        parent.Inputs.map(i => i.IsVisible = false);
      if (e.Value === 'None') {
        delete this.ItemStyle["background-color"];
        delete this.ItemStyle["background-image"];
        delete this.ItemStyle["background"];
      }
      if (parent.Inputs) {
        let selectedItem = parent.Inputs.find(x => x.Id === `background-${e.Value.toLocaleLowerCase()}`);
        if (selectedItem)
          selectedItem.IsVisible = true;
      }

      return;
    }
    if (!e.Unit)
      e.Unit = '';
    if (e.Id === 'margin-center') {
      this.ItemStyle['margin-right'] = e.Value + '' + e.Unit;
      this.ItemStyle['margin-left'] = e.Value + '' + e.Unit;
    } else
      this.ItemStyle[e.Id] = e.Value + '' + e.Unit;
    if (e.Id === 'top')
      delete this.ItemStyle["bottom"];

    if (e.Id === 'bottom')
      delete this.ItemStyle["top"];

    if (e.Id === 'left')
      delete this.ItemStyle["right"];

    if (e.Id === 'right')
      delete this.ItemStyle["left"];

    if (e.Id === 'background')
      delete this.ItemStyle["background-image"];

    if (e.Id === 'background-color') {
      delete this.ItemStyle["background-image"];
      delete this.ItemStyle["background"];
    }

    if (e.Id === 'background-image') {
      delete this.ItemStyle["background"];
      delete this.ItemStyle["background-color"];
    }

    if (e.Id === 'align-items' && this.ItemStyle["display"] != 'flex') {
      this.ItemStyle["display"] = 'flex';
      this.ItemStyle["flex-direction"] = 'column';
    }

    if (e.Id === 'margin-left')
      delete this.ItemStyle["margin-right"];


    if (e.Id === 'margin-right')
      delete this.ItemStyle["margin-left"];

    // this.eventService.newState({ ElementId: this.type, SelectedStyle: this.ItemStyle })
  }

  imageChanged(selectedClass: WebstyleModel) {
    if (selectedClass) {
      this.element.SelectedClass = selectedClass;
      this.element.ItemClass[0] = selectedClass;
      this.websiteService.updateWebsieState(this.website);
    }
  }
  selectOption(input: IInput, value: any) {
    // debugger
    // this.showImage = false;
    if (!input)
      return

    if (input.Id === 'background-type') {
      // debugger
      if (value === 'none' && this.element.SelectedClass) {
        delete this.element.SelectedClass.PcStyles['background-type'];
        delete this.element.SelectedClass.PcStyles['background'];

        delete this.element.SelectedClass.TabStyles['background-type'];
        delete this.element.SelectedClass.TabStyles['background'];

        delete this.element.SelectedClass.PhoneStyles['background-type'];
        delete this.element.SelectedClass.PhoneStyles['background'];
        this.websiteService.updateWebsieState(this.website);
        return;
      }

      if (value === 'image' && this.element.SelectedClass) {
        delete this.element.SelectedClass.PcStyles['background-type'];
        delete this.element.SelectedClass.TabStyles['background-type'];
        delete this.element.SelectedClass.PhoneStyles['background-type'];
        this.showImage = true;
        this.websiteService.updateWebsieState(this.website);
        return;
      }
      if (value === 'Gradient' && this.element.SelectedClass) {
        delete this.element.SelectedClass.PcStyles['background-type'];
        delete this.element.SelectedClass.TabStyles['background-type'];
        delete this.element.SelectedClass.PhoneStyles['background-type'];
        this.showGradient = true;
        this.websiteService.updateWebsieState(this.website);
        return;
      }
    }
    if (input.Id === 'font-family') {
      const font = this.fonts.find(x => x.family == value);
      if (!this.website.Imports)
        this.website.Imports = [];

      if (font) {
        for (const [key, itemValue] of Object.entries(font.files)) {
          const importItem = new ImportsModel(HelperClass.getId('import'), this.website.WebsiteId, itemValue, font.family, "CssFont");
          if (!this.website.Imports.find(x => x.Name === value))
            this.website.Imports.push(importItem);
        }
      }
    }
    if (value && value['border']) {
      if (this.element && this.element.SelectedClass) {
        if (!this.element.SelectedClass.PcStyles)
          this.element.SelectedClass.PcStyles = {};


        if (this.website.ViewDevice === DeviceTypes.PC || !this.website.ViewDevice) {
          this.element.SelectedClass.PcStyles['border'] = value['border'];
        }

        if (this.website.ViewDevice === DeviceTypes.TABLET) {
          this.element.SelectedClass.TabStyles['border'] = value['border'];
        }

        if (this.website.ViewDevice === DeviceTypes.PHONE) {
          this.element.SelectedClass.PhoneStyles['border'] = value['border'];
        }
        this.websiteService.updateWebsieState(this.website);
      }
      return;
    }

    if (value && value['border-left']) {
      if (this.element && this.element.SelectedClass) {
        if (!this.element.SelectedClass.PcStyles)
          this.element.SelectedClass.PcStyles = {};
        this.element.SelectedClass.PcStyles['border-left'] = value['border-left'];
        if (this.website.ViewDevice === DeviceTypes.PC || !this.website.ViewDevice) {
          this.element.SelectedClass.PcStyles['border'] = value['border'];
        }

        if (this.website.ViewDevice === DeviceTypes.TABLET) {
          this.element.SelectedClass.TabStyles['border'] = value['border'];
        }

        if (this.website.ViewDevice === DeviceTypes.PHONE) {
          this.element.SelectedClass.PhoneStyles['border'] = value['border'];
        }
        this.websiteService.updateWebsieState(this.website);
      }
      return;
    }

    if (value && value['border-right']) {
      if (this.element && this.element.SelectedClass) {
        if (!this.element.SelectedClass.PcStyles)
          this.element.SelectedClass.PcStyles = {};

        if (this.website.ViewDevice === DeviceTypes.PC || !this.website.ViewDevice) {
          this.element.SelectedClass.PcStyles['border-right'] = value['border-right'];
        }

        if (this.website.ViewDevice === DeviceTypes.TABLET) {
          this.element.SelectedClass.TabStyles['border-right'] = value['border-right'];
        }

        if (this.website.ViewDevice === DeviceTypes.PHONE) {
          this.element.SelectedClass.PhoneStyles['border-right'] = value['border-right'];
        }
        this.websiteService.updateWebsieState(this.website);
      }
      return;
    }

    if (value && value['border-top']) {
      if (this.element && this.element.SelectedClass) {
        if (!this.element.SelectedClass.PcStyles)
          this.element.SelectedClass.PcStyles = {};

        if (this.website.ViewDevice === DeviceTypes.PC || !this.website.ViewDevice) {
          this.element.SelectedClass.PcStyles['border-top'] = value['border-top'];
        }

        if (this.website.ViewDevice === DeviceTypes.TABLET) {
          this.element.SelectedClass.TabStyles['border-top'] = value['border-top'];
        }

        if (this.website.ViewDevice === DeviceTypes.PHONE) {
          this.element.SelectedClass.PhoneStyles['border-top'] = value['border-top'];
        }
        this.websiteService.updateWebsieState(this.website);
      }
      return;
    }

    if (value && value['border-bottom']) {
      if (this.element && this.element.SelectedClass) {
        if (!this.element.SelectedClass.PcStyles)
          this.element.SelectedClass.PcStyles = {};

        if (this.website.ViewDevice === DeviceTypes.PC || !this.website.ViewDevice) {
          this.element.SelectedClass.PcStyles['border-bottom'] = value['border-bottom'];
        }

        if (this.website.ViewDevice === DeviceTypes.TABLET) {
          this.element.SelectedClass.TabStyles['border-bottom'] = value['border-bottom'];
        }

        if (this.website.ViewDevice === DeviceTypes.PHONE) {
          this.element.SelectedClass.PhoneStyles['border-bottom'] = value['border-bottom'];
        }
        this.websiteService.updateWebsieState(this.website);
      }
      return;
    }

    if (value)
      input.Value = value;
    this.styleChanged(input)
  }

  selectInputOption(inputOption: any) {
    this.selectedInputOption = inputOption;
    if (this.selectedInput && this.selectedInput.Options) {
      this.selectedInput.Options.forEach(x => {
        if (x.Classes && x.Classes.find((e: any) => e === 'active')) {
          x.Classes.splice(x.Classes.indexOf('active'));
        }
      })
    }
    this.selectedInputOption.Classes.push('active')
  }

  quadraChanged() {
    if (!this.selectedInputOption || !this.element || !this.element.SelectedClass)
      return;


    if (!this.element.SelectedClass.PcStyles)
      this.element.SelectedClass.PcStyles = {};

    if (!this.element.SelectedClass.PhoneStyles)
      this.element.SelectedClass.PhoneStyles = {};

    if (!this.element.SelectedClass.TabStyles)
      this.element.SelectedClass.TabStyles = {};

    if (this.selectedInputOption.Id === 'center' && this.selectedInput) {
      if (this.website.ViewDevice === DeviceTypes.PC || !this.website.ViewDevice) {
        delete this.element.SelectedClass.PcStyles["padding-left"];
        delete this.element.SelectedClass.PcStyles["padding-right"];
        delete this.element.SelectedClass.PcStyles["padding-top"];
        delete this.element.SelectedClass.PcStyles["padding-bottom"];
        delete this.element.SelectedClass.PcStyles["margin-left"];
        delete this.element.SelectedClass.PcStyles["margin-right"];
        delete this.element.SelectedClass.PcStyles["margin-top"];
        delete this.element.SelectedClass.PcStyles["margin-bottom"];
        this.element.SelectedClass.PcStyles[this.selectedInput.Id] = this.selectedInputOption.Value + this.selectedInputOption.Unit;
      }

      if (this.website.ViewDevice === DeviceTypes.TABLET) {
        delete this.element.SelectedClass.TabStyles["padding-left"];
        delete this.element.SelectedClass.TabStyles["padding-right"];
        delete this.element.SelectedClass.TabStyles["padding-top"];
        delete this.element.SelectedClass.TabStyles["padding-bottom"];
        delete this.element.SelectedClass.TabStyles["margin-left"];
        delete this.element.SelectedClass.TabStyles["margin-right"];
        delete this.element.SelectedClass.TabStyles["margin-top"];
        delete this.element.SelectedClass.TabStyles["margin-bottom"];
        this.element.SelectedClass.TabStyles[this.selectedInput.Id] = this.selectedInputOption.Value + this.selectedInputOption.Unit;
      }

      if (this.website.ViewDevice === DeviceTypes.PHONE) {
        delete this.element.SelectedClass.PhoneStyles["padding-left"];
        delete this.element.SelectedClass.PhoneStyles["padding-right"];
        delete this.element.SelectedClass.PhoneStyles["padding-top"];
        delete this.element.SelectedClass.PhoneStyles["padding-bottom"];
        delete this.element.SelectedClass.PhoneStyles["margin-left"];
        delete this.element.SelectedClass.PhoneStyles["margin-right"];
        delete this.element.SelectedClass.PhoneStyles["margin-top"];
        delete this.element.SelectedClass.PhoneStyles["margin-bottom"];
        this.element.SelectedClass.PhoneStyles[this.selectedInput.Id] = this.selectedInputOption.Value + this.selectedInputOption.Unit;
      }


      this.websiteService.updateWebsieState(this.website);
      return;
    }
    let options = this.selectedInput?.Options;
    if (options && options.length && options.length === 5 && this.element.SelectedClass) {
      const value = `${options[0].Value}${options[0].Unit} ${options[1].Value}${options[1].Unit} ${options[2].Value}${options[2].Unit} ${options[3].Value}${options[3].Unit}`;
      if (this.selectedInput) {

        if (this.website.ViewDevice === DeviceTypes.PC || !this.website.ViewDevice) {
          delete this.element.SelectedClass.PcStyles["padding-left"];
          delete this.element.SelectedClass.PcStyles["padding-right"];
          delete this.element.SelectedClass.PcStyles["padding-top"];
          delete this.element.SelectedClass.PcStyles["padding-bottom"];
          delete this.element.SelectedClass.PcStyles["margin-left"];
          delete this.element.SelectedClass.PcStyles["margin-right"];
          delete this.element.SelectedClass.PcStyles["margin-top"];
          delete this.element.SelectedClass.PcStyles["margin-bottom"];
          this.element.SelectedClass.PcStyles[this.selectedInput.Id] = value;

        }

        if (this.website.ViewDevice === DeviceTypes.TABLET) {
          delete this.element.SelectedClass.TabStyles["padding-left"];
          delete this.element.SelectedClass.TabStyles["padding-right"];
          delete this.element.SelectedClass.TabStyles["padding-top"];
          delete this.element.SelectedClass.TabStyles["padding-bottom"];
          delete this.element.SelectedClass.TabStyles["margin-left"];
          delete this.element.SelectedClass.TabStyles["margin-right"];
          delete this.element.SelectedClass.TabStyles["margin-top"];
          delete this.element.SelectedClass.TabStyles["margin-bottom"];
          this.element.SelectedClass.TabStyles[this.selectedInput.Id] = value;

        }

        if (this.website.ViewDevice === DeviceTypes.PHONE) {
          delete this.element.SelectedClass.PhoneStyles["padding-left"];
          delete this.element.SelectedClass.PhoneStyles["padding-right"];
          delete this.element.SelectedClass.PhoneStyles["padding-top"];
          delete this.element.SelectedClass.PhoneStyles["padding-bottom"];
          delete this.element.SelectedClass.PhoneStyles["margin-left"];
          delete this.element.SelectedClass.PhoneStyles["margin-right"];
          delete this.element.SelectedClass.PhoneStyles["margin-top"];
          delete this.element.SelectedClass.PhoneStyles["margin-bottom"];
          this.element.SelectedClass.PhoneStyles[this.selectedInput.Id] = value;

        }
        this.websiteService.updateWebsieState(this.website);
      }

    }

  }

  switchTabs(input: IInput) {
    if (!input)
      return;
    this.selectedInput = input;
    this.spacing.Inputs?.map(x => x.Classes = ['btn', 'btn-outline-secondary']);
    this.selectedInput.Classes = ['btn', 'btn-outline-success'];
  }

  moveItem(option: any, input: IInput) {

    this.intervalSubscription = this.source.subscribe(val => {
      if (!option || !input)
        return;
      if (option.Id == 'left' || option.Id == 'right') {
        let value = input.Options?.find(x => x.Id === 'left');
        if (!value)
          return;

        if (option.Id == 'left')
          value.Value -= 1;

        if (option.Id == 'right')
          value.Value += 1;

        if (this.element.SelectedClass) {
          if (!this.element.SelectedClass.PcStyles['position'])
            this.element.SelectedClass.PcStyles['position'] = 'relative';
          this.element.SelectedClass.PcStyles['left'] = value.Value + value.Unit;
        }
      }


      if (option.Id == 'bottom' || option.Id == 'top') {
        let value = input.Options?.find(x => x.Id === 'top');
        if (!value)
          return;

        if (option.Id == 'top')
          value.Value -= 1;

        if (option.Id == 'bottom')
          value.Value += 1;

        if (this.element.SelectedClass) {
          if (!this.element.SelectedClass.PcStyles['position'])
            this.element.SelectedClass.PcStyles['position'] = 'relative';
          this.element.SelectedClass.PcStyles['top'] = value.Value + value.Unit;
        }
      }

      this.websiteService.updateWebsieState(this.website)
    });
  }

  pointerupEvent() {
    this.intervalSubscription.unsubscribe();

  }
}
