import { Component, OnInit } from '@angular/core';
import { PageModel } from 'src/app/_classes/PageModel';
import { SectionModel } from 'src/app/_classes/SectionModel';
import { WebsiteService } from 'src/app/_services/website.service';

@Component({
  selector: 'app-layers',
  templateUrl: './layers.component.html',
  styleUrls: ['./layers.component.scss']
})
export class LayersComponent implements OnInit {
  page: PageModel;
  header: SectionModel | undefined;
  constructor(private w: WebsiteService) { }

  ngOnInit() {
    this.w.pageObservable.subscribe(data => {
      if (data) {
        this.page = data;
        this.page.Sections.forEach(section => {
          section.Diplayed = true;
          if (section.SelectedStyle && section.SelectedStyle['display'] === 'none') {
            section.Diplayed = false;
          }
        })
      }
    })
    this.w.websiteObservable.subscribe(data => {
      if (data) {
        let website = data;
        this.header = website.Header;
        if (this.header) {
          this.header.Diplayed = true;
          if (this.header.SelectedStyle && this.header.SelectedStyle['display'] === 'none') {
            this.header.Diplayed = false;
          }
        }
      }
    })
  }
  toggleVisble(section: SectionModel) {
    if (!section)
      return;

    section.Diplayed = !section.Diplayed;

    if (!section.Diplayed)
      section.SelectedStyle['display'] = 'none';
    else
      section.SelectedStyle['display'] = 'grid';

  }
}
