import { IidentifierForm } from "./types";
const orgForm: IidentifierForm = {
  listTitle: "Enter OTP",
  listName: "org",
  listType: "form",
  listMeta: {
    type: "form",
    layout: "landscape",
  },
  listItems: [
    {
      isShow: true,
      label: "Enter Name",
      labelStyle: "outside",
      field: "input",
      type: "text",
      size: "small",
      variant: "outlined",
      id: "name",
      name: "name",
      required: true,
      autoFocus: true,
      defaultValue: `Google`,
    },
    {
      isShow: true,
      label: "Enter Description",
      labelStyle: "outside",
      field: "input",
      type: "text",
      size: "small",
      variant: "outlined",
      id: "description",
      name: "description",
      required: false,
      defaultValue: `Google is a multinational technology company that specializes in Internet-related services and products, which include online advertising technologies, a search engine, cloud computing, software, and hardware.`,
    },
    {
      isShow: true,
      label: "Type",
      labelStyle: "outside",
      field: "input",
      type: "text",
      size: "small",
      variant: "outlined",
      id: "type",
      name: "type",
    },
  ],
  listSubmit: {
    isShow: true,
    label: "Submit",
    service: "OrgService",
    serviceMethod: "postRecord",
    notification: {
      success: "Org has been added successfully",
      failed: "An error occurred, please try later",
    },
  },
};

export { orgForm };
