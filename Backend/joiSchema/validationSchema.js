const Joi = require("joi");

const { validateRequest } = require("../middleware");

const email = Joi.string().min(3).max(50).email().required();
const mobileno = Joi.string().length(10).pattern(/^[0-9]+$/).required();
const password = Joi.string().min(6).max(15).required();

const registerSchema = Joi.object({
  fullname: Joi.string().min(3).max(50).required(),
  email: email,
  mobileno: mobileno,
  password: password,
  // skills: Joi.string().required(),
});

const loginSchema = (req, res, next) => {
  const schema = Joi.object({
    email: email,
    password: password,
  });
  validateRequest(req, res, next, schema);
}
const updateSchema = Joi.object({
  fullname: Joi.string().min(3).max(50),
  email: Joi.string().min(3).max(50).email(),
  mobileno: Joi.string().length(10).pattern(/^[0-9]+$/),
});
module.exports = {
  registerSchema,
  loginSchema,
  updateSchema
};
