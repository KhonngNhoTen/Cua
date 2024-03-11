import Joi from "joi";
import { Schema } from "../Plugins/Schemas/Schema";
let schema = Joi.object().keys({
  name: Joi.string().alphanum().min(3).max(30).required(),
  birthyear: Joi.number().integer().min(1970).max(2013),
  title: Joi.string().alphanum().min(3).max(30).required(),
  description: Joi.string().length(255).optional(),
  comments: Joi.array().items(
    Joi.object().keys({
      description: Joi.string(),
      author: Joi.string().required(),
      grade: Joi.number().min(1).max(5),
    })
  ),
  pets: Joi.array().items(Joi.string()),
  news: Joi.number().invalid(1, 2, 3, 4, 5),
  createdAt: Joi.date(),
  type: Joi.number().valid(1, 2, 3),
});

const aSchema = new Schema(schema).optional("*");
console.log(aSchema.decorations);
