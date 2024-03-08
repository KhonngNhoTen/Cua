import { IRouteGenerator } from "../../Core/IRouteGenerator";
import { Schema } from "../Schema/Schema";
import { TYPES } from "../Schema/BaseSchema";
import { BaseParameter, BaseParameterOptions } from "./BaseParameter";
import { MediaData } from "../MediaData/MediaData";

export class Parameter extends BaseParameter implements IRouteGenerator {
  fromRoute(
    data: Object,
    location: "query" | "header" | "path" | "cookie",
    key?: string,
    required?: boolean
  ): BaseParameter {
    const opts: BaseParameterOptions = {
      in: location,
      name: key ?? "",
      required,
    };

    const type = new Schema().getType(data);
    if (type === TYPES.OBJECT) opts.content = new MediaData().fromRoute(data);
    else opts.schema = new Schema().fromRoute(data);
    return new Parameter(opts);
  }
}
