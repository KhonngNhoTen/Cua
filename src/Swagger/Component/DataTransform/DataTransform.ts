import { RouteDataTransform } from "../../../Route/type";
import { IRouteGenerator } from "../../Core/IRouteGenerator";
import { ISwaggerComponent } from "../../Core/ISwaggerComponent";
import { SwaggerDataTransform } from "../../type";
import { MediaData } from "../MediaData/MediaData";
import { ContentTypeString } from "../MediaData/MediaType";
import { Schema } from "../Schema/Schema";

export class DataTransform implements ISwaggerComponent, IRouteGenerator {
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
        [this.mediaData.contentType]: this.mediaData.genSwagger(),
      },
    };
  }
}
