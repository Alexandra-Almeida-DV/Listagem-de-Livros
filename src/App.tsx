import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LivroLista from './LivroLista';
import LivroDados from './LivroDados';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return (
        <BrowserRouter>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Catálogo</Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/dados">Novo</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Routes>
                <Route path="/" element={<LivroLista />} />
                <Route path="/dados" element={<LivroDados />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
