import { SectionTypes } from "./_statics/SectionTypes";

export interface IOptions {
  Id?: string;
  SectionName: string;
  Catergory?: string;
  IsOpen: boolean,
  Inputs: IInput[] | undefined,
  Type: string;
  SelectedOption?: string
  EventOptions?: any[];
  Url?: any;
  Value?: any;
  Label?: string;
}

export interface IInput {
  Id: string;
  ParentId?: string;
  IsVisible: boolean;
  Type: string;
  Value: any;
  Label: string | undefined;
  Unit?: string;
  HasValue?: boolean;
  Units?: string[];
  Options: any[];
  Option?: any;
  Inputs?: IInput[],
  Classes?: string[],

}

export const STYLE_ITEMS: IOptions[] =
  [

    {
      SectionName: 'Items direction',
      IsOpen: true,
      Type: 'General',
      Label: 'Horizontal align',
      Inputs: [
        {
          Id: 'flex-direction',
          Type: 'image-check',
          Value: '0',
          Label: 'assets/images/widgets/flex-direction-row.svg', Unit: '',
          IsVisible: true,
          Options: [],
          Option: 'row'
        },
        {
          Id: 'flex-direction',
          Type: 'image-check',
          Value: '0',
          Label: 'assets/images/widgets/flex-direction-column.svg', Unit: '',
          IsVisible: true,
          Options: [],
          Option: 'column'
        },
        {
          Id: 'flex-direction',
          Type: 'image-check',
          Value: '0',
          Label: 'assets/images/widgets/flex-direction-row-reverse.svg', Unit: '',
          IsVisible: true,
          Options: [],
          Option: 'row-reverse'
        },


        {
          Id: 'flex-direction',
          Type: 'image-check',
          Value: '0',
          Label: 'assets/images/widgets/flex-direction-column-reverse.svg', Unit: '',
          IsVisible: true,
          Options: [],
          Option: 'column-reverse'
        }
      ],

    },
    {
      SectionName: 'Justify content',
      IsOpen: true,
      Type: 'General',
      Label: 'Horizontal align',
      Inputs: [
        {
          Id: 'justify-content',
          Type: 'image-check',
          Value: '0',
          Label: 'assets/images/widgets/flex-start.svg', Unit: '',
          IsVisible: true,
          Options: [],
          Option: 'start'
        },
        {
          Id: 'justify-content',
          Type: 'image-check',
          Value: '0',
          Label: 'assets/images/widgets/center.svg', Unit: '',
          IsVisible: true,
          Options: [],
          Option: 'center'
        },
        {
          Id: 'justify-content',
          Type: 'image-check',
          Value: '0',
          Label: 'assets/images/widgets/flex-end.svg', Unit: '',
          IsVisible: true,
          Options: [],
          Option: 'end'
        },
        {
          Id: 'justify-content',
          Type: 'image-check',
          Value: '0',
          Label: 'assets/images/widgets/flex-end.svg', Unit: '',
          IsVisible: true,
          Options: [],
          Option: 'space-between'
        },
        {
          Id: 'justify-content',
          Type: 'image-check',
          Value: '0',
          Label: 'assets/images/widgets/flex-end.svg', Unit: '',
          IsVisible: true,
          Options: [],
          Option: ' space-around'
        },
        {
          Id: 'justify-content',
          Type: 'image-check',
          Value: '0',
          Label: 'assets/images/widgets/flex-end.svg', Unit: '',
          IsVisible: true,
          Options: [],
          Option: 'space-evenly'
        }
      ],

    },
    {
      SectionName: 'Align Items',
      IsOpen: true,
      Type: 'General',
      Label: 'Horizontal align',
      Inputs: [
        {
          Id: 'align-items',
          Type: 'image-check',
          Value: '0',
          Label: 'assets/images/widgets/flex-start.svg', Unit: '',
          IsVisible: true,
          Options: [],
          Option: 'flex-start'
        },
        {
          Id: 'align-items',
          Type: 'image-check',
          Value: '0',
          Label: 'assets/images/widgets/center.svg', Unit: '',
          IsVisible: true,
          Options: [],
          Option: 'center'
        },
        {
          Id: 'align-items',
          Type: 'image-check',
          Value: '0',
          Label: 'assets/images/widgets/flex-end.svg', Unit: '',
          IsVisible: true,
          Options: [],
          Option: 'flex-end'
        }
      ],

    },
    {
      SectionName: 'General',
      IsOpen: false,
      Type: 'General',
      Label: 'Horizontal align',
      Inputs: [
        {
          Id: 'margin-right',
          Type: 'image-check',
          Value: '0',
          Label: 'assets/images/widgets/align-left.svg', Unit: '',
          IsVisible: true,
          Options: [],
          Option: 'auto'
        },
        {
          Id: 'margin-center',
          Type: 'image-check',
          Value: '0',
          Label: 'assets/images/widgets/align-center.svg', Unit: '',
          IsVisible: true,
          Options: [],
          Option: 'auto'
        },
        {
          Id: 'margin-left',
          Type: 'image-check',
          Value: '0',
          Label: 'assets/images/widgets/align-right.svg', Unit: '',
          IsVisible: true,
          Options: [],
          Option: 'auto'
        }
      ],

    },
    {
      SectionName: 'Size',
      IsOpen: false,
      Type: 'Text',
      Inputs: [
        {
          Id: 'width',
          Type: 'text',
          Value: '0',
          Label: 'Wid', Unit: 'px',
          Units: ['px', 'rem', 'em', '%', 'fr'],
          IsVisible: true,
          Options: []
        },
        {
          Id: 'height',
          Type: 'text',
          Value: '0',
          Label: 'Height', Unit: 'px',
          Units: ['px', 'rem', 'em', '%', 'fr'],
          IsVisible: true,
          Options: []
        },
        {
          Id: 'min-width',
          Type: 'text',
          Value: '0',
          Label: 'Min.WID', Unit: 'px',
          Units: ['px', 'rem', 'em', '%', 'fr'],
          IsVisible: true,
          Options: []
        },
        {
          Id: 'min-height',
          Type: 'text',
          Value: '0',
          Label: 'Min.Hei', Unit: 'px',
          Units: ['px', 'rem', 'em', '%', 'fr'],
          IsVisible: true,
          Options: []
        },
        {
          Id: 'max-width',
          Type: 'text',
          Value: '0',
          Label: 'Max.WID', Unit: 'px',
          Units: ['px', 'rem', 'em', '%', 'fr'],
          IsVisible: true,
          Options: []
        },
        {
          Id: 'max-height ',
          Type: 'text',
          Value: '0',
          Label: 'Max.Hei', Unit: 'px',
          Units: ['px', 'rem', 'em', '%', 'fr'],
          IsVisible: true,
          Options: []
        }
      ],

    },
    {
      SectionName: 'Inner Space - Padding',
      IsOpen: false,
      Type: 'Text',
      Inputs: [
        {
          Id: 'padding-left',
          Type: 'text',
          Value: '0',
          Label: 'Left', Unit: 'px',
          Units: ['px', 'rem', 'em', '%', 'fr'],
          IsVisible: true,
          Options: []
        },
        {
          Id: 'padding-top',
          Type: 'text',
          Value: '0',
          Label: 'Top', Unit: 'px',
          Units: ['px', 'rem', 'em', '%', 'fr'],
          IsVisible: true,
          Options: []
        },
        {
          Id: 'padding-right',
          Type: 'text',
          Value: '0',
          Label: 'Right', Unit: 'px',
          Units: ['px', 'rem', 'em', '%', 'fr'],
          IsVisible: true,
          Options: []
        },
        {
          Id: 'padding-bottom',
          Type: 'text',
          Value: '0',
          Label: 'Bottom', Unit: 'px',
          Units: ['px', 'rem', 'em', '%', 'fr'],
          IsVisible: true,
          Options: []
        }
      ],
    },
    {
      SectionName: 'Out Space - Margin',
      IsOpen: false,
      Type: 'Text',
      Inputs: [
        {
          Id: 'margin-left',
          Type: 'text',
          Value: '0',
          Label: 'Left', Unit: 'px',
          Units: ['px', 'rem', 'em', '%', 'fr'],
          IsVisible: true,
          Options: []
        },
        {
          Id: 'margin-top',
          Type: 'text',
          Value: '0',
          Label: 'Top', Unit: 'px',
          Units: ['px', 'rem', 'em', '%', 'fr'],
          IsVisible: true,
          Options: []
        },
        {
          Id: 'margin-right',
          Type: 'text',
          Value: '0',
          Label: 'Right', Unit: 'px',
          Units: ['px', 'rem', 'em', '%', 'fr'],
          IsVisible: true,
          Options: []
        },
        {
          Id: 'margin-bottom',
          Type: 'text',
          Value: '0',
          Label: 'Bottom', Unit: 'px',
          Units: ['px', 'rem', 'em', '%', 'fr'],
          IsVisible: true,
          Options: []
        }
      ],
    },
    {
      SectionName: 'Font',
      IsOpen: false,
      Type: 'Text',
      Inputs: [
        {
          Id: 'font-size',
          Type: 'text',
          Value: '12',
          Label: 'Size', Unit: 'px',
          Units: ['px', 'rem', 'em', '%', 'fr'],
          IsVisible: true,
          Options: []
        },
        {
          Id: 'font-weight',
          Type: 'text',
          Value: '500',
          Label: 'Weight',
          Options: [100, 200, 300, 400, 500, 600, 700, 800, 900],
          IsVisible: true
        },
        {
          Id: 'text-decoration',
          Type: 'text',
          Value: 'none',
          Label: 'Line',
          Options: ['none', 'overline', 'line-through', 'underline', 'underline overline'],
          IsVisible: true
        },
        {
          Id: 'font-style',
          Type: 'text',
          Value: 'normal',
          Label: 'Style',
          Options: ['normal', 'italic'],
          IsVisible: true
        },
        {
          Id: 'text-align',
          Type: 'text',
          Value: 'left',
          Label: 'align',
          Options: ['left', 'center', 'right'],
          IsVisible: true
        },
        {
          Id: 'color',
          Type: 'color',
          Value: '#ffffff',
          Label: 'color',
          IsVisible: true,
          Options: []
        }
      ]
    }
    ,
    {
      Id: 'bg',
      SectionName: 'Background',
      IsOpen: false,
      Type: 'Text',
      Inputs: [
        {
          Id: 'background-type',
          ParentId: 'bg',
          Type: 'select-option',
          Value: 'Color',
          Label: 'Type', Unit: '',
          Options: ['Color', 'Image', 'None'],
          Option: 'Color',
          IsVisible: true
        },
        {
          Id: 'background-color',
          Type: 'color',
          Value: '#ffffff',
          Label: undefined,
          IsVisible: true,
          Options: []
        }
      ],
    },
    {
      SectionName: 'Position',
      IsOpen: false,
      Type: 'Text',
      Inputs: [
        {
          Id: 'left',
          Type: 'text',
          Value: '0',
          Label: 'Left', Unit: 'px',
          Units: ['px', 'rem', 'em', '%', 'fr'],
          IsVisible: true,
          Options: []
        },
        {
          Id: 'top',
          Type: 'text',
          Value: '0',
          Label: 'Top', Unit: 'px',
          Units: ['px', 'rem', 'em', '%', 'fr'],
          IsVisible: true,
          Options: []
        },
        {
          Id: 'right',
          Type: 'text',
          Value: '0',
          Label: 'Right', Unit: 'px',
          Units: ['px', 'rem', 'em', '%', 'fr'],
          IsVisible: true,
          Options: []
        },
        {
          Id: 'bottom',
          Type: 'text',
          Value: '0',
          Label: 'Bottom', Unit: 'px',
          Units: ['px', 'rem', 'em', '%', 'fr'],
          IsVisible: true,
          Options: []
        },
        {
          Id: 'position',
          Type: 'select-option',
          Value: 'relative',
          Label: 'Position', Unit: '',
          Options: ['relative', 'absolute', 'fixed'],
          Option: 'center',
          IsVisible: true
        },
        {
          Id: 'z-index',
          Type: 'text',
          Value: '0',
          Label: 'Z Index',
          IsVisible: true,
          Options: []
        }
      ],
    },
    {
      SectionName: 'Display',
      IsOpen: true,
      Type: 'Text',
      Inputs: [

        {
          Id: 'display',
          Type: 'select-option',
          Value: 'none',
          Label: 'display', Unit: '',
          Options: ['block', 'inline-block', 'inline', 'grid', 'flex', 'none'],
          IsVisible: true
        },


        {
          Id: 'gap',
          Type: 'range',
          Value: '0',
          Label: 'Gap', Unit: '%',
          Options: [''],
          Units: ['px', 'rem', 'em', '%', 'fr'],
          IsVisible: true
        },

        {
          Id: 'flex-basis',
          Type: 'range',
          Value: '0',
          Label: 'Flex basis', Unit: '%',
          Options: [''],
          IsVisible: true,
          Units: ['px', 'rem', 'em', '%', 'fr'],
        }
      ],
    },
  ];


  


