import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../componentes/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md'; // Apenas importe o ícone que está sendo usado
import TarefasTable from '../componentes/home/TarefasTable';
import TarefasCard from '../componentes/home/TarefasCard';
import BarraLateral from '../componentes/Barra-Lateral/Barra_Lateral'; // Corrija o nome do arquivo importado

const Home = () => {
  const [tarefas, setTarefas] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [showType, setShowType] = useState('tabela');

  useEffect(() => {
    setCarregando(true);
    axios
      .get(`http://localhost:5555/tarefas/`)
      .then((response) => {
        setTarefas(response.data.data);
        setCarregando(false);
      })
      .catch((error) => {
        console.log(error);
        setCarregando(false);
      });
  }, []);

  return (
    <div className='p-4'>
      <BarraLateral />
      {/* Restante do conteúdo da página */}
      <div className='content'>
        <div className='flex justify-center'>
          <button
            className='bg-sky-500 hover:bg-sky-400 text-white px-4 py-2 rounded-lg mr-2'
            onClick={() => setShowType('tabela')}
          >
            Tabela
          </button>
          <button
            className='bg-sky-500 hover:bg-sky-400 text-white px-4 py-2 rounded-lg'
            onClick={() => setShowType('carta')}
          >
            Card
          </button>
        </div>
        <div className='flex justify-between items-center'>
          <h1 className='text-3xl my-8 mx-auto text-center'>Lista de Tarefas</h1>
          <Link to='/tarefas/criar'>
            <MdOutlineAddBox className='text-green-500 text-4xl' />
          </Link>
        </div>
        {carregando ? (
          <Spinner />
        ) : showType === 'tabela' ? (
          <TarefasTable tarefas={tarefas} />
        ) : showType === 'carta' ? (
          <TarefasCard tarefas={tarefas} />
        ) : (
          <div>
            <p>Invalid showType value: {showType}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
