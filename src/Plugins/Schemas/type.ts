export type DataType = "string" | "number" | "date" | "boolean" | "object" | "array";

export type InputSchema = {
  type: DataType;
  description?: string;
};

type InputBooleanRule = boolean | [boolean, string | string[]];
type InputNumberRule = number | [number, string | string[]];

export type InputFieldSchema = {
  type: DataType | [DataType, string | string[]];
  description?: string;
  properties?: Record<string, InputSchema>;
  item?: InputSchema;
  required?: InputBooleanRule;
  isEmail?: InputBooleanRule;
  isAscii?: InputBooleanRule;
  isAlpha?: InputBooleanRule;
  isAlphanumeric?: InputBooleanRule;
  isEmpty?: InputBooleanRule;
  isUrl?: InputBooleanRule;
  isRgbColor?: InputBooleanRule;
  isMD5?: InputBooleanRule;
  length?: InputNumberRule;

  range?: { gte?: any; gt?: any; lte?: any; lt?: any; message: string | string[] };
  enum?: any[];
  stringDate?: string | [string, string | string[]];
  actions: [(data: any) => any];
};
