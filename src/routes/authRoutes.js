const express = require('express');
const router = express.Router();
const { registro, login } = require('../controllers/authController');

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Registrar novo usuário
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               senha:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/register', registro);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Fazer login
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               senha:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       200:
 *         description: Login realizado, retorna token JWT
 *       401:
 *         description: Email ou senha incorretos
 */
router.post('/login', login);

module.exports = router;