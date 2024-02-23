import { RouteDataTransform } from "../../../Route/type";
import { IRouteHandler } from "../../Core/IRouteHandler";
import { Schema } from "../Schema/Schema";
import { TYPES } from "../Schema/BaseSchema";
import { BaseParameter, BaseParameterOptions } from "./BaseParameter";
import { MediaData } from "../MediaData/MediaData";

export class Parameter extends BaseParameter implements IRouteHandler {
  fromRoute(data: RouteDataTransform, location: "query" | "header" | "path" | "cookie", key?: string): BaseParameter {
    const opts: BaseParameterOptions = {
      in: location,
      name: key ?? "",
    };

    const type = new Schema().getType(data);
    if (type === TYPES.OBJECT) opts.content = new MediaData().fromRoute(data);
    else opts.schema = new Schema().fromRoute(data);
    return new Parameter(opts);
  }
}
