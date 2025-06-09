// src\components\CadastroPratos\index.js

import { useState } from "react";
import './styles.css'
import { useNavigate } from "react-router-dom";
import useMensagem from '../../hooks/useMensagem'
import MensagemFeedback from '../MensagemFeedback'
import logo from '../../assets/images/Coco_Bambu_Restaurante.png'
import axios from 'axios'

function CadastroPrato() {
    const [prato, setPrato] = useState('')
    const [descricao, setDescricao] = useState('')
    const [preco, setPreco] = useState('')
    const [categoria, setCategoria] = useState('')
    const [disponibilidade, setDisponibilidade] = useState('')
    const [urlImagem, setUrlImagem] = useState('')
    const navigate = useNavigate()
    const { exibirMensagem , mensagem, tipoMensagem, visivel, fecharMensagem } = useMensagem()

    const cadastrarPrato = async () => {
        try {
            const response = await axios.post('http://localhost:8080/cadastro', {prato, descricao, preco, categoria, disponibilidade, urlImagem})
            exibirMensagem(response.data.mensagem || 'Prato cadastrado com sucesso!', 'sucesso')
            setPrato('')
            setDescricao('')
            setPreco('')
            setCategoria('')
            setDisponibilidade('')
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
                    step="0.01"
                    required
                />
                <select
                    id="categoria"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    required
                >
                    <option value="" disabled>Selecione a categoria</option>
                    <option value="ENTRADA">Entrada</option>
                    <option value="PRATO_PRINCIPAL">Prato Principal</option>
                    <option value="SOBREMESA">Sobremesa</option>
                </select>
                <select
                    id="disponibilidade"
                    value={disponibilidade}
                    onChange={(e) => setDisponibilidade(e.target.value)}
                    required
                >
                    <option value="" disabled>Selecione a disponibilidade</option>
                    <option value="EM_ESTOQUE">Em estoque</option>
                    <option value="ESTOQUE">Esgotado</option>
                </select>
                <input 
                    type="text"
                    id="urlImagem"
                    placeholder="URL da Imagem"
                    value={urlImagem}
                    onChange={(e) => setUrlImagem(e.target.value)}
                />

            </form>

                <div className="links">

                    <button type="submit" className="cadastrar">Cadastrar</button>

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