export interface IEvent {
  Id?: string;
  EventId?: string;
  WebsiteId?: string;
  PageId?: string;
  WidgetId?: string;
  ModifyUserId?: string;
  CreateUserId?: string;
  StatusId?: number;
  OrderNumber?: number;
  ShowOEvents?: boolean;
  ShowInputs?: boolean;
  Name: string;
  Events: IEvent[];
  Inputs: IEventInput[];
}
export interface IEventInput {
  Name: string;
  Type: string;
  Mode: string;
  InputValue: string;
  Source: string;
  SourceId: string;
  IsRequred: string;
  ViewOptions: boolean;
}
export interface IEmailEvent {
  FromEmail: string;
  ToEmail: string;
  Subject: string;
  Body: string;
}



export const EVENTS = [
  {
    Name: 'Send Email', Events: [], Inputs: [
      {
        Name: 'FromEmail', Type: 'string', IsRequred: 'yes', Mode: 'Dynamic', InputValue: '', ViewOptions: false, Source: '', SourceId: ''
      },
      {
        Name: 'ToEmail', Type: 'string', IsRequred: 'yes', Mode: 'Dynamic', InputValue: '', ViewOptions: false, Source: '', SourceId: ''
      },
      {
        Name: 'Subject', Type: 'string', IsRequred: 'yes', Mode: 'Dynamic', InputValue: '', ViewOptions: false, Source: '', SourceId: ''
      },
      {
        Name: 'Body', Type: 'string', IsRequred: 'yes', Mode: 'Dynamic', InputValue: '', ViewOptions: false, Source: '', SourceId: ''
      }
    ]
  },
  {
    Name: 'Show toast message', Events: [], Inputs: [
      {
        Name: 'Toast message', Type: 'string', IsRequred: 'yes', Mode: 'Dynamic', InputValue: '', ViewOptions: false, Source: '', SourceId: ''
      }
    ]
  },
  {
    Name: 'Navigate', Events: [
      { Name: 'Website page', Events: [], Inputs: [] },
      { Name: 'External link', Events: [], Inputs: [] },
    ], Inputs: []
  },

  // Show Hide
  {
    Name: 'Show/Hide element',
    Inputs: [],
    Events: [
      {
        Name: 'Show element',
        Events: [],
        Inputs: [
          {
            Name: 'Choose element...', Type: 'widget', IsRequred: 'yes', Mode: 'Dynamic', InputValue: '', ViewOptions: false, Source: '', SourceId: ''
          }
        ]
      },
      {
        Name: 'Hide element',
        Events: [],
        Inputs: [
          {
            Name: 'Choose element...', Type: 'widget', IsRequred: 'yes', Mode: 'Dynamic', InputValue: '', ViewOptions: false, Source: '', SourceId: ''
          }
        ]
      },
      {
        Name: 'Toggle element',
        Events: [],
        Inputs: [
          {
            Name: 'Choose element...', Type: 'widget', IsRequred: 'yes', Mode: 'Dynamic', InputValue: '', ViewOptions: false, Source: '', SourceId: ''
          }
        ]
      }
    ]

  },
];