export const STYLE_CLASSES: IOptions[] =
  [
    {
      SectionName: 'Layout',
      Catergory: SectionTypes.CONTAINER,
      IsOpen: false,
      Type: 'General',
      Label: 'Horizontal align',
      Inputs: [
        {
          Id: 'display',
          Type: 'group-buttons',
          Value: '0',
          Label: '<i class="bi bi-x"></i>', Unit: '',
          IsVisible: true,
          Options: [
            { Name: 'Display: ', Classes: ['active'], Value: 'row' },
            { Name: '<i class="bi bi-eye-slash-fill"></i>', Classes: ['active'], Value: 'none' },
            { Name: '<i class="bi bi-layout-three-columns"></i>', Classes: [''], Value: 'flex' },
            { Name: '<i class="bi bi-square"></i>', Classes: [''], Value: 'block' },
            { Name: '<i class="bi bi-grid-3x2-gap-fill"></i>', Classes: [''], Value: 'grid' },
          ],
          Option: 'none'
        },
        {
          Id: 'flex-direction',
          Type: 'group-buttons',
          Value: '0',
          Label: '<i class="bi bi-x"></i>', Unit: '',
          IsVisible: true,
          Options: [
            { Name: 'Direction: ', Classes: ['active'], Value: 'row' },
            { Name: '<i class="bi bi-arrow-right"></i>', Classes: ['active'], Value: 'row' },
            { Name: '<i class="bi bi-arrow-down"></i>', Classes: [''], Value: 'column' },
            { Name: '<i class="bi bi-arrow-left"></i>', Classes: [''], Value: ' row-reverse' },
            { Name: '<i class="bi bi-arrow-up"></i>', Classes: [''], Value: 'column-reverse' },
          ],
          Option: 'none'
        },

        {
          Id: 'justify-content',
          Type: 'group-buttons',
          Value: '0',
          Label: '<i class="bi bi-x"></i>', Unit: '',
          IsVisible: true,
          Options: [
            { Name: 'Justify: ', Classes: ['active'], Value: 'row' },
            { Name: '<i class="bi bi-layout-sidebar-inset"></i>', Classes: [''], Value: 'start' },
            { Name: '<i class="bi bi-text-center"></i>', Classes: [''], Value: 'center' },
            { Name: '<i class="bi bi-layout-three-columns"></i>', Classes: [''], Value: 'space-between' },
            // { Name: '<i class="bi bi-distribute-horizontal"></i>', Classes: [''], Value: 'space-evenly' },
            { Name: '<i class="bi bi-layout-sidebar-inset-reverse"></i>', Classes: [''], Value: 'end' },
          ],
          Option: 'none'
        },

        {
          Id: 'align-items',
          Type: 'group-buttons',
          Value: '0',
          Label: '<i class="bi bi-x"></i>', Unit: '',
          IsVisible: true,
          Options: [
            { Name: 'Align items: ', Classes: ['active'], Value: 'row' },
            { Name: '<i class="bi bi-align-top"></i>', Classes: [''], Value: 'flex-start' },
            { Name: '<i class="bi bi-align-middle"></i>', Classes: [''], Value: 'center' },
            { Name: '<i class="bi bi-align-bottom"></i>', Classes: [''], Value: 'flex-end' },
          ],
          Option: 'none'
        },

        {
          Id: 'gap',
          Type: 'range',
          Value: 0,
          Label: 'Gap: ', Unit: 'px',
          IsVisible: true,
          Options: [
            { Name: 'Gap: ', Classes: ['active'], Value: 'row' },
          ],
          Option: 'none'
        },
      ],

    },


  ];



