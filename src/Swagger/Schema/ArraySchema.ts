import { TYPES } from "../../Helpers/check-type";
import { SwaggerSchema } from "../type";
import Schema from "./Schema";

class ArraySchema extends Schema {
  protected items: Schema;
  constructor(items: Schema, type: TYPES, name?: string) {
    super(type, name);
    this.items = items;
  }
  genSwagger(): SwaggerSchema {
    return {
      type: "array",
      items: this.items.genSwagger(),
    };
  }
}

export default ArraySchema;
