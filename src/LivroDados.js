import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ControleLivros from './controle/ControleLivros';
import ControleEditora from './controle/ControleEditora';

const LivroDados = () => {
    const controleLivro = new ControleLivros();
    const controleEditora = new ControleEditora();

    const [opcoes, setOpcoes] = useState([]);
    useEffect(() => {
        const editoras = controleEditora.getEditoras().map(editora => ({
            value: editora.codEditora,
            text: editora.nome
        }));
        setOpcoes(editoras);
    }, [controleEditora]);

    const [titulo, setTitulo] = useState('');
    const [resumo, setResumo] = useState('');
    const [autores, setAutores] = useState('');
    const [codEditora, setCodEditora] = useState(opcoes.length > 0 ? opcoes[0].value : 0);

    const navigate = useNavigate();

    const tratarCombo = (event) => {
        setCodEditora(Number(event.target.value));
    };

    const incluir = (event) => {
        event.preventDefault();
        const livro = {
            codigo: 0, 
            codEditora,
            titulo,
            resumo,
            autores: autores.split('\n') 
        };
        controleLivro.incluir(livro);
        navigate('/'); 
    };

    return (
        <main className="d-flex justify-content-center align-items-center vh-100">
            <div className="w-50 mx-auto">
            <h1  className="text-center">Dados Livro</h1>
            <form onSubmit={incluir}>
                <div className="mb-3">
                    <label htmlFor="titulo" className="form-label">Título</label>
                    <input
                        type="text"
                        id="titulo"
                        className="form-control"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="resumo" className="form-label">Resumo</label>
                    <textarea
                        id="resumo"
                        className="form-control"
                        value={resumo}
                        onChange={(e) => setResumo(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="autores" className="form-label">Autores (um por linha)</label>
                    <textarea
                        id="autores"
                        className="form-control"
                        value={autores}
                        onChange={(e) => setAutores(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="editoras" className="form-label">Editora</label>
                    <select
                        id="editoras"
                        className="form-select"
                        value={codEditora}
                        onChange={tratarCombo}
                    >
                        {opcoes.map(opcao => (
                            <option key={opcao.value} value={opcao.value}>
                                {opcao.text}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Incluir Livro</button>
            </form>
            </div>
        </main>
    );
};

export default LivroDados;
