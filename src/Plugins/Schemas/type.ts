import validator from "validator";
import { isObject } from "../../Helpers/getType";
import { Schema } from "./Schema";
import { CustomMessage } from "./Validator/CustomMessage";

export type BaseRuleOptions = { message?: CustomMessage };
export type DataType = "string" | "number" | "boolean" | "object" | "array";

export type IsEmailRuleOptions = BaseRuleOptions & { emailOption?: validator.IsEmailOptions };
export type IsUrlRuleOptions = BaseRuleOptions & { urlOptions?: validator.IsURLOptions };
export type RequiredRuleOptions = BaseRuleOptions;
export type TypeRuleOptions = BaseRuleOptions & { type: DataType };

export type InputSchema = {
  type: TypeRuleOptions | DataType;
  description?: string;
  properties?: Record<string, InputSchema | DataType>;
  item?: InputSchema | DataType;
  required?: RequiredRuleOptions | boolean;

  isEmail?: IsEmailRuleOptions | boolean;
  isAscii?: boolean | BaseRuleOptions;
  isAlpha?: boolean | BaseRuleOptions;
  isAlphanumeric?: boolean | BaseRuleOptions;
  isEmpty?: boolean | BaseRuleOptions;
  isUrl?: IsUrlRuleOptions | boolean;
  isRgbColor?: boolean | BaseRuleOptions;
  isMD5?: boolean | BaseRuleOptions;

  stringDate?: string | [string, string | string[]];

  length?: number;
  range?: { gte?: any; gt?: any; lte?: any; lt?: any; message: string | string[] };

  enum?: any[];
  actions?: [(data: any) => any];
};

export type SchemaOptions = {
  type: TypeRuleOptions;
  description?: string;
  properties?: Record<string, SchemaOptions>;
  item?: SchemaOptions;
  required?: RequiredRuleOptions;

  isEmail?: IsEmailRuleOptions;
  isAscii?: BaseRuleOptions;
  isAlpha?: BaseRuleOptions;
  isAlphanumeric?: BaseRuleOptions;
  isEmpty?: BaseRuleOptions;
  isUrl?: IsUrlRuleOptions;
  isRgbColor?: BaseRuleOptions;
  isMD5?: BaseRuleOptions;

  stringDate?: string;

  length?: number;
  range?: { gte?: any; gt?: any; lte?: any; lt?: any; message: string | string[] };

  enum?: any[];
  actions?: [(data: any) => any];
};
