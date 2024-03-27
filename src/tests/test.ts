import { Schema } from "../Plugins/Schemas/Schema";
import { validate, validateAsync } from "../Plugins/Schemas/Validator";

let schema = new Schema({
  type: "object",
  properties: {
    name: "number",
    age: "number",
    childs: {
      type: "array",
      item: "number",
    },
    prop: {
      type: "object",
      properties: {
        test: "number",
        test2: "string",
      },
    },
  },
});

console.time("test....");
const rs = validate({ name: 0 }, schema, { abortEarly: false });
console.log(rs);
console.timeEnd("test....");

async function main() {
  console.time("test....2");
  const rs2 = await validateAsync({ name: "Linh" }, schema, { abortEarly: false });
  console.log(rs2);
  console.timeEnd("test....2");
}

main();
