import React from 'react';
import { useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import CriarTarefas from './paginas/CriarTarefas';
import MostrarTarefas from './paginas/MostrarTarefas';
import EditarTarefas from './paginas/EditarTarefas';
import ApagarTarefas from './paginas/ApagarTarefas';
import Cadastrar from './componentes/Cadastrar/Cadastrar'; // Import the Cadastrar component
import Entrar from './componentes/Entrar/Entrar';
import Admin from './componentes/Entrar/Admin';
import Relatorio from './componentes/Entrar/Relatorio';

const App = () => {
  const navigate = useNavigate(); 

  useEffect(() => {
    if (!window.location.pathname.includes('/entrar')) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path='/' element={<Entrar />} />
      <Route path='/tarefas/criar' element={<CriarTarefas />} />
      <Route path='/tarefas/detalhes/:id' element={<MostrarTarefas />} />
      <Route path='/tarefas/editar/:id' element={<EditarTarefas />} />
      <Route path='/tarefas/apagar/:id' element={<ApagarTarefas />} />
      <Route path='/entrar/cadastrar' element={<Cadastrar />} /> {/* Add the Cadastrar page route */}
      <Route path='/entrar/home' element={<Home />} />
      <Route path='/entrar/home/admin' element={<Admin />} />
      <Route path='/entrar/home/relatorio' element={<Relatorio />} />
    </Routes>
  );
};

export default App;