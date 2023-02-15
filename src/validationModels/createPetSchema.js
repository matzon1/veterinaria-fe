import joi from "joi";
const today = new Date();
today.setHours(0, 0, 0, 0)
export const createPetSchema = joi.object({
  petType: joi
  .string()
  .required()
  .messages({
    'string.empty': 'El campo no puede estar vacío.',
    "any.required": "Este campo es obligatorio",
  }),
 petName: joi
 .string()
 .min(1)
 .max(100)
 .required()
 .messages({
   "string.min": "Debe contener al menos 1 caracter",
   "string.max": "Debe contener como máximo 100 caracteres",
   "any.required": "Este campo es obligatorio",
   "string.empty": "Este campo es obligatorio",
}),
petWeight: joi
.number()
.integer()
.greater(0)
.less(1000)
.required()
.messages({
"number.greater": "Mínimo 1kg",
"number.less": "Máximo 1000kg",
"number.empty": "Este campo es obligatorio",
"number.base": "Debe ingresar un número",
"any.required": "Este campo es obligatorio",
}),
petAge: joi
.number()
.integer()
.greater(0,1)
.less(1000)
.required()
.messages({
"number.greater": "Mínimo 0,1kg",
"number.less": "Máximo 1000kg",
"number.empty": "Este campo es obligatorio",
"number.base": "Debe ingresar un número",
"any.required": "Este campo es obligatorio",
}),
isCastrated: joi
  .string()
  .required()
  .messages({
    'string.empty': 'El campo no puede estar vacío.',
    "any.required": "Este campo es obligatorio",
  }),

});