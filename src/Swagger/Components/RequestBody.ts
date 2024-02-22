import { BaseSchema } from "../SwaggerSchema/BaseSchema";
import { ContentType, ContentTypeString } from "./ContentType";
import ISwaggerComponent from "./SwaggerComponent";

class RequestBody implements ISwaggerComponent {
  private contentType: ContentType = ContentType.JSON;
  private schema: BaseSchema;

  constructor(schema: BaseSchema) {
    this.schema = schema;
  }

  genSwagger(): Object {
    return {
      content: {
        [ContentTypeString[this.contentType]]: {
          schema: this.schema.genSwagger(),
        },
      },
    };
  }
}

export default RequestBody;
