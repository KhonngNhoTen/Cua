import Joi from "joi";
import { parseDecorations } from "./Joi2SchemaDecoration";
import clone from "clone"

export type TypeSchemaDecoration = "number" | "string" | "boolean" | "array" | "object";
export type SchemaDecorations = {
  type?: TypeSchemaDecoration;
  example?: any;
  description?: string;
  format?: string[];
  required?: boolean;
  enum?: any[];
  childs?: Record<string, SchemaDecorations>;
};

export class Schema {
  validations?: Joi.AnySchema;
  decorations?: SchemaDecorations;
  examples?: Record<string, any>;

  constructor(schema?: Object | Joi.AnySchema, examples?: Object) {
    if (!schema) return;
    if (Joi.isSchema(schema)) this.validations = schema;
    else this.validations = Joi.compile(schema);

    this.decorations = parseDecorations(this.validations.describe());
    this.examples = examples;
  }

  optional(fields: string[] | string) {
    return this;
  }

  required(fields: string[] | string) {
    return this;
  }

  remove(fields: string[]) {
    return this;
  }

  add(field: any) {
    return this;
  }

  merge(schema: Schema) {
    return this;
  }

  clone() {
    return clone<Schema>(this);
  }
}
