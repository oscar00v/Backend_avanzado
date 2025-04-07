import { celebrate } from "celebrate";
import { Joi } from "celebrate";
import { Segments } from "../models/user.js";

const userValidation = celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    })
});