export const SELECTOR: IOptions = {
  SectionName: 'Element class',
  Catergory: SectionTypes.CONTAINER,
  IsOpen: false,
  Type: 'General',
  Label: 'Horizontal align',
  Inputs: [
    {
      Id: 'margin-right',
      Type: 'image-check',
      Value: '0',
      Label: 'assets/images/widgets/align-left.svg', Unit: '',
      IsVisible: true,
      Options: [],
      Option: 'auto'
    },
    {
      Id: 'margin-center',
      Type: 'image-check',
      Value: '0',
      Label: 'assets/images/widgets/align-center.svg', Unit: '',
      IsVisible: true,
      Options: [],
      Option: 'auto'
    },
    {
      Id: 'margin-left',
      Type: 'image-check',
      Value: '0',
      Label: 'assets/images/widgets/align-right.svg', Unit: '',
      IsVisible: true,
      Options: [],
      Option: 'auto'
    }
  ],

}



export const TYPOGRAPHY: IOptions = {
  SectionName: 'Typography',
  Catergory: SectionTypes.TEXT,
  IsOpen: false,
  Type: 'General',
  Label: '',
  Inputs: [
    {
      Id: 'text-align',
      Type: 'group-buttons',
      Value: '0',
      Label: '<i class="bi bi-x"></i>', Unit: '',
      IsVisible: true,
      Options: [
        { Name: '<i class="bi bi-x"></i>', Classes: ['active'], Value: 'none' },
        { Name: '<i class="bi bi-text-left"></i>', Classes: [''], Value: 'left' },
        { Name: '<i class="bi bi-text-center"></i>', Classes: [''], Value: 'center' },
        { Name: '<i class="bi bi-text-right"></i>', Classes: [''], Value: 'right' },
      ],
      Option: 'none'
    },

    {
      Id: 'font-family',
      Type: 'dropdown',
      Value: 'Poppins',
      Label: '<i class="bi bi-x"></i>', Unit: '',
      IsVisible: true,
      Options: [],
      Option: 'none'
    },

    {
      Id: 'font-weight',
      Type: 'dropdown',
      Value: 500,
      Label: '<i class="bi bi-x"></i>', Unit: '',
      IsVisible: true,
      Options: [
        { Name: 100, Value: 100 },
        { Name: 200, Value: 200 },
        { Name: 300, Value: 300 },
        { Name: 400, Value: 400 },
        { Name: 500, Value: 500 },
        { Name: 600, Value: 600 },
        { Name: 700, Value: 700 },
        { Name: 800, Value: 800 },
        { Name: 900, Value: 900 },
      ],
      Option: 400
    },


    {
      Id: 'font-size',
      Type: 'number',
      Value: 12,
      Label: '', Unit: 'px',
      IsVisible: true,
      Options: [],
      Option: 'none'
    },


    {
      Id: 'color',
      Type: 'color',
      Value: '#000000',
      Label: '', Unit: '',
      IsVisible: true,
      Options: [],
      Option: 'none'
    },


    {
      Id: 'text-transform',
      Type: 'group-buttons',
      Value: '0',
      Label: '<i class="bi bi-x"></i>', Unit: '',
      IsVisible: true,
      Options: [
        { Name: '<i class="bi bi-x"></i>', Classes: ['active'], Value: 'none' },
        { Name: '<i class="bi bi-fonts"></i><i class="bi bi-fonts"></i>', Classes: [''], Value: 'uppercase' },
        { Name: '<i class="bi bi-type"></i>', Classes: [''], Value: 'capitalize' },
        { Name: 'tt', Classes: [''], Value: 'lowercase' },
      ],
      Option: 'none'
    },
  ],

}



export const SIZING: IOptions = {
  SectionName: 'Sizing',
  Catergory: SectionTypes.TEXT,
  IsOpen: false,
  Type: 'General',
  Label: '',
  Inputs: [



    {
      Id: 'width',
      Type: 'number',
      Value: 12,
      Label: 'W', Unit: 'px',
      IsVisible: true,
      Options: [],
      Option: 'none'
    },


    {
      Id: 'height',
      Type: 'number',
      Value: 12,
      Label: 'H', Unit: 'px',
      IsVisible: true,
      Options: [],
      Option: 'none'
    },

    {
      Id: 'min-width',
      Type: 'number',
      Value: 12,
      Label: 'Min W', Unit: 'px',
      IsVisible: true,
      Options: [],
      Option: 'none'
    },

    {
      Id: 'min-height',
      Type: 'number',
      Value: 12,
      Label: 'Min H', Unit: 'px',
      IsVisible: true,
      Options: [],
      Option: 'none'
    }

    ,

    {
      Id: 'max-width',
      Type: 'number',
      Value: 12,
      Label: 'Max W', Unit: 'px',
      IsVisible: true,
      Options: [],
      Option: 'none'
    },

    {
      Id: 'max-height',
      Type: 'number',
      Value: 12,
      Label: 'Max H', Unit: 'px',
      IsVisible: true,
      Options: [],
      Option: 'none'
    }
  ],

}



