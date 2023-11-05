import React, { useState, useEffect } from 'react';
import BotaoVoltar from '../componentes/BotaoVoltar';
import Spinner from '../componentes/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { useSnackbar } from 'notistack';

const EditarTarefas = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState('');
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setCarregando(true);
    axios
      .get(`http://localhost:5555/tarefas/${id}`)
      .then((response) => {
        setNome(response.data.nome); // Set 'nome' from response data
        setDescricao(response.data.descricao);
        setStatus(response.data.status); // Set 'status' from response data
        setCarregando(false);
      })
      .catch((error) => {
        console.log(error);
        alert('Um erro ocorreu. Por favor tente novamente mais tarde.');
        setCarregando(false);
      });
  }, [id]); // Added 'id' as a dependency to re-fetch data when 'id' changes

  const handleEditarTarefa = () => {
    const dados = {
      nome,
      descricao,
      status,
    };
    setCarregando(true);
    axios
      .put(`http://localhost:5555/tarefas/${id}`, dados)
      .then(() => {
        setCarregando(false);
        enqueueSnackbar('Tarefa editada com sucesso!', { variant: 'success' });
        navigate('/entrar/home');
      })
      .catch((error) => {
        setCarregando(false);
        //alert('Um erro ocorreu. Por favor tente novamente mais tarde.');
        enqueueSnackbar('Erro ao editar tarefa', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BotaoVoltar />
      <div className='flex flex-col items-center'>
        <h1 className='text-3xl my-4 flex items-center justify-center font-roboto font-bold text-sky-500'>
          <FaEdit className='mr-2' size={24} /> {/* Use the FaEdit icon for editing */}
          Editar Tarefa
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
            <button className='p-2 bg-sky-500 text-white text-xl m-8 hover:bg-sky-600' onClick={handleEditarTarefa}>
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarTarefas;