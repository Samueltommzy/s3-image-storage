import Joi from "joi";
const PostSchema = Joi.object({
  imageUrl: Joi.string().required(),
});

const GetSchema = Joi.object({
  imageKey: Joi.string().required(),
});

export default {
  PostSchema,
  GetSchema,
};
