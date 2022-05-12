import { Component, Input, OnInit } from '@angular/core';
import { FormModel } from 'src/app/_classes/FormModel';
import { InputModel } from 'src/app/_classes/InputModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { DeviceTypes } from 'src/app/_classes/_statics/DeviceTypes';
import { INPUT_MINI_MENU } from 'src/app/_mocks/mini-menu';
import { CopyService } from 'src/app/_services/copy.service';
import { ViewModeService } from 'src/app/_services/view-mode.service';

@Component({
  selector: 'app-public-input',
  templateUrl: './public-input.component.html',
  styleUrls: ['./public-input.component.scss']
})
export class PublicInputComponent implements OnInit {
  @Input() input: InputModel;
  @Input() website: WebsiteModel;
  @Input() form: FormModel;
  @Input() index: number;
  miniMenu = INPUT_MINI_MENU;
  stylesToPaste: any;

  constructor(
    private copyService: CopyService,
    private viewModeService: ViewModeService
  ) { }

  ngOnInit() {
    this.input.ShowMiniMenu = false;
    this.input.ShowOptions = false;
    if (!this.input.InputLabel)
      this.input.InputLabel = "Input Label";

    if (!this.input.Placeholder)
      this.input.Placeholder = "";

    if (!this.input.InputType)
      this.input.InputType = "text";

    if (!this.input.LabelStyles)
      this.input.LabelStyles = {};

    this.viewModeService.deviceModeObservable.subscribe(data => {
      if (data) {
        if (this.website && this.website.ViewDevice === DeviceTypes.PHONE) {
          this.input.SelectedStyle = this.input.ItemMobileStyle;
        }


        if (this.website && this.website.ViewDevice === DeviceTypes.PC) {
          this.input.SelectedStyle = this.input.ItemStyle;
        }
      }
    });



    this.copyService.copiedItemObservable.subscribe(data => {
      if (data) {
        // debugger
        this.stylesToPaste = this.copyService.getStylesToPaste(data);
      }
    });
  }

  onRightClick(pointerEvent: PointerEvent) {
    pointerEvent.preventDefault()
    this.form.Inputs.map(c => c.ShowMiniMenu = false);
    this.input.ShowMiniMenu = true;
    return false;
  }
  showStyleMenu(e: boolean) {
    this.input.ShowOptions = e;
  }

  onStyleChange(event) {
    if (!event)
      return

    if (this.website && this.website.ViewDevice === DeviceTypes.PHONE) {
      this.input.ItemMobileStyle = event;
    }


    if (this.website && this.website.ViewDevice === DeviceTypes.PC) {
      this.input.ItemStyle = event;
    }

  }

  miniMenuEvent(event) {
    if (event === "close") {
      this.closeMenu();
      return;
    }

    if (event === 'delete-column') {
      this.form.Inputs.splice(this.index, 1);
    }


    if (event == 'copy-styles') {
      this.copyService.copy(this.input.ItemStyle);
    }
    if (event == 'paste-styles') {

      if (this.website && this.website.ViewDevice === DeviceTypes.PHONE) {
        this.input.ItemMobileStyle = this.stylesToPaste;
      }

      if (this.website && this.website.ViewDevice === DeviceTypes.PC) {
        this.input.ItemStyle = this.stylesToPaste;
      }

      this.input.SelectedStyle = this.stylesToPaste;
    }

    if (event === 'position-up') {
      alert('Event not handled')
    }
    this.closeMenu();
  }

  closeMenu() {
    this.form.Inputs.map(c => c.ShowMiniMenu = false);
  }


  valueChanged(event: string, itemName: string) {
    if (itemName === 'InputLabel')
      this.input.InputLabel = event;

  }

  OnCopyEvent(event: string, itemName: string) {
    // debugger
    if (itemName === 'InputLabel')
      this.input.InputLabel = event;
  }

}
