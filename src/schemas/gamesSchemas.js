import joi from "joi";

const gameSchema = joi.object({
    name: joi.string().trim().required(),
    image: joi.string().required(),
    stockTotal: joi.number().min(1).required(),
    pricePerDay: joi.number().min(1).required(),
    categoryId: joi.number().min(0).required(),
})

export { gameSchema };