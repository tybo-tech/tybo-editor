import { WidgetModel } from "../WidgetModel";


export class CoordinatesHelper {


  public static MoveAbsoluteItem(relativeParent: HTMLElement, elementBeingMoved: HTMLElement, mouse: { x: number; y: number; }, widget: WidgetModel) {
    var parentRect = relativeParent.getBoundingClientRect();
    var elementRect = elementBeingMoved.getBoundingClientRect();
    // console.log(elementBeingMoved.getClientRects());
    // console.log(' parentRect.top', parentRect.top);
    // console.log('mouse.y', mouse.y);



    const containerMidPoint = parentRect.width / 2;
    let localX = mouse.x - parentRect.left;
    let localY = mouse.y - parentRect.top;
    // console.log(' let localY = mouse.y - parentRect.top', localY);
    let borderWidth = parseInt(window.getComputedStyle(elementBeingMoved)?.borderTopWidth, 10);
    localX -= borderWidth;
    localY -= borderWidth;

    const vWLeft = this.calPercentagePosition(localX, parentRect.width);
    const vHTop = this.calPercentagePosition(localY, parentRect.height);
    // elementBeingMoved.style.left = vWLeft;
    // elementBeingMoved.style.top = vHTop;
    // elementBeingMoved.style.left = (localX) + 'px';
    // elementBeingMoved.style.top = (localY) + 'px';
    // console.log('x:', localX, 'y:', localY, 'div width: ', parentRect.width, 'mid: ', containerMidPoint);
    this.drawTopElementLine((localX + elementRect.width / 2), localY, relativeParent)
    this.drawLeftElementLine(localX, (localY + elementRect.height / 2), relativeParent);
    return { left: vWLeft, top: localY + 'px' }
  }


  public static MoveRelativeItem(relativeParent: HTMLElement, elementBeingMoved: HTMLElement, mouse: { x: number; y: number; }, widget: WidgetModel) {
    var parentRect = relativeParent.getBoundingClientRect();

    var elementRect = elementBeingMoved.getBoundingClientRect();
    // console.log("parent: ", parentRect);
    // console.log("child: ", elementRect.top);
    // console.log('mouse.y', mouse.y);
    // console.log('offsetTop',elementBeingMoved.offsetTop);
    
    let localX = mouse.x - parentRect.left;
    let localY = mouse.y - parentRect.top ;
    let borderWidth = parseInt(window.getComputedStyle(relativeParent)?.borderTopWidth, 10);
    localX -= borderWidth;
    localY -= borderWidth;
    const vWLeft = this.calPercentagePosition(localX, parentRect.width);
    return { left: vWLeft, top: localY + 'px' }
  }
  static calPercentagePosition(localX: number, width: number) {
    return `${(localX / width) * 100}%`;
  }


  private static drawTopElementLine(x: number, y: number, relativeParent: HTMLElement) {
    const midLine = document.getElementById("top-to-element");
    if (midLine)
      midLine.parentElement?.removeChild(midLine);

    let node: any = document.createElement(`div`);
    node.id = 'top-to-element';
    node.style.cssText = `
                          left: ${x}px;
                          position:absolute;
                          width:.5px;
                          z-index:100;
                          background:none;
                          top:0;
                          height: ${y}px;
                          border-right: 2px dotted #1299fc;
                       `;
    relativeParent.appendChild(node);
  }

  public static RemoveLines() {
    const midLine = document.getElementById("top-to-element");
    if (midLine)
      midLine.parentElement?.removeChild(midLine);

    const line = document.getElementById("left-to-element");
    if (line)
      line.parentElement?.removeChild(line);
  }

  private static drawLeftElementLine(width: number, top: number, relativeParent: HTMLElement) {
    const line = document.getElementById("left-to-element");
    if (line)
      line.parentElement?.removeChild(line);

    let node: any = document.createElement(`div`);
    node.id = 'left-to-element';
    node.style.cssText = `
                          position:absolute;
                          height:.5px;
                          z-index:100;
                          background:none;
                          left:0;
                          top: ${top}px;
                          width: ${width}px;
                          border-top: 2px dotted #1299fc;
                       `;
    relativeParent.appendChild(node);
  }

  public static ResizeItem(relativeParent: HTMLElement, elementBeingMoved: HTMLElement, mouse: { x: number; y: number; }, widget: WidgetModel) {
    var parentRect = relativeParent.getBoundingClientRect();
    let localX = mouse.x - parentRect.left;
    let localY = mouse.y - parentRect.top;
    let borderWidth = parseInt(window.getComputedStyle(elementBeingMoved)?.borderTopWidth, 10);
    localX -= borderWidth;
    localY -= borderWidth;
    console.log(localX, parentRect);

    return { left: this.calPercentagePosition(localX, parentRect.width), top: '' }
  }


  public static ResizeItemTag(relativeParent: HTMLElement, elementBeingMoved: HTMLElement, mouse: { x: number; y: number; }, widget: WidgetModel) {
    var parentRect = relativeParent.getBoundingClientRect();
    var currentRect = elementBeingMoved.getBoundingClientRect();
    let localX = mouse.x - currentRect.left;
    let localY = mouse.y - currentRect.top;
    console.log(localX, parentRect);
    const width = this.calPercentagePosition(localX, parentRect.width);
    const height = this.calPercentagePosition(localY, parentRect.height);
    return { width: width, height: localY + 'px' }
  }
}


//left: 50%;
// top: 50%;
// transform: translate(-50%, -50%);