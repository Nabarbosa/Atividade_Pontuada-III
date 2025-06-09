// src\components\ListaCardapio\index.js

import { useState, useEffect } from "react";
import axios from "axios";
import './styles.css'

function ListaDePratos() {
    const [pratos, setPratos] = useState([])
    const [texto_categoria, setTexto_categoria] = useState('')
    const [texto_disponibilidade, setTexto_disponibilidade] = useState('')

    useEffect(() => {
        async function carregarPratos () {
            try {
                const response = await axios.get('https://back-end-restaurante.onrender.com/cardapio')
                setPratos(response.data)
            } catch (error) {
                alert('Erro ao buscar cardápio: ', error)
                setPratos([])
            }
        }
        carregarPratos()
    }, [])

    const pratosFiltrados = pratos.filter(prato => {
        const categoriaMatch = texto_categoria ? prato.texto_categoria === texto_categoria : true;
        const disponibilidadeMatch = texto_disponibilidade
            ? texto_disponibilidade === 'Em Estoque'
                ? prato.disponivel === true
                : prato.disponivel === false
            : true;
        return categoriaMatch && disponibilidadeMatch;
    });

    return (
        <div>
            {}
            <div className="categoria">
                <label htmlFor="texto_categoria" className="filtrar-categoria">Categoria: </label>
                <select
                    id="texto_categoria"
                    value={texto_categoria}
                    onChange={e => setTexto_categoria(e.target.value)}
                >
                    <option value="">Todas</option>
                    <option value="Entrada">Entrada</option>
                    <option value="Principal">Principal</option>
                    <option value="Sobremesa">Sobremesa</option>
                </select>   
            </div>

            {}
            <div className="disponibilidade">
                <label htmlFor="texto_disponibilidade" className="filtrar-disp">Disponibilidade: </label>
                <select
                    id="texto_disponibilidade"
                    value={texto_disponibilidade}
                    onChange={e => setTexto_disponibilidade(e.target.value)}
                >
                    <option value="">Todas</option>
                    <option value="Em Estoque">Em Estoque</option>
                    <option value="Esgotado">Esgotado</option>
                </select>
            </div>

            {}
            <ul id="listaPratos" className="lista-pratos">
                {pratosFiltrados.length === 0 ? (
                    <div className="container-prato">
                        <li className="nenhum-prato">Nenhum prato encontrado.</li>
                    </div>
                ) : (
                    pratosFiltrados.map( prato => (
                        <li key={prato.id}>
                            <strong>Prato: </strong> {prato.prato}<br />
                            <img 
                                src={prato.urlImagem} 
                                alt={`Imagem do prato ${prato.prato}`} 
                                style={{width: '150px', height: 'auto'}}
                            />
                            <strong>Preço: </strong> {prato.preco}<br />   
                            <strong>Disponibilidade: </strong> {prato.disponivel ? 'Em Estoque' : 'Esgotado'}<br />                                   
                        </li>
                    ))
                )}
            </ul>
        </div>
    )
    
}

export default ListaDePratos
