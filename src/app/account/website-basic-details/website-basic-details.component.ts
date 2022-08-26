import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageModel } from 'src/app/_classes/PageModel';
import { UserModel } from 'src/app/_classes/UserModel';
import { UserWebsiteModel } from 'src/app/_classes/UserWebsiteModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { WebstyleModel } from 'src/app/_classes/WebstyleModel';
import { DeviceTypes } from 'src/app/_classes/_statics/DeviceTypes';
import { HelperClass } from 'src/app/_classes/_statics/HelperClass';
import { WebsiteModes } from 'src/app/_classes/_statics/WebsiteModes';
import { WebsiteService } from 'src/app/_services/website.service';

@Component({
  selector: 'app-website-basic-details',
  templateUrl: './website-basic-details.component.html',
  styleUrls: ['./website-basic-details.component.scss']
})
export class WebsiteBasicDetailsComponent implements OnInit {
  website: WebsiteModel;
  user: UserModel
  constructor(private r: Router, private websiteService: WebsiteService) { }

  ngOnInit(): void {
    this.websiteService.userObservable.subscribe(data => {
      if (data) {
        this.user = data;
        this.initWebsite();
      }
    });


  }
  next() {
    this.r.navigate(['/pages/editor'])
  }

  initWebsite() {
    this.website = new WebsiteModel(
      HelperClass.getId('website'),
      '',
      '',
      '',
      {},
      {},
      '',
      '',
      '',
      '',
      [],
      undefined,
      "",
      "",
      "",
      undefined,
      WebsiteModes.EDIT,
      DeviceTypes.PC,
      DeviceTypes.PC_WIDTH
    );
    this.website.CreateUserId = this.user.UserId;
    this.website.ModifyUserId = this.user.UserId;
    this.website.ItemClass = ['website-body'];
    const newClass: WebstyleModel = new WebstyleModel(HelperClass.getId('class'), this.website.WebsiteId, 'website-body', { background: '#ffffff', height: '100vh' });
    this.website.WebsiteStyles = [newClass];

  }
  saveWebsite() {
    if (!this.website || !this.user)
      return;

    const page = new PageModel(HelperClass.getId(`page`), true, false, 'Home', 'Home', '/', "Active", {}, []);
    page.WebsiteId = this.website.WebsiteId;
    this.website.Pages = [page];
    this.websiteService.create(`websites/create-website.php`, this.website).subscribe(data => {
      if (data && data.Id) {
        localStorage.setItem("_website", this.website.WebsiteId);
        if (!this.user.Websites)
          this.user.Websites = [];

        this.user.Websites.push(data);
        this.websiteService.updateUserState(this.user);

        this.r.navigate(['/pages/editor'])
      }
    });

    // if (!this.website._id) {
    //   const page = new PageModel(HelperClass.getId(`page`), true, false, 'Home', 'Home', '/', "Active", {}, []);
    //   delete page._id;
    //   page.WebsiteId = this.website.WebsiteId;
    //   this.websiteService.create(`pages`, [page]).subscribe(data => {
    //     if (data && data.length) {
    //       const pagesIds = data.map((x: PageModel) => x._id);
    //       console.log(pagesIds);
    //       this.website.Pages = pagesIds;
    //       delete this.website._id;
    //       this.websiteService.create(`websites/create-website.php`, this.website).subscribe(data => {
    //         if (data && data._id) {
    //           localStorage.setItem("_website", this.website.WebsiteId)
    //           this.updateUserWebsites(new UserWebsiteModel(this.website.WebsiteId,this.website.Url,this.website.Name))
    //           this.r.navigate(['/pages/editor'])
    //         }
    //       });
    //     }
    //   });
    // }
  }



}
