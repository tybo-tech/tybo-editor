import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IInput, IOptions, STYLE_ITEMS } from 'src/app/_classes/IOptions';
import { EventService } from 'src/app/_services/event.service';

@Component({
  selector: 'app-element-style',
  templateUrl: './element-style.component.html',
  styleUrls: ['./element-style.component.scss']
})
export class ElementStyleComponent implements OnInit, OnChanges {
  styles: IOptions[];
  @Input() ItemStyle: any;
  @Input() type: any;
  constructor(private eventService: EventService) { }


  ngOnInit() {
    // let a = { display: "grid", 'min-height': "8vh", padding: "0 3rem", 'grid-template-columns': "1fr 2fr", width: "80%" }
    if (this.ItemStyle) {
      // this.loopObject(this.ItemStyle)
    }

    // this.mapStyles();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const itemStyles = <any>changes['ItemStyle'].currentValue;
    this.mapStyles(itemStyles);
    console.log('changes: ', changes);

  }
  clickSection(optionSection: IOptions, isOpen: boolean) {
    this.styles.map(x => x.IsOpen = false);
    optionSection.IsOpen = isOpen;
  }

  loopObject(anyObject: any) {
    const allStyles = []
    this.styles.forEach(s => {
      if (s.Inputs)
        s.Inputs.forEach(i => {
          allStyles.push(i);
        })
    })

    for (const [key, value] of Object.entries(anyObject)) {
      console.log(key, " : ", value);
    }
  }
  mapStyles(itemStyles: any) {
    if (!itemStyles)
      return;

    this.styles = STYLE_ITEMS;
    this.styles.forEach(style => {
      if (style.Inputs)
        style.Inputs.forEach(input => {
          let styleValue = itemStyles[input.Id];

          if (styleValue) {
            // debugger
            // console.log(this.styles);

            input.Value = styleValue;
            input.Unit = this.getUnit(styleValue);
            if (input.Id === 'margin-center') {
              input.Classes = ['active'];
            }
            if (input.Id === 'margin-left') {
              input.Classes = ['active'];
            }
            if (input.Id === 'margin-right') {
              input.Classes = ['active'];
            }
            if (input.Unit)
              input.Value = parseFloat(styleValue);
          }
        })

    })
    console.log(this.ItemStyle);

  }

  getUnit(inputString: string) {
    let unit = ''
    const units = ['px', 'rem', 'em', '%', 'fr'];
    units.forEach(x => {
      if (inputString.includes(x))
        unit = x;
    })
    return unit;
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
}



