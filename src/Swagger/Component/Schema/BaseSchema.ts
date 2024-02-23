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
  public type: TYPES;
  public nodes: Record<string, BaseSchema> = {};
  public structures: SwaggerSchema = {};
  public nullable: boolean;
  public example: any;
  public description: string;
  public format: string;
  public enum: string[] = [];
  public name: string;

  constructor(options?: BaseSchemaOptions) {
    this.type = options?.type ?? TYPES.OBJECT;
    this.nullable = options?.nullable ?? false;
    this.description = options?.description ?? "";
    this.format = options?.format ?? "";
    this.enum = options?.enum ?? [];
    this.example = options?.example;
    this.name = options?.name ?? "";
  }

  genSwagger(): SwaggerSchema {
    if (this.type === TYPES.NUMBER || this.type === TYPES.STRING)
      return {
        type: this.type === TYPES.STRING ? "string" : "number",
        example: this.example,
        description: this.description ?? "",
        enum: this.enum,
        format: this.format,
      };
    return this.structures;
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
