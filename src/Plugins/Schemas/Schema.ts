declare function require(name: string): any;

const clone = require("clone") as Function;

import { DataType, InputSchema, RequiredRuleOptions, SchemaOptions, TypeRuleOptions } from "./type";
import { compile } from "./SchemaParser";
import { isDataType, isInputSchema } from "./helper";

export class Schema {
  validations: SchemaOptions;
  examples?: Record<string, any>;

  constructor(schema: Record<string, any> | InputSchema, examples?: Object) {
    if (isInputSchema(schema)) this.validations = this.input2SchemaOptions(schema);
    else this.validations = compile(schema);
  }

  private defaultAttributeRule(input: InputSchema): SchemaOptions {
    const type: TypeRuleOptions = isDataType(input.type) ? { type: input.type } : input.type;
    let requried: RequiredRuleOptions | undefined = undefined;
    if (input.required === true || input.required === undefined) requried = {};
    else if (input.required) requried = input.required;

    input.type = type;
    input.required = requried;
    return input as SchemaOptions;
  }

  private input2SchemaOptions(input: InputSchema | DataType): SchemaOptions {
    if (isDataType(input)) input = { type: input };
    if (input.properties) {
      const keys = Object.keys(input.properties);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        input.properties[key] = this.input2SchemaOptions(input.properties[key]);
      }
    }
    if (input.item) input.item = this.input2SchemaOptions(input.item);
    input = this.defaultAttributeRule(input);
    return input as SchemaOptions;
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
