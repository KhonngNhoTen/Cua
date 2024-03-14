import { isObject } from "../../Helpers/getType";
import { Schema } from "./Schema";

type InputBooleanRule = boolean | [boolean, string | string[]];
type InputNumberRule = number | [number, string | string[]];

export type DataType = "string" | "number" | "boolean" | "object" | "array";
export type InputSchema = {
  type: DataType | [DataType, string | string[]];
  description?: string;
  properties?: Record<string, InputSchema | DataType>;
  item?: InputSchema | DataType;
  required?: InputBooleanRule;

  isEmail?: InputBooleanRule;
  isAscii?: InputBooleanRule;
  isAlpha?: InputBooleanRule;
  isAlphanumeric?: InputBooleanRule;
  isEmpty?: InputBooleanRule;
  isUrl?: InputBooleanRule;
  isRgbColor?: InputBooleanRule;
  isMD5?: InputBooleanRule;

  stringDate?: string | [string, string | string[]];

  length?: InputNumberRule;
  range?: { gte?: any; gt?: any; lte?: any; lt?: any; message: string | string[] };

  enum?: any[];
  actions?: [(data: any) => any];
};

// export type InputSchema = InputAttributeSchema | DataType;

export function isDataType(object: any): object is DataType {
  return typeof object === "string" && ["string", "number", "date", "boolean", "object", "array"].includes(object);
}

export function isInputSchema(object: any): object is InputSchema {
  if (isDataType(object)) return true;
  let type = (object as InputSchema).type;
  if (!type) return false;

  type = Array.isArray(type) ? type[0] : type;
  return ["string", "number", "date", "boolean", "object", "array"].includes(type);
}

// export function isInputSchema(object: any): object is InputSchema {
//   return isDataType(object) || isInputAttributeSchema(object);
// }

export function isMapInputSchema(object: any): object is Record<string, InputSchema> {
  if (!isObject(object)) return false;
  for (const [key, value] of Object.entries(object)) {
    if (!isInputSchema(value)) return false;
  }
  return true;
}

export function isMapSchema(object: any): object is Record<string, InputSchema> {
  if (!isObject(object)) return false;
  for (const [key, value] of Object.entries(object)) {
    if (!(value instanceof Schema)) return false;
  }
  return true;
}
