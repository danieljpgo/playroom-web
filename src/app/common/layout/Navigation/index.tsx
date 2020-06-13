import React from 'react';
import Header from '../Header';
import './styles.css';

interface Props {
  children: JSX.Element,
}

const Navigation: React.FC<Props> = (props) => {
  const { children } = props;

  return (
    <div className="wrapper">
      <Header />
      <main>
        {children}
      </main>
    </div>
  );
};

export default Navigation;
