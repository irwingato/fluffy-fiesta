const { required } = require("joi");
const mongoose = require("mongoose");

const tarefaStatus = ["A Fazer", "Em Progresso", "Concluído"];

/* Cria um esquema completo de banco de dados para o sistema de fluxo de trabalho */
const workflowSchema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: true,
        },
        descricao: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: tarefaStatus,
            required: true,
        },
        id_usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Usuario',
            required: true
        }
    },
    {
        timestamps: true,
    }
);

/* Exporta esse modelo como uma const com o nome Tarefa */
exports.Tarefa = mongoose.model('Tarefa', workflowSchema);