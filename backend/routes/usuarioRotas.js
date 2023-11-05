const express = require("express");
const { Usuario, validar } = require("../models/usuario.js");
const bcrypt = require("bcrypt");
const usuarioRotas = express.Router();

usuarioRotas.post("/", async (request, response) => {
    try {
        const { error } = validar(request.body);
        if (error) return response.status(400).send(error.details[0].message);

        const user = await Usuario.findOne({ email: request.body.email });
        if (user)
            return response.status(409).send({ message: "Usuário com esse email já existe" });

        const hashPassword = await bcrypt.hash(request.body.senha, 10);

        await new Usuario({
            nome: request.body.nome,
            sobrenome: request.body.sobrenome,
            email: request.body.email,
            senha: hashPassword,
        }).save();
        response.status(201).send("Usuário criado com sucesso");
    } catch (error) {
        response.status(500).send({ message: "Erro interno do servidor" });
    }
});

usuarioRotas.put("/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const { error } = validar(request.body);
        if (error) return response.status(400).send(error.details[0].message);

        const usuario = await Usuario.findById(id);
        if (!usuario) {
            return response.status(404).json({ message: 'Usuário não encontrado' });
        }

        usuario.nome = request.body.nome;
        usuario.sobrenome = request.body.sobrenome;
        usuario.email = request.body.email;
        usuario.senha = await bcrypt.hash(request.body.senha, 10);

        await usuario.save();

        response.status(200).json(usuario);
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ message: 'Erro interno do servidor' });
    }
});

usuarioRotas.delete("/:id", async (request, response) => {
    try {
      const { id } = request.params;
      const usuario = await Usuario.findByIdAndDelete(id);
  
      if (!usuario) {
        return response.status(404).json({ message: 'Usuário não encontrado' });
      }
  
      response.status(200).json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
      console.error(error.message);
      response.status(500).json({ message: 'Erro interno do servidor' });
    }
  });

// Rota para recuperar todos os usuários
usuarioRotas.get("/", async (request, response) => {
    try {
        const usuarios = await Usuario.find();
        response.status(200).json(usuarios);
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ message: 'Erro interno do servidor' });
    }
});

// Rota para recuperar um usuário por ID
usuarioRotas.get("/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const usuario = await Usuario.findById(id);

        if (!usuario) {
            return response.status(404).json({ message: 'Usuário não encontrado' });
        }

        response.status(200).json(usuario);
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ message: 'Erro interno do servidor' });
    }
});

module.exports = usuarioRotas;