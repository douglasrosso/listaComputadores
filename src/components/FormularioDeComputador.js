import React, { useState, useEffect } from 'react';

const FormularioDeComputador = ({ onSubmit, computador, cancelarEdicao }) => {
    const [hostname, setHostname] = useState('');
    const [processador, setProcessador] = useState('');
    const [memoria, setMemoria] = useState('');
    const [armazenamento, setArmazenamento] = useState('');
    const [ativo, setAtivo] = useState(true);

    useEffect(() => {
        if (computador) {
            setHostname(computador.hostname);
            setProcessador(computador.processador);
            setMemoria(computador.memoria);
            setArmazenamento(computador.armazenamento);
            setAtivo(computador.ativo);
        }
    }, [computador]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!hostname || !processador || !memoria || !armazenamento) {
            alert('Por favor, preencha todos os campos');
            return;
        }
        const novoComputador = {
            hostname,
            processador,
            memoria,
            armazenamento,
            ativo
        };

        if (computador) {
            novoComputador.id = computador.id; // Passa o ID para edição
        }

        onSubmit(novoComputador);
        setHostname('');
        setProcessador('');
        setMemoria('');
        setArmazenamento('');
        setAtivo(true);
    };

    return (
        <div className="formulario-container">
            <h2>{computador ? 'Editar Computador' : 'Adicionar Computador'}</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Hostname" value={hostname} onChange={(e) => setHostname(e.target.value)} />
                <input type="text" placeholder="Processador" value={processador} onChange={(e) => setProcessador(e.target.value)} />
                <input type="text" placeholder="Memória" value={memoria} onChange={(e) => setMemoria(e.target.value)} />
                <input type="text" placeholder="Armazenamento" value={armazenamento} onChange={(e) => setArmazenamento(e.target.value)} />
                <label>
                    <input type="checkbox" checked={ativo} onChange={(e) => setAtivo(e.target.checked)} />
                    Ativo
                </label>
                <div>
                    <button type="submit">{computador ? 'Salvar' : 'Adicionar'}</button>
                    {computador && <button type="button" onClick={cancelarEdicao}>Cancelar</button>}
                </div>
            </form>
        </div>
    );
};

export default FormularioDeComputador;
