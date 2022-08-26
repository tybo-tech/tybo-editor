import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserModel } from 'src/app/_classes/UserModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WebstyleModel } from 'src/app/_classes/WebstyleModel';
import { WebsiteService } from 'src/app/_services/website.service';

@Component({
  selector: 'app-css-classes',
  templateUrl: './css-classes.component.html',
  styleUrls: ['./css-classes.component.scss']
})
export class CssClassesComponent implements OnInit {

  @Output() onClose: EventEmitter<any> = new EventEmitter();
  website: WebsiteModel
  user: UserModel;
  selectedStyle: WebstyleModel | undefined;
  cssString_pc: string;
  cssString_tab: string;
  cssString_phone: string;
  index: number;
  all: boolean;
  selected: number;
  constructor(private websiteService: WebsiteService) { }

  ngOnInit() {
    this.websiteService.websiteObservable.subscribe(data => {
      if (data) {
        this.website = data;
        if (this.website.WebsiteStyles)
          this.website.WebsiteStyles.map(x => x.IsSelected = false)
      }
    });

    this.websiteService.userObservable.subscribe(data => {
      if (data) {
        this.user = data;
      }
    })
  }
  close() {
    this.onClose.emit(false)
  }

  selectStyle(style: WebstyleModel, index: number) {
    this.selectedStyle = style;
    this.index = index;
    this.stylesToString();
  }

  stylesToString() {
    if (this.selectedStyle) {
      this.cssString_pc = '';
      this.cssString_phone = '';
      this.cssString_tab = '';

      if (!this.selectedStyle.PcStyles) {
        this.selectedStyle.PcStyles = {};
      }

      for (const [key, value] of Object.entries(this.selectedStyle.PcStyles)) {
        this.cssString_pc += `\n \t${key} : ${value};`;
      }
      for (const [key, value] of Object.entries(this.selectedStyle.TabStyles)) {
        this.cssString_tab += `\n \t${key} : ${value};`;
      }
      for (const [key, value] of Object.entries(this.selectedStyle.PhoneStyles)) {
        this.cssString_phone += `\n \t${key} : ${value};`;
      }
      // this.viewCss = true;
    }
  }

  deleteClass() {
    this.website.WebsiteStyles.splice(this.index, 1);
    this.selectedStyle = undefined;
    this.websiteService.updateWebsieState(this.website);
  }
  selectAll() {
    if (this.all) {
      this.website.WebsiteStyles.map(x => x.IsSelected = true);
    } else {
      this.website.WebsiteStyles.map(x => x.IsSelected = false);
    }
  }
  selectOne(style: WebstyleModel) {
    const a = this.website.WebsiteStyles.find(x => x.WebStyleId === style.WebStyleId)
    if(a){
      a.IsSelected = !style.IsSelected;
      console.log( this.website.WebsiteStyles.filter(x => x.IsSelected === true));
      this.selected = this.website.WebsiteStyles.filter(x => x.IsSelected === true).length
    }
    
  }
  deleteSelected() {
    const tylesToDelete: WebstyleModel[] = this.website.WebsiteStyles.filter(x => x.IsSelected);
    this.websiteService.create(`webstyles/delete-range-webstyles.php`, tylesToDelete).subscribe(data => {
      this.website.WebsiteStyles = this.website.WebsiteStyles.filter(x => !x.IsSelected);
      this.websiteService.updateWebsieState(this.website);
    });
  }
}
