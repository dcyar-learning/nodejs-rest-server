const { Schema, model } = require('mongoose');

const userSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es requerido.'],
    },
    email: {
        type: String,
        required: [true, 'El correo es requerido.'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerida.'],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    },
});

userSchema.methods.toJSON = function v() {
    const {
        __v, password, _id, ...user
    } = this.toObject();

    return { uid: _id, ...user };
};

module.exports = model('User', userSchema);
