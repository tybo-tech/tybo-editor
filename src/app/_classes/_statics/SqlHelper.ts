export class SqlHelper {
  public static createTable(tableName: string, model) {
    var keys = Object.keys(model);

    let table = `
    CREATE TABLE ${tableName}
    (
      name VARCHAR(255),
      address VARCHAR(255)
    )
    `;
    console.log(keys);
    
    // console.log(tableName, ': ' , table);
    
    return;
  }


  
}
