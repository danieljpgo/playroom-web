import React, { Fragment, Children } from 'react';
import Header from '../Header';

const Navigation: React.FC = (props) => {
  const { children } = props;

  return (
    <Fragment>
      <Header />
      <main>
        {children}
      </main>
    </Fragment>
  );
};

export default Navigation;
