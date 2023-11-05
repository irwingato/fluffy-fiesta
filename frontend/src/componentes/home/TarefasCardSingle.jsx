import React from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaInfoCircle, FaTrash } from 'react-icons/fa';

const TarefasCardSingle = ({tarefa}) => {
    return (
        <div
            key={tarefa._id}
            className='border-2 border-gray-300 rounded-l px-4 py-2 m-4 relative hover:shadow-md'
        >
            <h2 className='absolute top-1 right-2 px-4 py-1 bg-blue-200 rounded-lg text-blue-900'>
                {tarefa.nome}
            </h2>
            <h4 className='my-2 text-gray-600'>{tarefa._id}</h4>
            <div className='flex justify-start items-center gap-x-2'>
                <FaInfoCircle className='text-blue-500 text-2xl' />
                <h2 className='my-1 text-blue-700'>{tarefa.descricao}</h2>
            </div>
            <div className='flex justify-start items-center gap-x-2'>
                <FaInfoCircle className='text-blue-500 text-2xl' />
                <h2 className='my-1 text-blue-700'>{tarefa.status}</h2>
            </div>
            <div className='flex justify-between items-center gap-x-2 mt-4 p-4'>
                <Link to={`/tarefas/detalhes/${tarefa._id}`}>
                    <FaInfoCircle className='text-blue-500 text-2xl' />
                    <span className='my-1 text-blue-700'>Detalhes</span>
                </Link>
                <Link to={`/tarefas/editar/${tarefa._id}`}>
                    <FaEdit className='text-yellow-600 text-2xl' />
                    <span className='my-1 text-yellow-700'>Editar</span>
                </Link>
                <Link to={`/tarefas/apagar/${tarefa._id}`}>
                    <FaTrash className='text-red-600 text-2xl' />
                    <span className='my-1 text-red-700'>Apagar</span>
                </Link>
            </div>
        </div>
    )
}

export default TarefasCardSingle;
