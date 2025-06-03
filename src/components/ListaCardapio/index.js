// src\components\ListaCardapio\index.js

import { useState, useEffect } from "react";
import axios from "axios";
import './styles.css'

function ListaDePratos() {
    const [pratos, setPratos] = useState([])

    useEffect(() => {
        const carregarPratos = async () => {
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

    return (
        <ul id="listaPratos" className="lista-pratos">
            {pratos.length === 0 ? (
                <li>Nenhum prato encontrado.</li>
            ) : (
                pratos.map( prato => (
                    <li key={prato.id}>
                        <strong>Prato: </strong> {prato.prato}<br />
                        <strong>Descrição: </strong> {prato.descricao}<br />
                        <strong>Preço: </strong> {prato.preco}<br />           
                        <strong>Categoria: </strong> {prato.categoria}<br />           
                        <strong>Disponibilidade: </strong> {prato.disponibilidade} <br />           
                        <strong>Url da Imagem: </strong> {prato.urlImagem}           
                    </li>
                ))
            )}
        </ul>
    )
    
}

export default ListaDePratos