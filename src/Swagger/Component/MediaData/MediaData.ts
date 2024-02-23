import { IRouteHandler } from "../../Core/IRouteHandler";
import { ISwaggerComponent } from "../../Core/ISwaggerComponent";
import { SwaggerMediaDataItem } from "../../type";
import { Example } from "../Example/Example";
import { BaseSchema } from "../Schema/BaseSchema";
import { Schema } from "../Schema/Schema";
import { ContentType } from "./MediaType";

export type MediaDataOptions = {
  schema: BaseSchema;
  examples?: Record<string, Example>;
  description?: string;
  contentType?: ContentType;
};

export class MediaData implements ISwaggerComponent, IRouteHandler {
  schema: BaseSchema;
  examples: Record<string, Example>;
  description: string;
  contentType: ContentType;

  constructor(options?: MediaDataOptions) {
    this.schema = options?.schema ?? new Schema();
    this.examples = options?.examples ?? {};
    this.description = options?.description ?? "";
    this.contentType = options?.contentType ?? ContentType.JSON;
  }

  genSwagger(): SwaggerMediaDataItem {
    const examples = Object.keys(this.examples).reduce(
      (init, val) => ({ ...init, [val]: this.examples[val].genSwagger() }),
      {}
    );

    return {
      schema: this.schema.genSwagger(),
      examples,
    };
  }

  fromRoute(data: any): MediaData {
    const schema = new Schema().fromRoute(data);
    const examples = new Example({ value: data });
    return new MediaData({ schema, examples: { default: examples } });
  }
}
