class MiddlewareData {
  req: any;
  res: any;
  next: any;
  extraData ?: any;
  
  constructor(req: any, res: any, next: any, extraData?: any) {
     this.req =req;
     this.res =res;
     this.next =next;
     this.extraData =extraData;
  }
} 

export default MiddlewareData;