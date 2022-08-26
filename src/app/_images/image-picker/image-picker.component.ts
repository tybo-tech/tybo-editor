import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FileModel } from 'src/app/_classes/FileModel';
import { ImageModel } from 'src/app/_classes/ImageModel';
import { UserModel } from 'src/app/_classes/UserModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { HelperClass } from 'src/app/_classes/_statics/HelperClass';
import { WebsiteService } from 'src/app/_services/website.service';
import { environment, NO_SQL_DB } from 'src/environments/environment';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss']
})
export class ImagePickerComponent implements OnInit {
  @Output() onImageSelect: EventEmitter<any> = new EventEmitter();
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  files: any[];
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
        console.log(url);
        const newFile = new FileModel(HelperClass.getId('file'), this.website.WebsiteId, url, 'Image', 'Image', 1);
        newFile.CreateUserId = this.user.UserId;
        newFile.ModifyUserId = this.user.UserId;
        this.website.Files.push(newFile)
        this.saveFiles([newFile])
      }
    });

  }
  saveFiles(files: FileModel[]) {
    if (!files || !files.length)
      return;

    this.websiteService.create('files/save-fles.php', files).subscribe(response => {
      console.log(response);
    });
  }
}
