const { response, request } = require('express');

const Evento = require('../models/Evento');

const getEventos = async (req = request, res = response) => {

    const eventos = await Evento.find()
                                .populate('user', 'name');

    res.json({
        ok: true,
        eventos
    });
};

const crearEvento = async (req = request, res = response) => {

    const evento = new Evento(req.body);

    try {
        evento.user = req.uid;

        const eventoGuardado = await evento.save();

        res.json({
            ok: true,
            evento: eventoGuardado
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        });
    }
};

const actualizarEvento = async (req = request, res = response) => {

    const { id } = req.params;
    const { uid } = req;

    try {
        
        const evento = await Evento.findById(id);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'El evento no existe'
            });
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios sobre este evento'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        };

        const eventoActualizado = await Evento.findByIdAndUpdate(id, nuevoEvento, {
            new: true
        });

        res.json({
            ok: true,
            evento: eventoActualizado
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        });
    }
};

const eliminarEvento = async (req = request, res = response) => {
    
    const { id } = req.params;
    const { uid } = req;

    try {
        const evento = await Evento.findById(id);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'El evento no existe'
            });
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios sobre este evento'
            });
        }

        await Evento.findByIdAndDelete(id);

        res.json({ ok: true });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        });
    }
};

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
};