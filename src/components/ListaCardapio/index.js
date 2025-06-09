// src\components\ListaCardapio\index.js

import { useState, useEffect } from "react";
import axios from "axios";
import './styles.css'

export default function ListaDePratos() {
    const [pratos, setPratos] = useState([])
    const [categoria, setCategoria] = useState('')
    const [disponibilidade, setDisponibilidade] = useState('')

    useEffect(() => {
        async function carregarPratos () {
            try {
                const response = await axios.get('https://backend-sakura.onrender.com/cardapio')
                setPratos(response.data)
            } catch (error) {
                alert('Erro ao buscar cardápio: ', error)
                setPratos([])
            }
        }
        carregarPratos()
    }, [])

    const pratosFiltrados = pratos.filter(prato => {
        const categoriaMatch = categoria ? prato.categoria === categoria : true;
        const disponibilidadeMatch = disponibilidade
            ? disponibilidade === 'Em Estoque'
                ? prato.disponivel === true
                : prato.disponivel === false
            : true;
        return categoriaMatch && disponibilidadeMatch;
    });

    return (
        <div>
            {}
            <label htmlFor="categoria">Filtrar por categoria: </label>
            <select
                id="categoria"
                value={categoria}
                onChange={e => setCategoria(e.target.value)}
            >
                <option value="">Todas</option>
                <option value="Entrada">Entrada</option>
                <option value="Principal">Principal</option>
                <option value="Sobremesa">Sobremesa</option>
            </select>

            {}
            <label htmlFor="disponibilidade">Filtrar por disponibilidade: </label>
            <select
                id="disponibilidade"
                value={disponibilidade}
                onChange={e => setDisponibilidade(e.target.value)}
            >
                <option value="">Todas</option>
                <option value="Em Estoque">Em Estoque</option>
                <option value="Esgotado">Esgotado</option>
            </select>

            {}
            <ul id="listaPratos" className="lista-pratos">
                {pratosFiltrados.length === 0 ? (
                    <li>Nenhum prato encontrado.</li>
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
