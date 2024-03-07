import { SwaggerSchema } from "../../type";
import { BaseSchema, BaseSchemaOptions } from "./BaseSchema";

export type FileSchemaOptions = { isArrayFile: boolean } & BaseSchemaOptions;

export class FileSchema extends BaseSchema {
  private isArrayFile?: boolean;
  constructor(opts: FileSchemaOptions) {
    super(opts);
    this.isArrayFile = opts.isArrayFile;
  }
  genSwagger(): SwaggerSchema {
    return this.isArrayFile
      ? {
          type: "array",
          items: {
            type: "string",
            format: "binary",
          },
        }
      : {
          type: "string",
          format: "binary",
        };
  }
}
