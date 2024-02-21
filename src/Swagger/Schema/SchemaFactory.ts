import { TYPES, getType } from "../../Helpers/check-type";
import { RouteRequest } from "../../Route/type";
import ArraySchema from "./ArraySchema";
import ObjectSchema from "./ObjectSchema";
import PrimitiveSchema from "./PrimitiveSchema";
import Schema from "./Schema";

export class SchemaFactory {
  public static create(request: RouteRequest, key?: string): Schema {
    const type = getType(request);

    if (type === TYPES.OBJECT) {
      const keys = Object.keys(request);
      const properties: Record<string, Schema> = {};
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        properties[key] = this.create(request[key], key);
      }
      return new ObjectSchema(properties, type, key);
    } else if (type === TYPES.ARRAY) {
      const schema = this.create(request[0], key);
      return new ArraySchema(schema, type, key);
    } else if (type === TYPES.NUMBER || type === TYPES.STRING) return new PrimitiveSchema(request, type, key);

    throw new Error("Type not support");
  }
}
