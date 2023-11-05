const express = require('express');
const { Tarefa } = require('../models/workflowModel.js');

const tarefasRotas = express.Router();

/* Rota para salvar uma nova tarefa no sistema de workflow */
tarefasRotas.post('/', async (request, response) => {
    /* Fazendo um try e catch para tratamento de erros */
    try {
        /* Fazendo um se um campo estiver vazio */
        if (
            !request.body.nome ||
            !request.body.descricao ||
            !request.body.status
        ) {
            /* Fazendo um return com status 400 com uma mensagem */
            return response.status(400).send({
                message: 'Envie todos os campos: nome, descricao, status',
            });
        }
        /* Criando uma nova tarefa */
        const novaTarefa = {
            nome: request.body.nome,
            descricao: request.body.descricao,
            status: request.body.status,
            id_usuario: request.body.id_usuario
        };

        /*  salva a tarefa usando await */
        const tarefa = await Tarefa.create(novaTarefa);

        /* Retorna uma resposta com status 201 e a tarefa */
        return response.status(201).send(tarefa);

    } catch (error) {
        /* Fazendo um retorno com status 500 */
        console.log ? (error.message) :
            response.status(500).send({ message: error.message });
    }
});

/* Rota para pegar todas as tarefas do usuário no banco de dados */
tarefasRotas.get('/usuario/:id', async (request, response) => {

    try {
        const { id } = request.params;
        const tarefas = await Tarefa.find({ id_usuario: userId });

        return response.status(200).json({
            contador: tarefas.length,
            data: tarefas,
        });
    } catch (error) {
        return response.status(500).send({ message: error.message });
    }
});

/* Rota para atualizar uma tarefa */
tarefasRotas.put('/:id', async (request, response) => {
    try {
        if (!request.body.nome ||
            !request.body.descricao ||
            !request.body.status
        ) {
            return response.status(400).send({
                message: 'Envie todos os campos: nome, descricao, status',
            });
        }

        const { id } = request.params;
        const resultado = await Tarefa.findByIdAndUpdate(id, request.body);

        if (!resultado) {
            return response.status(404).send({ message: 'Tarefa não encontrada' });
        }

        return response.status(200).send({ message: 'Tarefa atualizada com sucesso' });

    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});


/* Route for Delete a task */
tarefasRotas.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const resultado = await Tarefa.findByIdAndDelete(id);

        if (!resultado) {
            return response.status(404).json({ message: 'Tarefa não encontrada' });
        }

        return response.status(200).send({ message: 'Tarefa excluída com sucesso' });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

/* Exportando a rota */
module.exports = tarefasRotas;