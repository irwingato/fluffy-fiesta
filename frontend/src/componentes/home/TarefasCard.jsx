import React from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaInfoCircle, FaTrash } from 'react-icons/fa';
import TarefasCardSingle from './TarefasCardSingle';

const TarefasCard = ({ tarefas }) => {
    return (
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {tarefas.map((item) => (
                <TarefasCardSingle key={item._id} tarefa={item} />
            ))}
        </div>
    );
};

export default TarefasCard;