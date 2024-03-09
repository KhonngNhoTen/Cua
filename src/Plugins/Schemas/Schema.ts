export class Schema {
  data: any = {};

  optional(fields: string[]) {
    return this;
  }

  required(fields: string[]) {
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
}

type decorations = {
  type: "number" | "string" | "boolean" | "array" | "object";
  example: any;
  description?: string;
  format?: string;
  nullable?: boolean;
  enum?: any[];
};
