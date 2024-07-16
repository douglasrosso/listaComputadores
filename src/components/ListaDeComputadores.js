import React from 'react';

const ListaDeComputadores = ({ computadores, onEditar, onRemover }) => {
    return (
        <div className="lista-container">
            <h2>Lista de Computadores</h2>
            <ul>
                {computadores.map(computador => (
                    <li key={computador.id}>
                        <span>Hostname: {computador.hostname}</span>
                        <span>Processador: {computador.processador}</span>
                        <span>Memória: {computador.memoria}</span>
                        <span>Armazenamento: {computador.armazenamento}</span>
                        <span>Ativo: {computador.ativo ? 'Sim' : 'Não'}</span> {/* Exibindo 'Sim' ou 'Não' */}
                        <div>
                            <button onClick={() => onEditar(computador)}>Editar</button>
                            <button onClick={() => onRemover(computador.id)}>Excluir</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListaDeComputadores;
