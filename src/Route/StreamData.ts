import { DataTransform } from "../Swagger/Component/DataTransform/DataTransform";
import { MediaData } from "../Swagger/Component/MediaData/MediaData";
import { TYPES } from "../Swagger/Component/Schema/BaseSchema";
import { FileSchema } from "../Swagger/Component/Schema/FileSchema";
import { Schema } from "../Swagger/Component/Schema/Schema";
import { BaseRouteDataTransform } from "./BaseRouteDataTransform";
import { RouteDataTransform } from "./type";

export const ContentStream = {
  GIF: "image/gif",
  JPEG: "image/jpeg",
  PNG: "image/png",
  TIFF: "image/tiff",
  AUDIO_MPEG: "audio/mpeg",
  AUDIO_WAV: "audio/x-wav",
  MULTIPART_FORM: "multipart/form-data",
  CSS: "text/css",
  CSV: "text/csv",
  HTML: "text/html",
  JS: "text/javascript",
  TEXT: "text/plain",
  XML: "text/xml",
  VIDEO_MPEG: "video/mpeg",
  MP4: "video/mp4",
  FLV: "video/x-flv",
  WEBM: "video/webm",
};

export class StreamData extends BaseRouteDataTransform {
  private listFileName?: string;
  private singleFileName?: string;
  private description?: string;
  private data?: RouteDataTransform;
  private contentType: string = ContentStream.MULTIPART_FORM;

  listFile(name: string) {
    this.listFileName = name;
    return this;
  }

  singleFile(name: string) {
    this.singleFileName = name;
    return this;
  }

  fields(data: RouteDataTransform) {
    this.data = data;
    return this;
  }

  addDescription(description: string) {
    this.description = description;
    return this;
  }

  addType(type: string) {
    this.contentType = type;
    return this;
  }

  dataTransform(): DataTransform {
    const isArrayFile = !!this.listFileName;
    const nameFile = this.listFileName ?? this.singleFileName;
    let streamSchema = new FileSchema({ isArrayFile, type: TYPES.FILE });

    if (this.listFileName || this.singleFileName)
      streamSchema = new Schema().fromRoute(this.data ?? {}).addNode(streamSchema, nameFile);

    return new DataTransform(
      new MediaData({
        schema: streamSchema,
        contentType: this.contentType,
        description: this.description,
      })
    );
  }
}
