const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req = request, res = response) => {
    const {
        email,
        password
    } = req.body;

    try {
        let usuario = await Usuario.findOne({ email });

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario ya tiene ese correo'
            });
        }

        usuario = new Usuario( req.body );

        // Encriptar password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(usuario.password, salt);

        await usuario.save();

        // Generar nuestro JWT
        const token = await generarJWT(usuario.id, usuario.name);

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el admin',
        });
    }
};

const loginUsuario = async (req = request, res = response) => {
    const {
        email,
        password
    } = req.body;

    try {
        
        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
        }

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        // Generar nuestro JWT
        const token = await generarJWT(usuario.id, usuario.name);

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el admin',
        });
    }
};

const revalidarToken = async (req = request, res = response) => {
    const {
        uid,
        name
    } = req;

    // Generar nuestro JWT
    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        token
    });
};

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
};