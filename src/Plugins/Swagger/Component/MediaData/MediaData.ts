import { IRouteGenerator } from "../../Core/IRouteGenerator";
import { ISwaggerComponent } from "../../Core/ISwaggerComponent";
import { SwaggerMediaDataItem } from "../../type";
import { Example } from "../Example/Example";
import { BaseSchema } from "../Schema/BaseSchema";
import { Schema } from "../Schema/Schema";
import { ContentType, ContentTypeString } from "./MediaType";

export type MediaDataOptions = {
  schema: BaseSchema;
  examples?: Record<string, Example>;
  description?: string;
  contentType?: string;
};

export class MediaData implements ISwaggerComponent, IRouteGenerator {
  schema: BaseSchema;
  examples: Record<string, Example>;
  description: string;
  contentType: string;

  constructor(options?: MediaDataOptions) {
    this.schema = options?.schema ?? new Schema();
    this.examples = options?.examples ?? {};
    this.description = options?.description ?? "";
    this.contentType = options?.contentType ?? ContentTypeString[ContentType.JSON];
  }

  genSwagger(): SwaggerMediaDataItem {
    const examples = Object.keys(this.examples).reduce(
      (init, val) => ({ ...init, [val]: this.examples[val].genSwagger() }),
      {}
    );
    const swaggerOpts: SwaggerMediaDataItem = { schema: this.schema.genSwagger() };
    if (Object.keys(this.examples).length > 0) swaggerOpts.examples = examples;
    return swaggerOpts;
  }

  fromRoute(data: any): MediaData {
    const schema = new Schema().fromRoute(data);
    const examples = new Example({ value: data });
    return new MediaData({ schema, examples: { default: examples } });
  }
}
