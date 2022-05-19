import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ImageModel } from 'src/app/_classes/ImageModel';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss']
})
export class ImagePickerComponent implements OnInit {
  images: ImageModel[];
  @Output() onImageSelect: EventEmitter<any> = new EventEmitter();
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
    this.images = [];
    for (let i = 1; i < 32; i++) {
      this.images.push(new ImageModel(`/assets/images/mock/${i}.png`))
    }
    this.images.push(new ImageModel(`assets/images/mock/120430.webp`))
    this.images.push(new ImageModel(`assets/images/mock/vid.svg`))
    this.images.push(new ImageModel(`assets/images/mock/user-pc.svg`))
    this.images.push(new ImageModel(`assets/images/mock/project1.png`))
    this.images.push(new ImageModel(`assets/images/mock/project2.png`))
    this.images.push(new ImageModel(`assets/images/mock/project3.png`))
    this.images.push(new ImageModel(`assets/images/mock/wid1.png`))
    this.images.push(new ImageModel(`assets/images/mock/wid2.png`))
    this.images.push(new ImageModel(`assets/images/mock/wid3.png`))
    this.images.push(new ImageModel(`assets/images/mock/newlogo.svg`))
    this.images.push(new ImageModel(`assets/images/mock/phone-me.png`))
    this.images.push(new ImageModel(`assets/images/widgets/brand.png`))
  }
  close() {
    this.onClose.emit(false)
  }
  selectImage(image:any) {
    this.onImageSelect.emit(image);
  }
}
