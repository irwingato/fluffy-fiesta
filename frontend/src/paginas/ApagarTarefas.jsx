import React, { useState } from 'react';
import BotaoVoltar from '../componentes/BotaoVoltar';
import Spinner from '../componentes/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { BsTrash } from 'react-icons/bs';
import { useSnackbar } from 'notistack';

const ApagarTarefas = () => {
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleApagarTarefas = () => {
    setCarregando(true);
    axios
      .delete(`http://localhost:5555/tarefas/${id}`)
      .then(() => {
        setCarregando(false);
        enqueueSnackbar('Tarefa apagada com sucesso!', {
          variant: 'success',
        })
        navigate('/');
      })
      .catch((error) => {
        setCarregando(false);
        //alert('Um erro ocorreu. Por favor tente novamente mais tarde.');
        enqueueSnackbar('Erro ao apagar tarefa', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BotaoVoltar />
      <div className='flex flex-col items-center'>
        <h1 className='text-3xl my-4 flex items-center justify-center font-roboto font-bold text-sky-500'>
          <BsTrash className='mr-2 text-sky-500' size={24} /> Apagar Tarefa
        </h1>
        {carregando ? <Spinner /> : ''}
        <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
          <h3 className='text-2xl text-sky-500'>Você tem certeza que deseja apagar esta tarefa?</h3>
          <button className='p-2 bg-red-600 text-white mt-8 w-1/2 text-lg' onClick={handleApagarTarefas}>
            Sim, Apagar isso
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApagarTarefas;