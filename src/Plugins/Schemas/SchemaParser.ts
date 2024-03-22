import { getType } from "../../Helpers/getType";
import { RouteDecorAttribute } from "../../Route/type";
import { SchemaOptions } from "./type";

export function compile(data: any): SchemaOptions {
  const type = getType(data);
  if (type === "object") {
    const schema: SchemaOptions = { type: { type: "object" }, properties: {} };
    for (const [key, value] of Object.entries(data)) if (schema.properties) schema.properties[key] = compile(value);
    return schema;
  } else if (type === "array") {
    return { type: { type: "array" }, item: compile(data[0]) };
  }
  return { type: { type } };
}

const parseFormat = {
  isEmail: "email",
  isAscii: "ascii",
  isAlpha: "alpha",
  isAlphanumeric: "alphanumeric",
  isUrl: "uri",
  isRgbColor: "rgb",
  isMD5: "md5",
  stringDate: "date",
} as Record<string, string>;

const parseOtherProperties = {
  // length: (data: any) => ({ length: getRuleValue(data) }),
  range: (data: any) => ({ range: { maximun: data.lt ?? data.lte, minium: data.gt ?? data.gte } }),
} as Record<string, any>;

export function parseRouteDecorations(schema: SchemaOptions, name?: string): RouteDecorAttribute {
  const decorator: RouteDecorAttribute = {
    type: schema.type.type,
    description: schema.description,
    enum: schema.enum,
    required: !!schema.required,
    name,
    otherProperties: {},
  };

  // Create decorator for object type
  if (schema.type.type === "object" && schema.properties) {
    decorator.decorators = [];
    for (const [key, value] of Object.entries(schema.properties))
      decorator.decorators.push(parseRouteDecorations(value, key));
  }
  // Create decorator for array type
  else if ((schema.type.type === "array", schema.item)) decorator.decorators = [parseRouteDecorations(schema.item)];
  // Create decorator for other type
  else {
    Object.keys(schema).forEach((key: string) => {
      if (parseFormat[key]) decorator.format = parseFormat[key];
      if (parseOtherProperties[key]) decorator.otherProperties[key] = parseOtherProperties[key]((schema as any)[key]);
    });
  }

  return decorator;
}
