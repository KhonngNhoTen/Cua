import clone from "clone";
import { InputSchema, SchemaDecorations, isInputSchema } from "./type";
import { compile, parseDecorations } from "./SchemaParser";

export class Schema {
  validations?: InputSchema;
  decorations?: SchemaDecorations;
  examples?: Record<string, any>;

  constructor(schema?: Object | InputSchema, examples?: Object) {
    if (isInputSchema(schema)) this.validations = schema;
    else this.validations = compile(schema);
    this.decorations = parseDecorations(this.validations)
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
