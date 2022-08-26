import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileModel } from 'src/app/_classes/FileModel';
import { UserModel } from 'src/app/_classes/UserModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { HelperClass } from 'src/app/_classes/_statics/HelperClass';
import { WebsiteService } from 'src/app/_services/website.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {
  @Output() onImageSelect: EventEmitter<any> = new EventEmitter();
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  @Input() image: string;
  @Input() width: string;
  files: any[];
  view : boolean
  // images: FileModel[];
  newItems: string[];
  website: WebsiteModel
  loading: boolean;
  user: UserModel;
  constructor(private websiteService: WebsiteService) { }

  ngOnInit() {
    this.websiteService.userObservable.subscribe(data => {
      if (data)
        this.user = data;
    });
    this.websiteService.websiteObservable.subscribe(data => {
      if (data) {
        // this.images = [];
        this.website = data;
      }
    })
  }
  close() {
    this.onClose.emit(false)
  }
  selectImage(image: any) {
    this.onImageSelect.emit(image);
  }



  public uploadFile = (files: any) => {
    if (!files)
      return;
    if (files.length === 0) {
      return;
    }
    this.loading = true;
    Array.from(files).forEach((file: any) => {
      if (file.size < 200000000)
        this.uploadOriginal(file)
      else
        // this.resizeImage(file);
        alert('File too big');
    });
  }

  uploadOriginal(file: any) {
    const formData = new FormData();
    formData.append('file', file);
    this.loading = true;
    formData.append('name', `tybo.${file.name.split('.')[file.name.split('.').length - 1]}`); // file extention
    this.websiteService.create('upload/upload.php', formData).subscribe(response => {
      this.loading = false;
      if (response && response.length > 15) {
        let url = `${environment.API_URL}/upload/${response}`;
        this.onImageSelect.emit(url);
      }
    });

  }


}
