import React from 'react';
import Fieldset from './Fieldset';
import Map from './Map';

const Form: React.FC = () => (
  <form>
    <h1>
      Cadastro do
      <br />
      Ponto de Coleta
    </h1>

    <Fieldset title="Dados">
      <div className="field">
        <label htmlFor="name">Nome da entidade</label>
        <input
          type="text"
          name="name"
          id="name"
        />
      </div>

      <div className="field-group">
        <div className="field">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            name="email"
            id="email"
          />
        </div>
        <div className="field">
          <label htmlFor="whatsapp">Whatsapp</label>
          <input
            type="text"
            name="whatsapp"
            id="whatsapp"
          />
        </div>
      </div>
    </Fieldset>

    <Fieldset
      title="Endereço"
      subtitle="Selecione o endereço no mapa"
    >
      {/* @TODO Remover o codigo marretado abaixo */}
      <Map position={[-19.9232945, -43.9462827]} />
      <div className="field-group">
        <div className="field">
          <label htmlFor="uf">Estado (UF)</label>
          <select
            name="uf"
            id="uf"
          >
            <option value="0">Selecione um UF</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="city">Cidade</label>
          <select
            name="city"
            id="city"
          >
            <option value="0">Selecione uma cidade</option>
          </select>
        </div>
      </div>
    </Fieldset>

    <Fieldset
      title="Ítens de coleta"
      subtitle="Selecione um ou mais itens abaixo"
    >
      <ul className="items-grid">
        <li className="selected">
          <img src="http://localhost:3333/uploads/oleo.svg" alt="Teste" />
          <span>Óleo de Cozinha</span>
        </li>
        <li>
          <img src="http://localhost:3333/uploads/oleo.svg" alt="Teste" />
          <span>Óleo de Cozinha</span>
        </li>
      </ul>
    </Fieldset>

    <button type="submit">
      Cadastrar ponto de coleta
    </button>
  </form>
);

export default Form;
