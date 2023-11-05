import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import "./Barra_Lateral_style.css";

const BarraLateral = () => {
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto((verdadeiro) => !verdadeiro);
  };

  return (
    <div style={{ position: "absolute" }}>
      <button
        className={`hamburger ${menuAberto ? "aberto" : ""}`}
        onClick={toggleMenu}
      >
        {menuAberto ? <FiX size={24}/> : <FiMenu size={24} />}
      </button>
      <div className={`sidebar ${menuAberto ? "aberto" : ""}`}>
        <button onClick={toggleMenu}>
          {menuAberto ? <FiX size={24}/> : <FiMenu size={24} />}
        </button>
        
        <div className="funcoes">        
          <Link to="/entrar/home">Tarefas</Link>
          <Link to="/entrar/home/admin">Admin</Link>
          <Link to="/entrar/home/relatorio">Relatório de desempenho</Link>         
        </div>
        
      </div>
    </div>
  );
};

export default BarraLateral;