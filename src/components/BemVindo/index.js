// src\components\BemVindo\index.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import logo from '../../assets/images/Coco_Bambu_Restaurante.png';

function PaginaInicial() {
  const navigate = useNavigate();

  const handleCadastroClick = () => {
    navigate('/cadastro');
  };

  return (
    <div>
      <div className="container">
        <img src={logo} alt="Logo" />
        <h1>Seja Bem-Vindo(a) ao Coco Bambu!</h1>
        <button type="button" onClick={handleCadastroClick} className='btn-cadastro'>
          Página de Cadastro
        </button>
      </div>
    </div>
  );
}

export default PaginaInicial;