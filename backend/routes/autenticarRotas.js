/* Importa os módulos necessários */
const express = require('express');
const { Usuario } = require('../models/usuario');
const Joi = require('joi');
const bcrypt = require('bcrypt');

const autenticarRotas = express.Router();

autenticarRotas.post("/admin/usuario", async (request, response) => {
    try {
        // Verifique se o usuário autenticado é um administrador antes de criar um novo usuário com isAdmin definido como true
        if (!request.user.isAdmin) {
            return response.status(403).send({ message: "Acesso negado. Você não tem permissão para criar usuários administradores." });
        }

        const { error } = validar(request.body);
        if (error) return response.status(400).send(error.details[0].message);

        const user = await Usuario.findOne({ email: request.body.email });
        if (user) {
            return response.status(409).send({ message: "Usuário com esse email já existe" });
        }

        const hashPassword = await bcrypt.hash(request.body.senha, 10);

        await new Usuario({
            nome: request.body.nome,
            sobrenome: request.body.sobrenome,
            email: request.body.email,
            senha: hashPassword,
            isAdmin: true,
        }).save();

        response.status(201).send("Usuário administrador criado com sucesso");
    } catch (error) {
        response.status(500).send({ message: "Erro interno do servidor" });
    }
});

autenticarRotas.post("/admin/usuario", async (request, response) => {
    try {
        // Verifique se o usuário autenticado é um administrador antes de criar um novo usuário com isAdmin definido como true
        if (!request.user.isAdmin) {
            return response.status(403).send({ message: "Acesso negado. Você não tem permissão para criar usuários." });
        }

        const { error } = validar(request.body);
        if (error) return response.status(400).send(error.details[0].message);

        const user = await Usuario.findOne({ email: request.body.email });
        if (user) {
            return response.status(409).send({ message: "Usuário com esse email já existe" });
        }

        const hashPassword = await bcrypt.hash(request.body.senha, 10);

        await new Usuario({
            nome: request.body.nome,
            sobrenome: request.body.sobrenome,
            email: request.body.email,
            senha: hashPassword,
        }).save();

        response.status(201).send("Usuário administrador criado com sucesso");
    } catch (error) {
        response.status(500).send({ message: "Erro interno do servidor" });
    }
});

autenticarRotas.get("/admin/usuarios", async (request, response) => {
    try {
        // Verifique se o usuário autenticado é um administrador antes de listar todos os usuários
        if (!request.user.isAdmin) {
            return response.status(403).send({ message: "Acesso negado. Você não tem permissão para listar usuários." });
        }

        const usuarios = await Usuario.find();
        response.status(200).send(usuarios);
    } catch (error) {
        response.status(500).send({ message: "Erro interno do servidor" });
    }
});

autenticarRotas.put("/admin/usuarios/:id", async (request, response) => {
    try {
        // Verifique se o usuário autenticado é um administrador antes de atualizar as informações do usuário
        if (!request.user.isAdmin) {
            return response.status(403).send({ message: "Acesso negado. Você não tem permissão para atualizar informações de usuários." });
        }

        const { error } = validar(request.body);
        if (error) return response.status(400).send(error.details[0].message);

        const usuario = await Usuario.findByIdAndUpdate(request.params.id, {
            nome: request.body.nome,
            sobrenome: request.body.sobrenome,
            email: request.body.email,
        });

        if (!usuario) {
            return response.status(404).send({ message: "Usuário não encontrado" });
        }

        response.status(200).send("Informações do usuário atualizadas com sucesso");
    } catch (error) {
        response.status(500).send({ message: "Erro interno do servidor" });
    }
});

autenticarRotas.delete("/admin/usuarios/:id", async (request, response) => {
    try {
        // Verifique se o usuário autenticado é um administrador antes de excluir o usuário
        if (!request.user.isAdmin) {
            return response.status(403).send({ message: "Acesso negado. Você não tem permissão para excluir usuários." });
        }

        const usuario = await Usuario.findByIdAndDelete(request.params.id);

        if (!usuario) {
            return response.status(404).send({ message: "Usuário não encontrado" });
        }

        response.status(200).send("Usuário excluído com sucesso");
    } catch (error) {
        response.status(500).send({ message: "Erro interno do servidor" });
    }
});

autenticarRotas.post('/', async (request, response) => {
    try {
        const { error } = validar(request.body);
        if (error)
            return response.status(400).send(error.details[0].message);

        /* Verifies if exist a user with the email */
        const usuario = await Usuario.findOne({ email: request.body.email });
        /* if doesn't exist returns a message */
        if (!usuario)
            return response.status(400).send({ message: "Usuário não encontrado" });

        /* Verifies if the password or email is correct */
        const senhaValida = await bcrypt.compare(
            request.body.senha, usuario.senha
        );
        if (!senhaValida)
            return response.status(400).send({ message: "Senha ou email incorreto" });

        response.status(200).send({ message: "Login efetuado com sucesso" });
    } catch (error) {
        return response.status(500).send({ message: "Erro interno do servidor (autenticar rota) " + error });
    }
});

/* Cria um validação de dados usando joi*/
const validar = (dados) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("email"),
        senha: Joi.string().required().label("senha"),
    });
    return schema.validate(dados);
};

/* Exporta a route */
module.exports = autenticarRotas;