import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BotaoVoltar from '../componentes/BotaoVoltar';
import Spinner from '../componentes/Spinner';
import { MdInfo } from 'react-icons/md'; // Import the MdInfo icon
import './MostrarTarefas.css'; // Import the custom CSS file for MostrarTarefas

function MostrarTarefas() {
  const [tarefa, setTarefas] = useState({});
  const [carregando, setCarregando] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setCarregando(true);
    axios
      .get(`http://localhost:5555/tarefas/${id}`)
      .then((response) => {
        setTarefas(response.data);
        setCarregando(false);
      })
      .catch((error) => {
        console.log(error);
        setCarregando(false);
      });
  }, [id])

  return (
    <div className='p-4'>
      <BotaoVoltar />
      <h1 className='text-3xl my-4 flex items-center justify-center font-roboto font-bold text-sky-500'>
        <MdInfo className='mr-2' size={24} /> {/* Use the MdInfo icon for information display */}
        Mostrar Tarefa
      </h1>
      {carregando ? (
        <Spinner />
      ) : (
        <div className='container'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-700'>Id:</span>
            <span className='text-lg text-blue-500'>{tarefa._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Nome:</span>
            <span className='text-lg text-blue-500'>{tarefa.nome}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Descrição:</span>
            <span className='text-lg text-blue-500'>{tarefa.descricao}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Status:</span>
            <span className='text-lg text-blue-500'>{tarefa.status}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Quando foi criada:</span>
            <span className='text-lg text-blue-500'>{new Date(tarefa.createdAt).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Última vez que foi atualizada:</span>
            <span className='text-lg text-blue-500'>{new Date(tarefa.updatedAt).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default MostrarTarefas;
