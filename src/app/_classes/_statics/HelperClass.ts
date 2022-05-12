export class HelperClass {
    public static getId(prefix: string = '') {
        if (prefix && prefix.length)
            prefix += '-';
        return `${prefix}${Math.floor(Math.random() * 1000000000)}-${(new Date()).getTime()}`;
    };

    
    public static  getGridClassFromNumberOfColumns(id) {
    id = Number(id);
    let col = '';
    let num = 100 / id;
    const perc = Math.round(num * 100) / 100

    for (let i = 0; i < id; i++) {
      col += " " + perc + '%'
    }
    return col.trim();
  }

}
