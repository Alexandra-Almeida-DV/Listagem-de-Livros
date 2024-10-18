import React, { useEffect, useState } from 'react';
import ControleLivro from './controle/ControleLivros';
import ControleEditora from './controle/ControleEditora'; 

const controleLivro = new ControleLivro();
const controleEditora = new ControleEditora();

const LinhaLivro = (props) => {
    const { livro, excluir } = props;

    const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);

    return (
        <tr>
          <td>{livro.titulo}
          <div>
          <button className="btn btn-danger btn-sm" onClick={() => excluir(livro.codigo)}>Excluir</button>
          </div>
        </td>



            <td>{livro.resumo}</td>

            <td>{nomeEditora}</td>

            <td>
                <ul>
                    {livro.autores.map((autor, index) => (
                        <li key={index}>{autor}</li>
                    ))}
                </ul>
            </td>
        </tr>
    );
};

const LivroLista = () => {
    const [livros, setLivros] = useState([]);
    const [carregado, setCarregado] = useState(false);

    useEffect(() => {
        if (!carregado) {
            setLivros(controleLivro.obterLivros());
            setCarregado(true);
        }
    }, [carregado]);

    const excluir = (codigo) => {
        controleLivro.excluir(codigo);
        setCarregado(false);
    };

    return (
        <main className="text-center">
        <h1>Catálogo de Livros</h1>
        <div className="table-responsive">
          <table className="table table-striped table-bordered w-75 mx-auto">
            <thead>
              <tr>
                <th>Título</th>
                <th>Resumo</th>
                <th>Editora</th>
                <th>Autores</th>
              </tr>
            </thead>
            <tbody>
              {livros.map((livro) => (
                <LinhaLivro
                  key={livro.codigo}
                  livro={livro}
                  excluir={excluir}
                />
              ))}
            </tbody>
          </table>
        </div>
      </main>
 );
};

export default LivroLista;
