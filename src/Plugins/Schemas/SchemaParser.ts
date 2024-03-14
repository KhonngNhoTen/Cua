import { getType } from "../../Helpers/getType";
import { RouteDecorAttribute } from "../../Route/type";
import { getRuleValue } from "./SchemaHelper";
import { DataType, InputSchema, isDataType } from "./type";

export function compile(data: any): InputSchema {
  const type = getType(data);
  if (type === "object") {
    const schema: InputSchema = { type: "object", properties: {} };
    for (const [key, value] of Object.entries(data)) if (schema.properties) schema.properties[key] = compile(value);
    return schema;
  } else if (type === "array") {
    return { type: "array", item: compile(data[0]) };
  }
  return { type };
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
  length: (data: any) => ({ length: getRuleValue(data) }),
  range: (data: any) => ({ range: { maximun: data.lt ?? data.lte, minium: data.gt ?? data.gte } }),
} as Record<string, any>;

export function parseRouteDecorations(input: InputSchema | DataType, name?: string): RouteDecorAttribute {
  if (isDataType(input)) {
    input = { type: input };
  }
  const decorator: RouteDecorAttribute = {
    type: getRuleValue(input.type),
    description: input.description,
    enum: input.enum,
    required: getRuleValue(input.required),
    name,
    otherProperties: {},
  };

  // Create decorator for object type
  if (input.type === "object" && input.properties) {
    decorator.decorators = [];
    for (const [key, value] of Object.entries(input.properties))
      decorator.decorators.push(parseRouteDecorations(value, key));
  }
  // Create decorator for array type
  else if ((input.type === "array", input.item)) decorator.decorators = [parseRouteDecorations(input.item)];
  // Create decorator for other type
  else {
    Object.keys(input).forEach((key: string) => {
      if (parseFormat[key]) decorator.format = parseFormat[key];
      if (parseOtherProperties[key]) decorator.otherProperties[key] = parseOtherProperties[key]((input as any)[key]);
    });
  }

  return decorator;
}
