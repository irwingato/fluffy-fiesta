import React, { useState } from 'react';
import BotaoVoltar from '../componentes/BotaoVoltar';
import Spinner from '../componentes/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BsListCheck } from 'react-icons/bs';
import { useSnackbar } from 'notistack';

const CriarTarefas = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState('');
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSalvarTarefa = () => {
    const dados = {
      nome,
      descricao,
      status,
    };
    setCarregando(true);
    axios
      .post('http://localhost:5555/tarefas', dados)
      .then(() => {
        setCarregando(false);
        enqueueSnackbar('Tarefa criada com sucesso!', { variant: 'success' });
        navigate('/entrar/home');
      })
      .catch((error) => {
        setCarregando(false);
        alert('Um erro ocorreu. Por favor tente novamente mais tarde.');
        enqueueSnackbar('Um erro ocorreu. Por favor tente novamente mais tarde.', {
          variant: 'error',
        })
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BotaoVoltar />
      <div className='flex flex-col items-center'>
        <h1 className='text-3xl my-4 flex items-center justify-center font-roboto font-bold text-sky-500'>
          <BsListCheck className='mr-2' size={24} />
          Criar Tarefa
        </h1>
        {carregando ? <Spinner /> : ''}
        <div className='w-1/2 border-2 border-sky-400 rounded-xl p-4 mx-auto'>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Nome:</label>
            <input
              type='text'
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className='border-2 border-sky-500 px-4 py-2 w-full'
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Descrição:</label>
            <input
              type='text'
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className='border-2 border-sky-500 px-4 py-2 w-full'
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Status:</label>
            <select              
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className='border-2 border-sky-500 px-4 py-2 w-full'
            >
              <option value='A Fazer'>A Fazer</option>
              <option value='Em Progresso'>Em Progresso</option>
              <option value='Concluído'>Concluído</option>
            </select>
          </div>
          <div className='flex justify-center'>
            <button className='p-2 bg-sky-500 text-white text-xl m-8 hover:bg-sky-600' onClick={handleSalvarTarefa}>
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CriarTarefas;
