
export interface IOptions {
  Id?: string;
  SectionName: string;
  IsOpen: boolean,
  Inputs: IInput[],
  Type: string;
  SelectedOption?: string
  EventOptions?: any[];
  Url?: any;
}

export interface IInput {
  Id: string;
  ParentId?: string;
  IsVisible: boolean;
  Type: string;
  Value: any;
  Label: string;
  Unit?: string;
  Units?: string[];
  Options?: string[] | number[];
  Option?: string;
  Inputs?: IInput[],
  Classes?: string[],

}

export const STYLE_ITEMS: IOptions[] =
  [
    {
      SectionName: 'General',
      IsOpen: true,
      Type: 'General',
      Inputs: [
        {
          Id: 'margin-right',
          Type: 'image-check',
          Value: '0',
          Label: 'assets/images/widgets/align-left.svg', Unit: '',
          IsVisible: true
        },
        {
          Id: 'margin-center',
          Type: 'image-check',
          Value: '0',
          Label: 'assets/images/widgets/align-center.svg', Unit: '',
          IsVisible: true
        },
        {
          Id: 'margin-left',
          Type: 'image-check',
          Value: '0',
          Label: 'assets/images/widgets/align-right.svg', Unit: '',
          IsVisible: true
        },

      ],

    },
    {
      SectionName: 'Size',
      IsOpen: false,
      Type: 'Text',
      Inputs: [
        {
          Id: 'width',
          Type: 'number',
          Value: '0',
          Label: 'Wid', Unit: 'px',
          Units: ['px', 'rem', 'em', '%', 'fr'],
          IsVisible: true
        },
        {
          Id: 'height',
          Type: 'number',
          Value: '0',
          Label: 'Height', Unit: 'px',
          Units: ['px', 'rem', 'em', '%', 'fr'],
          IsVisible: true
        },
        {
          Id: 'min-width',
          Type: 'number',
          Value: '0',
          Label: 'Min.WID', Unit: 'px',
          Units: ['px', 'rem', 'em', '%', 'fr'],
          IsVisible: true
        },
        {
          Id: 'min-height ',
          Type: 'number',
          Value: '0',
          Label: 'Min.Hei', Unit: 'px',
          Units: ['px', 'rem', 'em', '%', 'fr'],
          IsVisible: true
        },
        {
          Id: 'max-width',
          Type: 'number',
          Value: '0',
          Label: 'Max.WID', Unit: 'px',
          Units: ['px', 'rem', 'em', '%', 'fr'],
          IsVisible: true
        },
        {
          Id: 'max-height ',
          Type: 'number',
          Value: '0',
          Label: 'Max.Hei', Unit: 'px',
          Units: ['px', 'rem', 'em', '%', 'fr'],
          IsVisible: true
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
          Type: 'number',
          Value: '0',
          Label: 'Left', Unit: 'px',
          Units: ['px', 'rem', 'em', '%', 'fr'],
          IsVisible: true
        },
        {
          Id: 'padding-top',
          Type: 'number',
          Value: '0',
          Label: 'Top', Unit: 'px',
          Units: ['px', 'rem', 'em', '%', 'fr'],
          IsVisible: true
        },
        {
          Id: 'padding-right',
          Type: 'number',
          Value: '0',
          Label: 'Right', Unit: 'px',
          Units: ['px', 'rem', 'em', '%', 'fr'],
          IsVisible: true
        },
        {
          Id: 'padding-bottom',
          Type: 'number',
          Value: '0',
          Label: 'Bottom', Unit: 'px',
          Units: ['px', 'rem', 'em', '%', 'fr'],
          IsVisible: true
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
          Type: 'number',
          Value: '0',
          Label: 'Left', Unit: 'px',
          Units: ['px', 'rem', 'em', '%', 'fr'],
          IsVisible: true
        },
        {
          Id: 'margin-top',
          Type: 'number',
          Value: '0',
          Label: 'Top', Unit: 'px',
          Units: ['px', 'rem', 'em', '%', 'fr'],
          IsVisible: true
        },
        {
          Id: 'margin-right',
          Type: 'number',
          Value: '0',
          Label: 'Right', Unit: 'px',
          Units: ['px', 'rem', 'em', '%', 'fr'],
          IsVisible: true
        },
        {
          Id: 'margin-bottom',
          Type: 'number',
          Value: '0',
          Label: 'Bottom', Unit: 'px',
          Units: ['px', 'rem', 'em', '%', 'fr'],
          IsVisible: true
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
          Type: 'number',
          Value: '12',
          Label: 'Size', Unit: 'px',
          Units: ['px', 'rem', 'em', '%', 'fr'],
          IsVisible: true
        },
        {
          Id: 'font-weight',
          Type: 'number',
          Value: '500',
          Label: 'Weight',
          Options: [100, 200, 300, 400, 500, 600, 700, 800, 900],
          IsVisible: true
        },
        {
          Id: 'text-decoration',
          Type: 'number',
          Value: 'none',
          Label: 'Line',
          Options: ['none', 'overline', 'line-through', 'underline', 'underline overline'],
          IsVisible: true
        },
        {
          Id: 'font-style',
          Type: 'number',
          Value: 'normal',
          Label: 'Style',
          Options: ['normal', 'italic'],
          IsVisible: true
        },
        {
          Id: 'text-align',
          Type: 'number',
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
          IsVisible: true
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
          IsVisible: true
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
          Type: 'number',
          Value: '0',
          Label: 'Left', Unit: 'px',
          Units: ['px', 'rem', 'em', '%', 'fr'],
          IsVisible: true
        },
        {
          Id: 'top',
          Type: 'number',
          Value: '0',
          Label: 'Top', Unit: 'px',
          Units: ['px', 'rem', 'em', '%', 'fr'],
          IsVisible: true
        },
        {
          Id: 'right',
          Type: 'number',
          Value: '0',
          Label: 'Right', Unit: 'px',
          Units: ['px', 'rem', 'em', '%', 'fr'],
          IsVisible: true
        },
        {
          Id: 'bottom',
          Type: 'number',
          Value: '0',
          Label: 'Bottom', Unit: 'px',
          Units: ['px', 'rem', 'em', '%', 'fr'],
          IsVisible: true
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
          Type: 'number',
          Value: '0',
          Label: 'Z Index',
          IsVisible: true
        }
      ],
    },
    {
      SectionName: 'Display',
      IsOpen: false,
      Type: 'Text',
      Inputs: [

        {
          Id: 'display',
          Type: 'select-option',
          Value: 'none',
          Label: 'display', Unit: '',
          Options: ['block', 'inline-block', 'inline', 'grid', 'flex', 'none'],
          IsVisible: true
        }
      ],
    },
  ];


export const CONFIG_ITEMS: IOptions[] =
  [
    {
      SectionName: 'Click',
      IsOpen: true,
      Type: 'Go to link',
      Inputs: null,
      Url: '',
      EventOptions: [{ Action: 'None' }, { Action: 'Go to page' }, { Action: 'Go to link' }]
    }
  ];







let bg = {
  SectionName: 'Background',
  IsOpen: false,
  Type: 'Background',
  Inputs: [
    {
      Id: 'background',
      Type: 'choice',
      Value: '/assets/images/mock/30.png',
      Label: 'Type', Unit: 'px',
      Options: ['Color', 'Image'],
      Option: 'Color',
      Inputs: [
        {
          Id: 'background-repeat',
          Type: 'select-option',
          Value: '0',
          Label: 'Repeat', Unit: 'px',
          Options: ['repeat', 'no-repeat'],
          Option: 'no-repeat'
        },
        {
          Id: 'background-size',
          Type: 'select-option',
          Value: '0',
          Label: 'Size', Unit: 'px',
          Options: ['cover', 'no-repeat'],
          Option: 'cover'
        },
        {
          Id: 'background-position',
          Type: 'select-option',
          Value: '0',
          Label: 'Position', Unit: 'px',
          Options: ['center', 'no-repeat'],
          Option: 'center'
        },
        {
          Id: 'background-attachment',
          Type: 'select-option',
          Value: '0',
          Label: 'Attachment', Unit: '',
          Options: ['fixed', 'no-repeat'],
          Option: 'fixed'
        },
        {
          Id: '0',
          Type: 'color',
          Value: '50',
          Label: 'Overlay', Unit: '',
          Options: ['fixed', 'no-repeat'],
          Option: 'fixed'
        },
        {
          Id: '0',
          Type: 'range',
          Value: '50',
          Label: 'Opercity', Unit: '',
          Options: ['fixed', 'no-repeat'],
          Option: 'fixed'
        }
      ],
    }
  ]
}