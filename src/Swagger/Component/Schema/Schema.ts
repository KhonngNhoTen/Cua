import { RouteDataTransform } from "../../../Route/type";
import { IRouteHandler } from "../../Core/IRouteHandler";
import { SwaggerSchema } from "../../type";
import { BaseSchema, BaseSchemaOptions, TYPES } from "./BaseSchema";

export type SchemaOptions = {} & BaseSchemaOptions;

export class Schema extends BaseSchema implements IRouteHandler {
  constructor(options?: SchemaOptions) {
    super(options);
  }

  addNode(schema: BaseSchema, key?: string) {
    if (this.type === TYPES.ARRAY) {
      this.structures = {
        type: "array",
        items: schema.genSwagger(),
      };

      this.nodes[0] = schema;
    } else if (this.type === TYPES.OBJECT) {
      this.nodes[key ?? schema.name] = schema;
      if (!this.structures) this.structures = { type: "object", properties: {} };
      if (this.structures.properties) this.structures.properties[key ?? schema.name] = schema.genSwagger();
    }

    return this;
  }

  fromRoute(request: RouteDataTransform, key?: string): BaseSchema {
    const type = this.getType(request);
    let schemaOpts: BaseSchema;
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

  private primitiveTypeNode(request: RouteDataTransform, type: TYPES, key?: string): BaseSchema {
    return new Schema({
      type,
      example: request,
      name: key,
    });
  }

  private arrayTypeNode(request: RouteDataTransform, type: TYPES, key?: string): BaseSchema {
    const schema = this.fromRoute(request[0], key);
    return new Schema({
      type,
    }).addNode(schema);
  }

  private objectTypeNode(request: RouteDataTransform, type: TYPES, key?: string): BaseSchema {
    const keys = Object.keys(request);
    const schema: Schema = new Schema({ type });
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      schema.addNode(this.fromRoute(request[key], key));
    }

    return schema;
  }
}
