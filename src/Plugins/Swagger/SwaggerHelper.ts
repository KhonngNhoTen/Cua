export class SwaggerHelper {
  static formatUrl2SwaggerPath(url: string, handler: (param: string) => void = () => {}) {
    url = url.replace(/:\w+/g, (param) => {
      param = param.replace(":", "");
      handler(param);
      return `{${param}}`;
    });
    return url;
  }
}
