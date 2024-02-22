import { BaseSchema } from "../SwaggerSchema/BaseSchema";
import { SwaggerResponse } from "../type";
import { ContentTypeString, ContentType } from "./ContentType";
import ISwaggerComponent from "./SwaggerComponent";

class Response implements ISwaggerComponent {
  private status: string;
  private description: string;
  private contentType: ContentType;
  private schema: BaseSchema;

  constructor(schema: BaseSchema, status?: string, contentType?: ContentType, description?: string) {
    this.status = status ?? "default";
    this.description = description ?? "";
    this.contentType = contentType ?? ContentType.JSON;
    this.schema = schema;
  }

  genSwagger(): SwaggerResponse {
    return {
      [this.status]: {
        description: this.description,
        content: {
          [ContentTypeString[this.contentType]]: {
            examples: "",
            schema: this.schema.genSwagger(),
          },
        },
      },
    };
  }

  static isWrapperRepsonse(response: Object) {
    const key = Object.keys(response).reduce((init, val) => (init += val), "");
    return /^[0-9]+$/.test(key);
  }
}

export default Response;
