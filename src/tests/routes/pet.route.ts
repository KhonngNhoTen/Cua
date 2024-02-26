import { Route } from "../../Route/Route";

export default new Route({
  code: "PET_MENU",
  baseUrl: "/pets",
  description: "All api of pet managers",
  tags: ["Pet"],
  childs: [
    {
      code: "PET.LIST",
      description: "List all pets",
      url: "GET /",
      parameters: {
        query: { name: "", id: 0 },
      },
      handler: async (req, res, next) => {
        res.send("hello");
      },
      response: { data: [{ name: "", id: 0, age: 0 }] },
    },
    {
      code: "PET.CREATE",
      description: "Create new pet",
      url: "POST /",
      request: {
        name: "",
        age: 0,
      },
      handler: async (req, res, next) => {
        res.send("hello");
      },
      response: { data: [{ name: "", id: 0, age: 0 }] },
    },
    {
      code: "PET.UPDATE",
      description: "Update pets",
      url: "PUT /:idPet",
      request: {
        name: "",
        age: 0,
      },
      parameters: { path: { idPet: "" } },
      handler: async (req, res, next) => {
        res.send("hello");
      },
      response: { data: [{ name: "", id: 0, age: 0 }] },
    },
  ],
});
