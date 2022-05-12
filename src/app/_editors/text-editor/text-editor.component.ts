import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UploadService } from 'src/app/_services/upload.service';
import { environment } from 'src/environments/environment';
// https://www.youtube.com/watch?v=gsUtM3WC--A
// https://www.youtube.com/watch?v=dtLXZEuZbeQ
@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit, AfterViewInit {
  @Input() text;
  @Output() onValue: EventEmitter<any> = new EventEmitter();
  forecolor: string
  loading: boolean;
  maxSize = 1500;
  constructor(private uploadService: UploadService) { }
  ngAfterViewInit(): void {
    document.getElementById("content").addEventListener("input", function(e) {
  }, false);
  }

  ngOnInit() {
  }
  topActionButtons(action: string) {
    if (action === 'forecolor') {
      document.execCommand(action, false, this.forecolor);
    }
    else
      document.execCommand(action);
  }
  fileChanged(files: File[]) {
    if (!files || !files.length)
      return;


    this.loading = true;
    Array.from(files).forEach(file => {
      if (file.size < 200000)
        this.uploadOriginal(file)
      else
        this.resizeImage(file);
    });
  }


  uploadOriginal(file) {
    const formData = new FormData();
    formData.append('file', file);
    this.loading = true;
    formData.append('name', `tybo.${file.name.split('.')[file.name.split('.').length - 1]}`); // file extention
    this.uploadService.uploadFile(formData).subscribe(response => {
      this.loading = false;
      if (response && response.length > 15) {
        const url = `${environment.API_URL}/api/upload/${response}`;
        document.execCommand('insertHTML', false, `<img src="${url}"  style='width: 100%' alt="">`);
        const content = document.getElementById("content");
      }
    });

  }


  resizeImage(file) {
    if (file.type.match(/image.*/) && file.type !== 'image/gif') {

      const reader = new FileReader();
      reader.onload = (readerEvent: any) => {
        const image = new Image();
        image.onload = (imageEvent) => {

          // Resize the image
          const canvas = document.createElement('canvas');
          const maxSize = this.maxSize;
          let width = image.width;
          let height = image.height;
          if (width > height) {
            if (width > maxSize) {
              height *= maxSize / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width *= maxSize / height;
              height = maxSize;
            }
          }
          canvas.width = width;
          canvas.height = height;
          canvas.getContext('2d').drawImage(image, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg');
          const resizedImage = this.dataURLToBlob(dataUrl);

          let extention = 'iio.jpg';
          if (file.type === 'image/gif') {
            extention = 'iio.gif';
          }
          let fileOfBlob = new File([resizedImage], extention);
          // upload
          let formData = new FormData();
          formData.append('file', fileOfBlob);
          formData.append('name', 'iio');
          this.uploadService.uploadFile(formData).subscribe(response => {
            this.loading = false;

            if (response && response.length > 15) {
              const url = `${environment.API_URL}/api/upload/${response}`;
              document.execCommand('insertHTML', false, `<img src="${url}"  style='width: 100%' alt="">`);
              const content = document.getElementById("content");
            }
          });

        };
        image.src = readerEvent.target.result.toString();
      };
      reader.readAsDataURL(file);
    }

  }

  dataURLToBlob(dataURL) {
    const BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) === -1) {
      // tslint:disable-next-line: no-shadowed-variable
      const parts = dataURL.split(',');
      // tslint:disable-next-line: no-shadowed-variable
      const contentType = parts[0].split(':')[1];
      // tslint:disable-next-line: no-shadowed-variable
      const raw = parts[1];

      return new Blob([raw], { type: contentType });
    }

    const parts = dataURL.split(BASE64_MARKER);
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;

    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
  }
  onInput(e){
    this.onValue.emit(e)
  }
}
