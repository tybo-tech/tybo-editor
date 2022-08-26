import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from 'src/app/_classes/UserModel';
import { UserWebsiteModel } from 'src/app/_classes/UserWebsiteModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WebsiteService } from 'src/app/_services/website.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {
  user: UserModel | undefined;
  id: any;
  id2: any;
  id3: any;
  constructor(private websiteService: WebsiteService, private router: Router, private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.websiteService.userObservable.subscribe(data => {
      this.user = data;
    });
  }
  edit(userWebsite: WebsiteModel) {
    localStorage.setItem("_website", userWebsite.WebsiteId);
    this.loadPage();
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
        this.router.navigate(['/pages/editor']);

      }

    });
  }
  preview(userWebsite: WebsiteModel) {
    const link = document.createElement('a');
    link.href = `${userWebsite.Url}`
    link.target = '_blank';
    link.click()
  }
}
