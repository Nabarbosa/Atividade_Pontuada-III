// src\components\CadastroPratos\index.js

import { useState } from "react";
import './styles.css'
import { useNavigate } from "react-router-dom";
import useMensagem from '../../hooks/useMensagem'
import MensagemFeedback from '../MensagemFeedback'
import logo from '../../assets/images/Coco_Bambu_Restaurante.png'
import foods from '../../assets/images/foods.jpg'
import axios from 'axios'

function CadastroPrato() {
    const [prato, setPrato] = useState('')
    const [descricao, setDescricao] = useState('')
    const [preco, setPreco] = useState('')
    const [texto_categoria, setTexto_categoria] = useState('')
    const [texto_disponibilidade, setTexto_disponibilidade] = useState('')
    const [urlImagem, setUrlImagem] = useState('')
    const navigate = useNavigate()
    const { exibirMensagem , mensagem, tipoMensagem, visivel, fecharMensagem } = useMensagem()

    const cadastrarPrato = async () => {
        try {
            const response = await axios.post('https://back-end-restaurante.onrender.com/cadastro', {prato, descricao, preco, texto_categoria, texto_disponibilidade, urlImagem})
            exibirMensagem(response.data.mensagem || 'Prato cadastrado com sucesso!', 'sucesso')
            setPrato('')
            setDescricao('')
            setPreco('')
            setTexto_categoria('')
            setTexto_disponibilidade('')
            setUrlImagem('')
        } catch (error) {
            let erroMsg = 'Erro ao conectar ao servidor.'
            if (error.response && error.response.data) {
                erroMsg = error.response.data.mensagem
                if (error.response.data.erros) {
                    erroMsg += ' ' + Object.values(error.response.data.erros).join(', ')
                }
            }
            exibirMensagem(erroMsg, 'erro')
        }
    }

    return (
        <div className="container-cadastro">
            <img src={foods} alt="foods" className="background" />
                <img src={logo} alt="Logo da empresa" className="logo-cadastro" />   
            <h2>Cadastro de Pratos</h2>
            <form onSubmit={(e) => {e.preventDefault(); cadastrarPrato()}}>
                <input 
                    type="text"
                    id="prato"
                    placeholder="Prato"
                    value={prato}
                    onChange={(e) => setPrato(e.target.value)}
                    required
                />
                <input 
                    type="text"
                    id="descricao"
                    placeholder="Descrição"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    required
                />
                <input 
                    type="number"
                    id="preco"
                    placeholder="Preço"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                    required
                />
                <select
                    id="texto_categoria"
                    value={texto_categoria}
                    onChange={(e) => setTexto_categoria(e.target.value)}
                    required
                >
                    <option value="" disabled>Selecione a categoria</option>
                    <option value="Entrada">Entrada</option>
                    <option value="Prato Principal">Prato Principal</option>
                    <option value="Sobremesa">Sobremesa</option>
                    <option value="Bebida">Bebida</option>
                </select>
                <select
                    id="texto_disponibilidade"
                    value={texto_disponibilidade}
                    onChange={(e) => setTexto_disponibilidade(e.target.value)}
                    required
                >
                    <option value="" disabled>Selecione a disponibilidade</option>
                    <option value="Em Estoque">Em estoque</option>
                    <option value="Esgotado">Esgotado</option>
                    </select>
                <input 
                    type="url"
                    id="urlImagem"
                    placeholder="URL da Imagem"
                    value={urlImagem}
                    onChange={(e) => setUrlImagem(e.target.value)}
                />
                <button type="submit" className="cadastrar">Cadastrar</button>
            </form>

                <div className="links">
                    <button onClick={() => navigate('/cardapio')} className="link-pratos">
                        Ver Cardápio
                    </button>

                    <button onClick={() => navigate('/')} className='link-pagina-inicial'>
                        Voltar
                    </button>

                </div>

            <MensagemFeedback
                mensagem={mensagem}
                tipo={tipoMensagem}
                visivel={visivel}
                onclose={fecharMensagem}
            />
        </div>
    )
}

export default CadastroPrato