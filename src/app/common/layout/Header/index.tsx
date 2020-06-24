import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiArrowLeft as Icon } from 'react-icons/fi';
import logo from '../../resources/assets/logo.svg';
import './styles.css';

const Header: React.FC = () => (
  <header>
    <div className="logo">
      <img src={logo} alt="Playroom" />
      <h2>Playroom</h2>
    </div>
    <NavLink
      to="/"
      isActive={(match, location) => location.pathname === '/cadastro'}
      activeClassName="show"
    >
      <Icon />
      <span>Voltar para home</span>
    </NavLink>
  </header>
);

export default Header;
