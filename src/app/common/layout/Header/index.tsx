import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import logo from '../../resources/assets/logo.svg';

interface Props {
  back?: {
    to: string,
    text: string
  },
}

const Header: React.FC<Props> = (props) => {
  const { back } = props;

  return (
    <header>
      <img src={logo} alt="Ecoleta" />
      {
        back && (
          <Link to={back.to}>
            <FiArrowLeft />
            {back.text}
          </Link>
        )
      }
    </header>
  );
};

export default Header;
