import { Route } from "../../Route/Route";
import { ContentStream, StreamData } from "../../Route/StreamData";

export default new Route({
  code: "PET_MENU",
  baseUrl: "/pets",
  description: "All api of pet managers",
  tags: ["Pet"],
  childs: [
    // {
    //   code: "PET.LIST",
    //   description: "List all pets",
    //   url: "GET /",
    //   parameters: {
    //     query: { name: "", id: 0 },
    //   },
    //   security: false,
    //   handler: async () => {},
    //   response: { data: [{ name: "", id: 0, age: 0 }] },
    // },
    // {
    //   code: "PET.CREATE",
    //   description: "Create new pet",
    //   url: "POST /",
    //   request: {
    //     name: "",
    //     age: 0,
    //   },
    //   security: true,
    //   handler: async () => {},
    //   response: { data: [{ name: "", id: 0, age: 0 }] },
    // },
    // {
    //   code: "PET.UPDATE",
    //   description: "Update pets",
    //   url: "PUT /:idPet",
    //   request: {
    //     name: "",
    //     age: 0,
    //   },
    //   security: false,
    //   parameters: { path: { idPet: "" } },
    //   handler: async () => {},
    //   response: { "200": { data: [{ name: "", id: 0, age: 0 }] }, "400": { message: "Fail" } },
    // },
    {
      code: "PET.UPLOAD_FILE",
      description: "Upload pets image",
      url: "POST /upload",
      security: true,
      request: new StreamData().singleFile("files"),
      handler: async () => {},
      response: new StreamData().addType(ContentStream.JS),
    },
  ],
});
