import { isObject } from "../../Helpers/getType";
import { Schema } from "./Schema";
import { DataType, InputSchema } from "./type";

//#region Functions check type
export function isDataType(object: any): object is DataType {
  return typeof object === "string" && ["string", "number", "date", "boolean", "object", "array"].includes(object);
}

export function isInputSchema(object: any): object is InputSchema {
  if (isDataType(object)) return true;
  let type = (object as InputSchema).type;
  if (!type) return false;
  if (isDataType(type) || (type.type && isDataType(type.type))) return true;
  return false;
}

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

//#endregion
