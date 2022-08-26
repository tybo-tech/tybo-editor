import { WidgetModel } from "../WidgetModel";

export class HelperClass {
    public static getId(prefix: string = '') {
        if (prefix && prefix.length)
            prefix += '-';
        return `${prefix}${Math.floor(Math.random() * 1000000000)}-${(new Date()).getTime()}`;
    };

    
    public static  getGridClassFromNumberOfColumns(id:any) {
    id = Number(id);
    let col = '';
    let num = 100 / id;
    const perc = Math.round(num * 100) / 100

    for (let i = 0; i < id; i++) {
      col += " " + perc + '%'
    }
    return col.trim();
  }

  public static   getSubMenuItem(subMenuItems: WidgetModel[], id: string): WidgetModel | undefined {
    if (subMenuItems) {
        for (var i = 0; i < subMenuItems.length; i++) {
            if (subMenuItems[i].WidgetId == id) {
                return subMenuItems[i];
            }
            var found = this.getSubMenuItem(subMenuItems[i].Children, id);
            if (found) return found;
        }
    }
}
}
