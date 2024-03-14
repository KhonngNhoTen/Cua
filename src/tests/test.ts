import { Schema } from "../Plugins/Schemas/Schema";
let schema = new Schema({
  type: "object",
  properties: {
    name: {
      type: "string",
      description: "Ho va ten",
    },
    age: {
      type: "number",
      description: "Tuoi",
    },
  },
});
console.log(schema.validations);
console.log(new Schema({ pet: { id: 0, name: "name" }, count: 0 }).validations);
