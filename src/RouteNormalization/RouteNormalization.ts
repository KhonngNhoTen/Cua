import MiddlewareData from "./MiddlewareData";

class RouteNormalization {
    normalize(...params: any[]) {
        const [req, res, next] = params;
       return new MiddlewareData(req, res, next);
    }
}

export default RouteNormalization;