interface IlistItem {
  isShow?: boolean;
  type?: "text" | "hidden";
  field: "input" | "autocompletewithadd" | "radio" | "textarea" | "hr";
  variant: "filled" | "outlined" | "standard";
  size?: "small" | "normal";
  labelStyle?: "inside" | "outside" | "start" | "center" | "end";
  labelPosition?: "start" | "top" | "center" | "end";
  id: string;
  name: string;
  label?: string;
  defaultValue?: any;
  required?: true | false;
  dataset?: any;
  datasetLabel?: any;
  helperText?: any;
  autoFocus?: boolean;
}

interface IlistSubmit {
  isShow: Boolean;
  label: String;
  service: String;
  serviceMethod: String;
  notification?: any;
  size?: "small" | "medium" | "large";
  position?: "start" | "end";
}
interface IlistMeta {
  type: "form" | any;
  layout?: "portrait" | "landscape";
}

interface IidentifierForm {
  listName?: string;
  listType?: string;
  listMeta?: IlistMeta;
  listTitle?: string;
  listDescription?: string;
  listItems?: IlistItem[];
  listSubmit?: IlistSubmit;
}

export type { IidentifierForm as IprofileForm };
export type { IidentifierForm as formInterface };
export type { IlistItem, IidentifierForm };
