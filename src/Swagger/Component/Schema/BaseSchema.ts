import { ISwaggerComponent } from "../../Core/ISwaggerComponent";
import { SwaggerSchema } from "../../type";

export type BaseSchemaOptions = {
  type: TYPES;
  nullable?: boolean;
  example?: any;
  description?: string;
  format?: string;
  enum?: string[];
  structures?: SwaggerSchema;
  name?: string;
};

export enum TYPES {
  STRING,
  NUMBER,
  OBJECT,
  ARRAY,
}
export class BaseSchema implements ISwaggerComponent {
  public type?: TYPES;
  public nodes: Record<string, BaseSchema> = {};
  public structures: SwaggerSchema = {};
  public nullable?: boolean;
  public example?: any;
  public description?: string;
  public format?: string;
  public enum?: string[];
  public name: string;

  constructor(options?: BaseSchemaOptions) {
    this.type = options?.type ?? TYPES.OBJECT;
    this.nullable = options?.nullable ?? false;
    this.description = options?.description ?? "";
    this.format = options?.format ?? "";
    this.enum = options?.enum;
    this.example = options?.example;
    this.name = options?.name ?? "";

    if (this.type === TYPES.NUMBER || this.type === TYPES.STRING)
      this.structures = {
        type: this.type === TYPES.STRING ? "string" : "number",
        example: this.example,
        description: this.description ?? "",
        enum: this.enum,
        format: this.format,
      };
  }

  genSwagger(): SwaggerSchema {
    return this.structures;
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
      this.structures = {
        type: "object",
        properties: {
          [key ?? schema.name]: schema.genSwagger(),
        },
      };
    }

    return this;
  }

  getType(value: any): TYPES {
    const type = {}.toString.call(value).split(" ")[1].slice(0, -1).toLowerCase();
    if (type === "number") return TYPES.NUMBER;
    if (type === "string") return TYPES.STRING;
    if (type === "object") return TYPES.OBJECT;
    if (type === "array") return TYPES.ARRAY;

    if (typeof value === "object") return TYPES.OBJECT;

    throw new Error("Type not support");
  }
}
