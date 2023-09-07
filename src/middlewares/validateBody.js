const Joi = require("joi");

const validateBody = (req, _res, next) => {
  const schema = Joi.array().items(
    Joi.object({
      product_code: Joi.number().required().positive(),
      new_price: Joi.number().required().positive(),
    }).required()
  );
  const { error } = schema.validate(req.body);

  if (error) {
    error.name = "ValidationError";
    error.status = 400;
    throw error;
  }

  next();
};

module.exports = validateBody;
