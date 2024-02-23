import { RouteDataTransform } from "../../../Route/type";
import { IRouteHandler } from "../../Core/IRouteHandler";
import { ISwaggerComponent } from "../../Core/ISwaggerComponent";
import { SwaggerDataTransform, SwaggerMediaData } from "../../type";
import { MediaData } from "../MediaData/MediaData";
import { ContentTypeString } from "../MediaData/MediaType";
import { Schema } from "../Schema/Schema";

export class DataTransform implements ISwaggerComponent, IRouteHandler {
  private mediaData: MediaData;
  constructor(mediaData: MediaData) {
    this.mediaData = mediaData;
  }

  fromRoute(route: RouteDataTransform): DataTransform {
    return new DataTransform(
      new MediaData({
        schema: new Schema().fromRoute(route),
      })
    );
  }
  genSwagger(): SwaggerDataTransform {
    return {
      description: this.mediaData.description,
      content: {
        [ContentTypeString[this.mediaData.contentType]]: this.mediaData.genSwagger(),
      },
    };
  }
}
