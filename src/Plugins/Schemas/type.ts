
type InputBooleanRule = boolean | [boolean, string | string[]];
type InputNumberRule = number | [number, string | string[]];

export type DataType = "string" | "number" | "boolean" | "object" | "array";

export type InputSchema = {
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
  
  stringDate?: string | [string, string | string[]];
 
  length?: InputNumberRule;
  range?: { gte?: any; gt?: any; lte?: any; lt?: any; message: string | string[] };

  enum?: any[];
  actions?: [(data: any) => any];
};

export function isInputSchema(object: any): object is InputSchema {
  let type = (object as InputSchema).type;
  if (!type) return false;
  
  type = Array.isArray(type) ? type[0] : type;
  return ["string" , "number" , "date" , "boolean" , "object" , "array"].includes(type);
}

export type SchemaDecorations = {
  type?: DataType;
  example?: any;
  description?: string;
  format?: string[];
  required?: boolean;
  enum?: any[];
  name?: string;
  otherProperties?: any; 

  decorators?: SchemaDecorations[];
};


