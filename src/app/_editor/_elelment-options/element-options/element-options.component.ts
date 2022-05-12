import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageModel } from 'src/app/_classes/ImageModel';

@Component({
  selector: 'app-element-options',
  templateUrl: './element-options.component.html',
  styleUrls: ['./element-options.component.scss']
})
export class ElementOptionsComponent implements OnInit {
  @Input() value;
  @Input() type;
  @Input() styles;
  @Input() name;
  @Input() ItemStyle;
  // @Input() ItemStyle;
  @Input() ItemMobileStyle;
  @Output() onClose: EventEmitter<boolean> = new EventEmitter();
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @Output() onStyleChange: EventEmitter<any> = new EventEmitter();

  minWidth: number;
  width: number;
  maxWidth: number;

  minHeight: number;
  height: number;
  maxHeight: number;

  top: number;
  bottom: number;
  right: number;
  left: number;

  padding: number;
  paddingLeft: number;
  paddingRight: number;
  paddingTop: number;
  paddingBottom: number;

  margin: number;
  marginLeft: number;
  marginRight: number;
  marginTop: number;
  marginBottom: number;

  color: string = '#ffffff';
  background: string = '#ffffff';
  border: string = '#ffffff';
  textAlign: string = 'left';

  fontWeight: number;

  showImage: boolean;
  showBG: boolean;
  fontSize: number;
  backgroundPosition: any;
  backgroundRepeat: any;
  backgroundSize: any;

  overlayOpercity: number;
  overlayColor: string;
  bgOverlayRGB;
  position: any;
  fontStyle: any;
  textDecoration: any;

  contentMaxWidth: number
  contentGap: number
  contentTemplateColumns: string
  contentBg: any;
  boxShadow: any;
  borderRadius: any;
  flexDirection: any;
  gap: any;
  justifyContent: number;
  display: any;
  zIndex: any;
  alignItems: any;
  constructor() { }

  ngOnInit() {

    this.loadStyles();
  }
  close() {
    this.onClose.emit(false);
  }
  onImageSelect(image: ImageModel) {
    this.showImage = false;
    this.onChange.emit(image);
  }
  onBgChanged(image: ImageModel) {
    this.ItemStyle['background-image'] = `url(${image.Url})`
    this.showBG = false;
  }
  formatStyles(index, val, ex = '') {
    //    box-shadow: inset 0 0 0 50vw rgba(255,0,150,0.3);
    if (index === 'overlay-opercity' && this.bgOverlayRGB) {
      console.log(index, val);
      this.overlayOpercity = val;
      this.ItemStyle['box-shadow'] = `inset 0 0 0 50vw rgba(${this.bgOverlayRGB.r},${this.bgOverlayRGB.g},${this.bgOverlayRGB.b},${this.overlayOpercity || .3})`
      return;
    }

    if (index === 'overlay-color') {
      console.log(index, val);
      this.bgOverlayRGB = this.hexToRgb(val);
      if (this.bgOverlayRGB) {

        console.log(this.bgOverlayRGB);
        this.ItemStyle['box-shadow'] = `inset 0 0 0 50vw rgba(${this.bgOverlayRGB.r},${this.bgOverlayRGB.g},${this.bgOverlayRGB.b},${this.overlayOpercity || .3})`
      }
      return;
    }
    delete this.ItemStyle[index];
    this.ItemStyle[index] = `${val}${ex}`;
    this.styleChange(this.ItemStyle);

  }
  // formatStylesContent(index, val, ex = '') {
  //   delete this.ItemStyle[index];
  //   this.ItemStyle[index] = `${val}${ex}`;
  //   this.styleChange(this.ItemStyle);
  // }

  hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }



  onValue(v) {
    this.onChange.emit(v);
  }

  styleChange(v) {
    this.onStyleChange.emit(v);
  }
  loadStyles() {
    // width
    if (this.ItemStyle['min-width'])
      this.minWidth = parseFloat(this.ItemStyle['min-width']);

    if (this.ItemStyle['width'])
      this.width = parseFloat(this.ItemStyle['width']);

    if (this.ItemStyle['max-width'])
      this.maxWidth = parseFloat(this.ItemStyle['max-width']);


    // height

    if (this.ItemStyle['min-height'])
      this.minHeight = parseFloat(this.ItemStyle['min-height']);


    if (this.ItemStyle['height'])
      this.height = parseFloat(this.ItemStyle['height']);

    if (this.ItemStyle['max-height'])
      this.maxHeight = parseFloat(this.ItemStyle['max-height']);

    // top let bot ri..

    if (this.ItemStyle['top'])
      this.top = parseFloat(this.ItemStyle['top']);

    if (this.ItemStyle['bottom'])
      this.bottom = parseFloat(this.ItemStyle['bottom']);

    if (this.ItemStyle['right'])
      this.right = parseFloat(this.ItemStyle['right']);

    if (this.ItemStyle['left'])
      this.left = parseFloat(this.ItemStyle['left']);

    // padding
    if (this.ItemStyle['padding-left'])
      this.paddingLeft = parseFloat(this.ItemStyle['padding-left']);

    if (this.ItemStyle['padding-right'])
      this.paddingRight = parseFloat(this.ItemStyle['padding-right']);

    if (this.ItemStyle['padding-top'])
      this.paddingTop = parseFloat(this.ItemStyle['padding-top']);

    if (this.ItemStyle['padding-bottom'])
      this.paddingBottom = parseFloat(this.ItemStyle['padding-bottom']);


    if (this.ItemStyle['padding'])
      this.padding = this.ItemStyle['padding'];

    // margin
    if (this.ItemStyle['margin-left'])
      this.marginLeft = parseFloat(this.ItemStyle['margin-left']);

    if (this.ItemStyle['margin-right'])
      this.marginRight = parseFloat(this.ItemStyle['margin-right']);

    if (this.ItemStyle['margin-top'])
      this.marginTop = parseFloat(this.ItemStyle['margin-top']);

    if (this.ItemStyle['margin-bottom'])
      this.marginBottom = parseFloat(this.ItemStyle['margin-bottom']);


    if (this.ItemStyle['margin'])
      this.margin = this.ItemStyle['margin'];

    if (this.ItemStyle['position'])
      this.position = this.ItemStyle['position'];

    //background  ,color
    if (this.ItemStyle['color'])
      this.color = this.ItemStyle['color'];

    if (this.ItemStyle['background-color'])
      this.background = this.ItemStyle['background-color'];

    if (this.ItemStyle['background'] && !this.ItemStyle["background-image"]) {
      this.ItemStyle['background-color'] = this.ItemStyle['background'];
      delete this.ItemStyle['background'];
    }


    //fonts

    if (this.ItemStyle['font-weight'])
      this.fontWeight = parseFloat(this.ItemStyle['font-weight']);

    if (this.ItemStyle['font-size'])
      this.fontSize = parseFloat(this.ItemStyle['font-size']);

    if (this.ItemStyle['font-style'])
      this.fontStyle = this.ItemStyle['font-style'];

    if (this.ItemStyle['text-decoration'])
      this.textDecoration = this.ItemStyle['text-decoration'];

    if (this.ItemStyle['text-align'])
      this.textAlign = this.ItemStyle['text-align'];

    // Bg image



    if (this.ItemStyle['background-repeat'])
      this.backgroundRepeat = this.ItemStyle['background-repeat'];



    if (this.ItemStyle['background-size'])
      this.backgroundSize = this.ItemStyle['background-size'];

    if (this.ItemStyle['box-shadow']) {
      const boxShadow: string = this.ItemStyle['box-shadow'];
      if (boxShadow) {
        this.overlayOpercity = +boxShadow.split(",").pop().substring(1, 3);
        const rgb = boxShadow.split("(").pop().split(")")[0].split(",")
        if (rgb.length > 3)
          this.overlayColor = this.rgbToHex(+rgb[0], +rgb[1], +rgb[2]);
      }
      console.log('bgOverlayRGB :', this.bgOverlayRGB);

    }

    // border and shadow
    if (this.ItemStyle['box-shadow'])
      this.boxShadow = this.ItemStyle['box-shadow'];

    if (this.ItemStyle['border-radius'])
      this.borderRadius = parseFloat(this.ItemStyle['border-radius']);



    if (this.ItemStyle['border'])
      this.border = this.ItemStyle['border'];

    //Flex

    if (this.ItemStyle['flex-direction'])
      this.flexDirection = this.ItemStyle['flex-direction'];

    if (this.ItemStyle['gap'])
      this.gap = parseFloat(this.ItemStyle['gap']);

    if (this.ItemStyle['gjustify-contentap'])
      this.justifyContent = parseFloat(this.ItemStyle['justify-content']);
    // Content width


    if (this.ItemStyle && this.ItemStyle['max-width'])
      this.contentMaxWidth = parseFloat(this.ItemStyle['max-width']);

    if (this.ItemStyle && this.ItemStyle['gap'])
      this.contentGap = parseFloat(this.ItemStyle['gap']);

    if (this.ItemStyle && this.ItemStyle['display'])
      this.display = this.ItemStyle['display'];

    if (this.ItemStyle && this.ItemStyle['grid-template-columns'])
      this.contentTemplateColumns = this.ItemStyle['grid-template-columns'];

    if (this.ItemStyle && this.ItemStyle['background'])
      this.contentBg = this.ItemStyle['background'];

    if (this.ItemStyle && this.ItemStyle['z-index'])
      this.zIndex = this.ItemStyle['z-index'];

    if (this.ItemStyle && this.ItemStyle['align-items'])
      this.alignItems = this.ItemStyle['align-items'];

  }

  componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  rgbToHex(r, g, b) {
    return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
  }

  formatStylesEvent(e, index) {
    delete this.ItemStyle[index];
    this.ItemStyle[index] = e;
  }

}
