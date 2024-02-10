import { glob } from "glob";
import Route from "./Route";

class RouteLoader {

    async load(path: string) {
        let routes: Route[] = []
        const files = glob.globSync(path.replace(/\\/g, '/'));
        for (let i = 0; i < files.length; i++) {
            const route = new Route(require(files[i]));
            routes = [...routes, ...route.listRoutes()]
        }
        return routes;
    }
}


export default RouteLoader;