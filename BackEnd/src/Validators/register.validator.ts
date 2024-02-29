import joi from "joi";

export const registerUserSchema = joi.object({
  Fname: joi.string().required(),
  Lname: joi.string().required(),
  email: joi.string().email().required(),
  phone_number: joi.string().optional(),
  password: joi.string().required(),
});
