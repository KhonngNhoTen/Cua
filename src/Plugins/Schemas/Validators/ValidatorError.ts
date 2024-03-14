type ValidatorErrorOptions = {
  messages?: string | string[];
  value?: any;
  keyName?: string;
  wildCard?: string;
};

export class ValidatorError extends Error {
  messages?: string | string[];
  value?: any;
  keyName?: string;
  wildCard?: string;

  constructor(opts: ValidatorErrorOptions) {
    super();
    this.messages = opts.keyName;
    this.value = opts.value;
    this.keyName = opts.keyName;
    this.wildCard = opts.wildCard;
  }
}
