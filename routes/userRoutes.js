import express from 'express';


import { registerUser, loginUser, logoutUser, editUser, removeUser } from '../model/user';

const router = express.Router();

router.post('/usuario/registro', (req, res) => {
    const result = registerUser(req.body);
    res.json(result);
});

router.post('/usuario/login', (req, res) => {
    const result = loginUser(req.body);
    res.json(result);
});

router.post('/usuario/logout', (req, res) => {
    const result = logoutUser(req.body);
    res.json(result);
});

router.post('/usuario/editar', (req, res) => {
    const result = editUser(req.body);
    res.json(result);
});

router.post('/usuario/remover', (req, res) => {
    const result = removeUser(req.body);
    res.json(result);
});

export default router;