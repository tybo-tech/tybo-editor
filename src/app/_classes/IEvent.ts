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


export const EVENT_NAMES = {
  SEND_EMAIL: { Name: 'Send Email' },
  SHOW_TOAST_MESSAGE: { Name: 'Show toast message' },
  NAVIGATE: { Name: 'Navigate' },
  PAGE: { Name: 'Page on this website' },
  LINK: { Name: 'External link' },
  SHOW_HIDE: { Name: 'Show/Hide element' },
  SHOW: { Name: 'Show element' },
  HIDE: { Name: 'Hide element' },
  TOGGLE: { Name: 'Toggle element' },
}


export const EVENTS = [
  {
    Name: EVENT_NAMES.SEND_EMAIL.Name, Events: [], Inputs: [
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
    Name: EVENT_NAMES.SHOW_TOAST_MESSAGE.Name, Events: [], Inputs: [
      {
        Name: 'Toast message', Type: 'string', IsRequred: 'yes', Mode: 'Dynamic', InputValue: '', ViewOptions: false, Source: '', SourceId: ''
      }
    ]
  },
  {
    Name: EVENT_NAMES.NAVIGATE.Name, Events: [
      { Name: EVENT_NAMES.PAGE.Name, Events: [], Inputs: [] },
      { Name: EVENT_NAMES.LINK.Name, Events: [], Inputs: [] },
    ], Inputs: []
  },

  // Show Hide
  {
    Name: EVENT_NAMES.SHOW_HIDE.Name,
    Inputs: [],
    Events: [
      {
        Name: EVENT_NAMES.SHOW.Name,
        Events: [],
        Inputs: [
          {
            Name: 'Choose element...', Type: 'widget', IsRequred: 'yes', Mode: 'Dynamic', InputValue: '', ViewOptions: false, Source: '', SourceId: ''
          }
        ]
      },
      {
        Name: EVENT_NAMES.HIDE.Name,
        Events: [],
        Inputs: [
          {
            Name: 'Choose element...', Type: 'widget', IsRequred: 'yes', Mode: 'Dynamic', InputValue: '', ViewOptions: false, Source: '', SourceId: ''
          }
        ]
      },
      {
        Name: EVENT_NAMES.TOGGLE.Name,
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
