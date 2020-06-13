import React from 'react';
import Header from '../../common/layout/Header';
import Form from './Form';
import './styles.css';

const Points: React.FC = () => (
  <div id="page-create-point">
    {/* <Header back={{ to: '/', text: 'Voltar para home' }} /> */}
    <Form />
  </div>
);

export default Points;
