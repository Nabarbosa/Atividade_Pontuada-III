// src\pages\Lista\index.js

import ListaDePratos from '../../components/ListaCardapio'
import { useNavigate } from 'react-router-dom'
import './styles.css'

function PaginaLista() {
    const navigate = useNavigate()
    
return (
        <div className='pagina-lista-pratos'>
            <div className='container-lista'>
                <h2>Lista de Pratos</h2>
                <ListaDePratos />
                <button onClick={() => navigate('/cadastro')} className='lista-link-voltar'>
                    Cadastrar Pratos
                </button>
                <button onClick={() => navigate('/')} className='lista-link-pagina-inicial'>
                    Página Inicial
                </button>
            </div>
        </div>
    )
}

export default PaginaLista