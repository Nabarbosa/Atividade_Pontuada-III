// src\components\BemVindo\index.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import logo from '../../assets/images/Coco_Bambu_Restaurante.png';
import circle from '../../assets/images/Ellipse 1.png';

function PaginaInicial() {
  const navigate = useNavigate();

  const handleCadastroClick = () => {
    navigate('/cadastro');
  };

  return (
      <div>
          <div className="container">
            <img src={circle} alt='circle' className='circle'/>
            <img src={logo} alt="logo" className='logo'/>
            <div class="slogan">
              O MELHOR LUGAR <br/> PARA SE DELICIAR!!
            </div>
            <button type="button" onClick={handleCadastroClick} className='btn-cadastro'>
              Cadastrar Prato
            </button>
            
            
        </div>
      </div>
  );
}

export default PaginaInicial;