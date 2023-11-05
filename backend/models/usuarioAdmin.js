const usuarioSchema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: true,
        },
        sobrenome: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        senha: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

usuarioSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, 
        { expiresIn: '7d'});
    return token;
};

const Usuario = mongoose.model('usuario', usuarioSchema);

const validar = (dados) => {
    const schema = Joi.object({
        nome: Joi.string().required(),
        sobrenome: Joi.string().required(),
        email: Joi.string().email().required(),
        senha: passwordComplexity().required(),
    });

    return schema.validate(dados);
};

module.exports = { Usuario, validar };