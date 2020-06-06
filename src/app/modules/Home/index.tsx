import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import Header from '../../common/layout/Header';
import './styles.css';

const Home: React.FC = () => (
  <div id="page-home">
    <div className="content">
      <Header />

      <main>
        <h1> Seu marketplace de coleta de resíduos. </h1>
        <p> Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente. </p>
        <a href="/cadastro">
          <span>
            <FiLogIn />
          </span>
          <strong>Cadastre um ponto de coleta </strong>
        </a>
      </main>
    </div>
  </div>
);

export default Home;
