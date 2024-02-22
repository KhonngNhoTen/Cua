import { TYPES } from "../../Helpers/check-type";
import { SwaggerSchema } from "../type";
import Schema from "./SwaggerSchema";

class PrimitiveSchema extends Schema {
  private value: any;

  constructor(value: any, type: TYPES, name?: string) {
    super(type, name);
    this.value = value;
  }
  genSwagger(): SwaggerSchema {
    return {
      type: this.type === TYPES.STRING ? "string" : "number",
      example: this.value,
    };
  }
}
export default PrimitiveSchema;
