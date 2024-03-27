export type DescriptionAttribute = {
  attributeName?: string;
  attributeValue: any;
  path: string;
};

export type ValidateErrorDetail = {
  message: string;
} & DescriptionAttribute;

export type ResultCheckRule = {
  message?: string;
  valid: boolean;
  forceSkip?: boolean;
};

export type ResultValidate = {
  valid: boolean;
  errors: ValidateErrorDetail[];
};

export type ValidateOption = {
  /** Cancel checking when error exist */
  abortEarly: boolean;

  /** Custom content error */
  customError?: any;

  /** Hook call when error exists */
  onValid?: Function;
};

export type CustomMessageOptions = {
  message: string;
  propertyName?: string;
  propertyValue: string;
  ruleName: string;
};
export type CustomMessage = (data: CustomMessageOptions) => string;
