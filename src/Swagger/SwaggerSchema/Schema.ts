import { RouteRequest } from "../../Route/type";
import { SwaggerSchema } from "../type";
import { BaseSchema, TYPES } from "./BaseSchema";

export class Schema extends BaseSchema {
  private options: SwaggerSchema;

  constructor(request: RouteRequest) {
    super();
    this.create(request);
    this.options = this.create(request);
  }

  private create(request: RouteRequest, key?: string): SwaggerSchema {
    const type = this.getType(request);
    let schemaOpts: SwaggerSchema = {};
    switch (type) {
      case TYPES.OBJECT:
        schemaOpts = this.objectTypeNode(request, type, key);
        break;
      case TYPES.ARRAY:
        schemaOpts = this.arrayTypeNode(request, type, key);
        break;
      case TYPES.NUMBER:
      case TYPES.STRING:
        schemaOpts = this.primitiveTypeNode(request, type, key);
        break;
      default:
        throw new Error("Type not support");
    }
    return schemaOpts;
  }

  private primitiveTypeNode(request: RouteRequest, type: TYPES, key?: string): SwaggerSchema {
    return {
      type: type === TYPES.STRING ? "string" : "number",
      example: request,
    };
  }

  private arrayTypeNode(request: RouteRequest, type: TYPES, key?: string): SwaggerSchema {
    const schema = this.create(request[0], key);
    return {
      type: "array",
      items: schema,
    };
  }

  private objectTypeNode(request: RouteRequest, type: TYPES, key?: string): SwaggerSchema {
    const keys = Object.keys(request);
    const properties: Record<string, SwaggerSchema> = {};
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      properties[key] = this.create(request[key], key);
    }

    return {
      type: "object",
      properties,
    };
  }

  genSwagger(): Object {
    return this.options;
  }
}