export const SPACING: IOptions = {
  SectionName: 'Spacing',
  Catergory: SectionTypes.TEXT,
  IsOpen: false,
  Type: 'General',
  Label: '',
  Inputs: [

    {
      Id: 'padding',
      Type: 'number',
      Value: 12,
      Label: 'Padding', Unit: '',
      IsVisible: true,
      Classes: ['btn', 'btn-outline-success'],
      Options: [
        {
          Id: 'top',
          Classes: ['children', 'top'],
          Value: 0,
          Unit: 'px'
        },
        {
          Id: 'right',
          Classes: ['children', 'right'],
          Value: 0,
          Unit: 'px'
        },
        {
          Id: 'bottom',
          Classes: ['children', 'bottom'],
          Value: 0,
          Unit: 'px'
        },
        {
          Id: 'left',
          Classes: ['children', 'left'],
          Value: 0,
          Unit: 'px'
        },



        {
          Id: 'center',
          Classes: ['children', 'center', 'active'],
          Value: 0,
          Unit: 'px'
        }
      ],
      Option: 'none',

    },

    {
      Id: 'margin',
      Type: 'number',
      Value: 12,
      Label: 'Margin', Unit: '',
      IsVisible: true,
      Options: [
        {
          Id: 'top',
          Classes: ['children', 'top'],
          Value: 0,
          Unit: 'px'
        },
        {
          Id: 'right',
          Classes: ['children', 'right'],
          Value: 0,
          Unit: 'px'
        },
        {
          Id: 'bottom',
          Classes: ['children', 'bottom'],
          Value: 0,
          Unit: 'px'
        },
        {
          Id: 'left',
          Classes: ['children', 'left'],
          Value: 0,
          Unit: 'px'
        },



        {
          Id: 'center',
          Classes: ['children', 'center', 'active'],
          Value: 0,
          Unit: 'px'
        }
      ],
      Option: 'none',
      Classes: ['btn', 'btn-outline-secondary']
    }
  ],

}

