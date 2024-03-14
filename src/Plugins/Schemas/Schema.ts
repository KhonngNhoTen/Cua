declare function require(name: string): any;

const clone = require("clone") as Function;

import { InputSchema, isInputSchema } from "./type";
import { compile } from "./SchemaParser";

export class Schema {
  validations: InputSchema;
  examples?: Record<string, any>;

  constructor(schema: Record<string, any> | InputSchema, examples?: Object) {
    if (isInputSchema(schema)) this.validations = schema;
    else this.validations = compile(schema);
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
    return clone(this) as Schema;
  }
}
