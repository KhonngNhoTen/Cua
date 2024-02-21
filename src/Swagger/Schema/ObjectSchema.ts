import { TYPES } from "../../Helpers/check-type";
import { SwaggerSchema } from "../type";
import Schema from "./Schema";

export default class ObjectSchema extends Schema {
  protected properties: Record<string, Schema> = {};
  protected schemaProperties: SwaggerSchema;
  constructor(properties: Record<string, Schema>, type: TYPES, name?: string) {
    super(type, name);
    this.properties = properties;

    const schemas = Object.keys(properties).reduce((init, key) => {
      init = { ...init, [key]: properties[key].genSwagger() };
      return init;
    }, {});
    this.schemaProperties = {
      type: "object",
      properties: schemas,
    };
  }
  genSwagger(): SwaggerSchema {
    return this.schemaProperties;
  }
}
