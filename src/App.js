import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; 
import ListaDeComputadores from './components/ListaDeComputadores';
import FormularioDeComputador from './components/FormularioDeComputador';

const App = () => {
    const [computadores, setComputadores] = useState([]);
    const [editando, setEditando] = useState(false);
    const [computadorAtual, setComputadorAtual] = useState(null);

    useEffect(() => {
        carregarComputadores();
    }, []);

    const carregarComputadores = async () => {
        try {
            const response = await axios.get('http://localhost:3001/computadores');
            setComputadores(response.data);
        } catch (error) {
            console.error('Erro ao carregar os computadores:', error);
        }
    };

    const adicionarComputador = async (novoComputador) => {
        try {
            const response = await axios.post('http://localhost:3001/computadores', novoComputador);
            setComputadores([...computadores, response.data]);
        } catch (error) {
            console.error('Erro ao adicionar o computador:', error);
        }
    };

    const editarComputador = (computador) => {
        setEditando(true);
        setComputadorAtual(computador);
    };

    const atualizarComputador = async (computadorAtualizado) => {
        try {
            const response = await axios.put(`http://localhost:3001/computadores/${computadorAtualizado.id}`, computadorAtualizado);
            const index = computadores.findIndex(c => c.id === computadorAtualizado.id);
            const novosComputadores = [...computadores];
            novosComputadores[index] = response.data;
            setComputadores(novosComputadores);
            setEditando(false);
            setComputadorAtual(null);
        } catch (error) {
            console.error('Erro ao atualizar o computador:', error);
        }
    };

    const removerComputador = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/computadores/${id}`);
            setComputadores(computadores.filter(computador => computador.id !== id));
        } catch (error) {
            console.error('Erro ao remover o computador:', error);
        }
    };

    const cancelarEdicao = () => {
        setEditando(false);
        setComputadorAtual(null);
    };

    return (
        <div className="app-container">
            <h1>Gerenciador de Computadores</h1>
            <FormularioDeComputador
                onSubmit={editando ? atualizarComputador : adicionarComputador}
                computador={computadorAtual}
                cancelarEdicao={cancelarEdicao} />
            <ListaDeComputadores
                computadores={computadores}
                onEditar={editarComputador}
                onRemover={removerComputador} />
        </div>
    );
};

export default App;
