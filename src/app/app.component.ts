import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { WebsiteModel } from './_classes/WebsiteModel';
import { Emitters } from './_emmiters/Emitters';
import { newWebsite } from './_mocks/website';
import { WebsiteService } from './_services/website.service';
//npm i @ng-toolkit/universal
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  id: any;
  id2: any;
  id3: any;
  constructor(
    private websiteService: WebsiteService,
    private router: Router,
    private title: Title,
    private meta: Meta,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {


    if (environment.production) {
      if (location.protocol === 'http:') {
        window.location.href = location.href.replace('http', 'https');
      }
      this.loadPage();
    }



    // Subdomain get side url
    // if (environment.production) {
    //   const url = window.location.href;
    //   let host = `${url.split('co.za')[0]}co.za`;
    //   console.log('url: ', host);
    //   localStorage.setItem("_website", host)
    //   this.loadPage();
    // }

    if (!environment.production) {
      this.loadPage();
    }


  }
  loadPage() {

    this.activatedRoute.params.subscribe(r => {
      this.id = r['id'] || '/';
      this.id2 = r['id2'] || '';
      this.id3 = r['id3'] || '';
      const id = localStorage.getItem("_website");
      if (id) {
        this.websiteService.getSite(id, `/${this.id}`, this.id2, this.id3);
        // this.getCollections(id);
      }

    });
  }

  getCollections(id: string) {

    this.websiteService.get(`collections/${id}`).subscribe(data => {
      if (data && data.length) {
        this.websiteService.updateCollectionState(data);
      }
    })
  }
}
