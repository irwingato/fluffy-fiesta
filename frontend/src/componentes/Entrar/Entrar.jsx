import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Entrar.module.css';
import axios from 'axios';

const Entrar = () => {

  const [dados, setDados] = useState({
    email: '',
    senha: '',
  });

  const [erro, setErro] = useState("");

  const handleMudar = ({ currentTarget: input }) => {
    setDados({ ...dados, [input.name]: input.value });
  };

  const handleEnviar = async (e) => {
    e.preventDefault();
    try {
      const url = 'http://localhost:5555/autenticar/';
      const { data: resultado } = await axios.post(url, dados);
      localStorage.setItem('token', resultado.token);
      window.location = "/entrar/home";

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
    <div className={styles.entrar_container}>
      <div className={styles.entrar}>
        <div className={styles.left}>
          <form onSubmit={handleEnviar} className={styles.form}>
            <h1>Entrar</h1>
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
              name='senha' // Changed to 'senha' from 'password'
              onChange={handleMudar}
              value={dados.senha}
              required
              className={styles.input}
            />
            {erro && <div className={styles.erro_msg}>{erro}</div>}
            <div className={styles.button_container}>
              <button type="submit" className={styles.entrar_btn}>
                Entrar
              </button>
              <Link to="/entrar/cadastrar">
                <button className={styles.novo_aqui_btn}>
                  Novo Aqui?
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Entrar;