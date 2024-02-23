export enum ContentType {
  JSON,
  URL_ENDCODED,
  XML,
  MULTIPART,
}

export const ContentTypeString = {
  [ContentType.JSON]: "application/json",
  [ContentType.URL_ENDCODED]: "application/x-www-form-urlencoded",
  [ContentType.XML]: "application/xml",
  [ContentType.MULTIPART]: "multipart/form-data",
};
