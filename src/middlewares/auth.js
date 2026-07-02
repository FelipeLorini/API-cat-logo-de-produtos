const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarioModel');

const proteger = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ mensagem: 'Token não fornecido' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const usuario = await Usuario.buscarPorId(decoded.id);
        
        if (!usuario) {
            return res.status(401).json({ mensagem: 'Usuário não encontrado' });
        }
        
        req.usuario = usuario;
        next();
    } catch (error) {
        return res.status(401).json({ mensagem: 'Token inválido' });
    }
};

module.exports = { proteger };