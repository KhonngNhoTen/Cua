export type CustomMessageOptions = {
  message: string;
  attribute: string;
  ruleName: string;
};
export type CustomMessage = (data: CustomMessageOptions) => string;
