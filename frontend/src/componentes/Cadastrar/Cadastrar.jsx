import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Cadastrar.module.css';
import axios from 'axios';

const Cadastrar = () => {
  const [dados, setDados] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    senha: '',
  });

  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleMudar = ({ currentTarget: input }) => {
    setDados({ ...dados, [input.name]: input.value });
  };

  const handleEnviar = async (e) => {
    e.preventDefault();
    try {
      const url = 'http://localhost:5555/usuario';
      const { data: resultado } = await axios.post(url, dados);
      navigate("/");
    } catch (erro) {
      if (
        erro.response && erro.response.status >= 400 &&
        erro.response.status <= 500

      ) {
        setErro(erro.response.data.message);
      }
    }
  }
  return (
    <div className={styles.cadastrar_container} >
      <div className={styles.cadastrar_form_container}>
        <div className={styles.left}>
          <h1>Bem vindo</h1>
          <Link to="/">
            <button type="button" className={styles.white_btn}>
              Entrar
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleEnviar} >
            <h1>Criar conta</h1>
            <input
              type="text"
              placeholder="Nome"
              name='nome'
              onChange={handleMudar}
              value={dados.nome}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Sobrenome"
              name='sobrenome'
              onChange={handleMudar}
              value={dados.sobrenome}
              required
              className={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              name='email'
              onChange={handleMudar}
              value={dados.email}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Senha"
              name='senha'
              onChange={handleMudar}
              value={dados.senha}
              required
              className={styles.input}
            />
            {erro && <div className={styles.erro_msg}>{erro}</div>}
            <button type="submit" className={styles.green_btn}>
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Cadastrar;