export default function normalizationRoute(...params: any[]): { req: any; res: any; next: any; extraData: any } {
  const [para1, para2, para3, para4] = params;
  let req, res, next, extraData;
  if (para1 && para2 && para3 && !para4) [req, res, next] = [para1, para2, para3];
  if (para1 && para2 && !para3 && !para4) [req, res] = [para1, para2];
  if (para1 && para2 && para3 && para4) [extraData, req, res, next] = [para1, para2, para3, para4];

  return { req, res, next, extraData };
}