export const POSITION: IOptions = {
  SectionName: 'Position',
  Catergory: SectionTypes.TEXT,
  IsOpen: false,
  Type: 'General',
  Label: '',
  Inputs: [

    {
      Id: 'position',
      Type: 'number',
      Value: 12,
      Label: 'Padding', Unit: '',
      IsVisible: true,
      Classes: ['btn', 'btn-outline-success'],
      Options: [
        {
          Id: 'top',
          Classes: ['children', 'top'],
          Value: 0,
          Unit: 'px'
        },
        {
          Id: 'right',
          Classes: ['children', 'right'],
          Value: 0,
          Unit: 'px'
        },
        {
          Id: 'bottom',
          Classes: ['children', 'bottom'],
          Value: 0,
          Unit: 'px'
        },
        {
          Id: 'left',
          Classes: ['children', 'left'],
          Value: 0,
          Unit: 'px'
        }
      ],
      Option: 'none',

    },

    {
      Id: 'position',
      Type: 'group-buttons',
      Value: '0',
      Label: '<i class="bi bi-x"></i>', Unit: '',
      IsVisible: true,
      Options: [
        { Name: 'Position: ', Classes: ['active'], Value: 'none' },
        { Name: 'REL', Classes: [''], Value: 'relative' },
        { Name: 'FIX', Classes: [''], Value: 'fixed' },
        { Name: 'ABS', Classes: [''], Value: 'absolute' },
      ],
      Option: 'none'
    },

    {
      Id: 'z-index',
      Type: 'range',
      Value: '0',
      Label: 'Z Index', Unit: '',
      Options: [''],
      Units: ['px', 'rem', 'em', '%', 'fr'],
      IsVisible: true
    }

  ],

} 



