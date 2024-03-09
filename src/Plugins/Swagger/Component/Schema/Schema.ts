import { IRouteGenerator } from "../../Core/IRouteGenerator";
import { SwaggerSchema } from "../../type";
import { BaseSchema, BaseSchemaOptions, TYPES } from "./BaseSchema";

export type SchemaOptions = {} & BaseSchemaOptions;

export class Schema extends BaseSchema implements IRouteGenerator {
  constructor(options?: SchemaOptions) {
    super(options);
  }

  fromRoute(request: Object, key?: string): BaseSchema {
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

  private primitiveTypeNode(request: any, type: TYPES, key?: string): BaseSchema {
    return new Schema({
      type,
      example: request,
      name: key,
    });
  }

  private arrayTypeNode(request: any, type: TYPES, key?: string): BaseSchema {
    const schema = this.fromRoute(request[0], key);
    return new Schema({
      type,
    }).addNode(schema);
  }

  private objectTypeNode(request: any, type: TYPES, key?: string): BaseSchema {
    const keys = Object.keys(request);
    const schema: Schema = new Schema({ type });
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      schema.addNode(this.fromRoute(request[key], key), key);
    }

    return schema;
  }
}
