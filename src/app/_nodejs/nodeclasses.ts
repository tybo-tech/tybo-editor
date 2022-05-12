export interface widget {
    widgetid: string;
    columnid: string;
    parentid: string;
    createuserid: string;
    modifyuserid: string;
    createdate: string;
    modifiydate: string;
    statusname: string;
    statusid: string;
    stylestring: string;
    itemstyle: string;
    itemmobilestyle: string;
    selectedstyle: string;
    showoptions: string;
    itemclass: string;
    itemcategory: string;
    showminimenu: string;
    ordernumber: string;
    isselected: string;
   
    name: string;
    itemtype: string;
    itemcontent: string;
    itemevent: string;
    itemeventname: string;
    itemheading: string;
    imageurl: string;
    imagestyles: string;
    headingstyles: string;
    contentstyles: string;
    eventstyles: string;
    elementtype: string;
    rowstring: string;
    colstring: string;
    form?: any;
}

export interface column {
    columnid: string;
    rowid: string;
    parentid: string;
    createuserid: string;
    modifyuserid: string;
    createdate: string;
    modifiydate: string;
    statusname: string;
    statusid: string;
    stylestring: string;
    itemstyle: string;
    itemmobilestyle: string;
    selectedstyle: string;
    showoptions: string;
    itemclass: string;
    itemcategory: string;
    showminimenu: string;
    ordernumber: string;
    isselected: string;
   
    name: string;
    styles: string;
    columntype: string;
}

export interface row {
    rowid: string;
    sectionid: string;
    parentid: string;
    createuserid: string;
    modifyuserid: string;
    createdate: string;
    modifiydate: string;
    statusname: string;
    statusid: string;
    stylestring: string;
    itemstyle: string;
    itemmobilestyle: string;
    selectedstyle: string;
    showoptions: string;
    itemclass: string;
    itemcategory: string;
    showminimenu: string;
    ordernumber: string;
    isselected: string;
   
    name: string;
    rowtype: string;
}



export interface input {
    inputid: string;
    formid: string;
    parentid: string;
    createuserid: string;
    modifyuserid: string;
    createdate: string;
    modifiydate: string;
    statusname: string;
    statusid: string;
    stylestring: string;
    itemstyle: string;
    itemmobilestyle: string;
    selectedstyle: string;
    showoptions: string;
    itemclass: string;
    itemcategory: string;
    showminimenu: string;
    ordernumber: string;
    isselected: string;
   
    name: string;
    inputtype: string;
    inputvalue: string;
    inputlabel: string;
    labelstyles: string;
    inputicon: string;
    placeholder: string;
    mobilelabelstyles: string;
}

export interface form {
 formid: string;
 widgetid: string;
    parentid: string;
    createuserid: string;
    modifyuserid: string;
    createdate: string;
    modifiydate: string;
    statusname: string;
    statusid: string;
    stylestring: string;
    itemstyle: string;
    itemmobilestyle: string;
    selectedstyle: string;
    showoptions: string;
    itemclass: string;
    itemcategory: string;
    showminimenu: string;
    ordernumber: string;
    isselected: string;
   
    name: string;
}