export const BORDER_RADIUS: IOptions = {
  SectionName: 'Corners',
  Catergory: SectionTypes.TEXT,
  IsOpen: false,
  Type: 'General',
  Label: '',
  Inputs: [

    {
      Id: 'border-radius',
      Type: 'button-shape',
      Value: 0,
      Label: 'Padding', Unit: '',
      IsVisible: true,
      Classes: ['btn', 'btn-outline-success'],
      Options: [],
      Option: 'none',

    }
  ],

} 


export const BORDER: IOptions = {
  SectionName: 'Border',
  Catergory: SectionTypes.TEXT,
  IsOpen: true,
  Type: 'General',
  Label: '',
  Inputs: [

    {
      Id: 'border',
      Type: 'button-shape',
      Value: 0,
      Label: 'Padding', Unit: '',
      IsVisible: true,
      Classes: ['btn', 'btn-outline-success'],
      Options: [],
      Option: 'none',

    }
  ],

} 


export const BACKGROUND : IOptions =     {
  Id: 'bg',
  SectionName: 'Background',
  IsOpen: false,
  Type: 'Text',
  Inputs: [


    {
      Id: 'background-type',
      Type: 'group-buttons',
      Value: '0',
      Label: '<i class="bi bi-x"></i>', Unit: '',
      IsVisible: true,
      Options: [
        { Name: 'Color', Classes: [''], Value: 'color' },
        { Name: 'Image', Classes: [''], Value: 'image' },
        { Name: 'Gradient', Classes: [''], Value: 'Gradient' },
        { Name: 'None', Classes: [''], Value: 'none' },
      ],
      Option: 'none'
    },
 
    {
      Id: 'background',
      Type: 'color',
      Value: '#ffffff',
      Label: undefined,
      IsVisible: true,
      Options: [],
      Unit: ''
    },
    {
      Id: 'background',
      Type: 'image',
      Value: '#ffffff',
      Label: undefined,
      IsVisible: true,
      Options: [],
      Unit: ''
    }
  ],
}