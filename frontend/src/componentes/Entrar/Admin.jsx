import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Admin.css';

const Admin = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [novoUsuario, setNovoUsuario] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    senha: '',
  });
  const [edicaoUsuario, setEdicaoUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  const carregarUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:5555/usuario');
      setUsuarios(response.data);
      setCarregando(false);
    } catch (error) {
      console.error(error);
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const handleCriarUsuario = async () => {
    try {
      const response = await axios.post('http://localhost:5555/usuario', novoUsuario);

      setNovoUsuario({
        nome: '',
        sobrenome: '',
        email: '',
        senha: '',
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSalvarEdicao = async (nome, sobrenome, email, senha) => {
    if (!edicaoUsuario) {
      return;
    }

    try {
      const url = `http://localhost:5555/usuario/${edicaoUsuario._id}`;
      nome = edicaoUsuario.nome;
      sobrenome = edicaoUsuario.sobrenome;
      email = edicaoUsuario.email;
      senha = edicaoUsuario.senha;
      let dados = {
        nome,
        sobrenome,
        email,
        senha
      };

      const response = await axios.put(url, dados);
      const usuariosAtualizados = usuarios.map((usuario) =>
        usuario._id === edicaoUsuario._id ? response.data : usuario
      );
      setUsuarios(usuariosAtualizados);
      setEdicaoUsuario(null);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setErro(error.response.data.message);
      }
    }
  };

  const handleApagarUsuario = async (usuario) => {
    try {
      await axios.delete(`http://localhost:5555/usuario/${usuario._id}`);
      carregarUsuarios();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Lista de Usuários</h1>
      {carregando ? (
        <p>Carregando...</p>
      ) : (
        <ul>
          {usuarios.length === 0 ? (
            <p>Nenhum usuário encontrado.</p>
          ) : (
            usuarios.map((usuario) => (
              <li key={usuario._id} className="user-item">
                <div className="user-info">
                  <label>Nome:</label>
                  {edicaoUsuario && edicaoUsuario._id === usuario._id ? (
                    <input
                      type="text"
                      value={edicaoUsuario?.nome || ''}
                      onChange={(event) =>
                        setEdicaoUsuario({ ...edicaoUsuario, nome: event.target.value })
                      }
                    />
                  ) : (
                    <span>{usuario.nome}</span>
                  )}
                </div>
                <div className="user-info">
                  <label>Sobrenome:</label>
                  {edicaoUsuario && edicaoUsuario._id === usuario._id ? (
                    <input
                      type="text"
                      value={edicaoUsuario?.sobrenome || ''}
                      onChange={(event) =>
                        setEdicaoUsuario({ ...edicaoUsuario, sobrenome: event.target.value })}
                    />
                  ) : (
                    <span>{usuario.sobrenome}</span>
                  )}
                </div>
                <div className="user-info">
                  <label>Email:</label>
                  {edicaoUsuario && edicaoUsuario._id === usuario._id ? (
                    <input
                      type="email"
                      value={edicaoUsuario?.email || ''}
                      onChange={(event) =>
                        setEdicaoUsuario({ ...edicaoUsuario, email: event.target.value })}
                    />
                  ) : (
                    <span>{usuario.email}</span>
                  )}
                </div>
                <div className="user-info">
                  <label>Senha:</label>
                  {edicaoUsuario && edicaoUsuario._id === usuario._id ? (
                    <input
                      type="password"
                      value={edicaoUsuario?.senha || ''}
                      onChange={(event) =>
                        setEdicaoUsuario({ ...edicaoUsuario, senha: event.target.value })}
                    />
                  ) : (
                    <span>********</span>
                  )}
                </div>
                {edicaoUsuario && edicaoUsuario._id === usuario._id ? (
                  <div className="user-actions">
                    <button onClick={handleSalvarEdicao}>Salvar</button>
                    <button onClick={() => setEdicaoUsuario(null)}>Cancelar</button>
                  </div>
                ) : (
                  <div className="user-actions">
                    <button onClick={() => setEdicaoUsuario(usuario)}>Editar</button>
                    <button onClick={() => handleApagarUsuario(usuario)}>Apagar</button>
                  </div>
                )}
              </li>

            ))
          )}
        </ul>
      )}

      <h2>Novo Usuário</h2>
      <div className="novo-usuario">
        <div>
          <label>Nome:</label>
          <input
            type="text"
            placeholder="Nome"
            value={novoUsuario.nome}
            onChange={(event) => setNovoUsuario({ ...novoUsuario, nome: event.target.value })}
          />
        </div>
        <div>
          <label>Sobrenome:</label>
          <input
            type="text"
            placeholder="Sobrenome"
            value={novoUsuario.sobrenome}
            onChange={(event) => setNovoUsuario({ ...novoUsuario, sobrenome: event.target.value })}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            placeholder="Email"
            value={novoUsuario.email}
            onChange={(event) => setNovoUsuario({ ...novoUsuario, email: event.target.value })}
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            placeholder="Senha"
            value={novoUsuario.senha}
            onChange={(event) => setNovoUsuario({ ...novoUsuario, senha: event.target.value })}
          />
        </div>
        <button className="criar-button" onClick={handleCriarUsuario}>Criar</button>
      </div>
    </div>
  );
};

export default Admin;