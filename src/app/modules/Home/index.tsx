import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import './styles.css';

const Home: React.FC = () => (
  <div id="page-home">
    <div className="content">
      <div className="page">
        <h1>
          Seu marketplace
          <br />
          de doação de brinquedos
        </h1>
        <p> Ajudamos pessoas a encontrarem pontos de doação de brinquedos. </p>
        <Link to="/cadastro">
          <span>
            <FiLogIn />
          </span>
          <strong>Cadastre um ponto de doação </strong>
        </Link>
      </div>
    </div>
  </div>
);

export default Home;
