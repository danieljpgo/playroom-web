import React, { useEffect, useState, ChangeEvent } from 'react';
import axios from 'axios';
import api from '../../../common/services/api';
import Fieldset from './Fieldset';
import Map from './Map';

interface Item {
  id: number,
  title: string,
  image_url: string,
}

interface IBGEState {
  sigla: string,
}

interface IBGECity {
  nome: string,
}

const Form: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectState, setSelectState] = useState<string>('default');
  const [selectCity, setSelectCity] = useState<string>('default');

  useEffect(() => {
    api.get('items').then((response) => setItems(response.data));
  }, []);

  useEffect(() => {
    axios.get<IBGEState[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
      .then((response) => setStates(response.data.map((ibgeStates) => ibgeStates.sigla)));
  }, []);

  useEffect(() => {
    if (selectState !== 'default') {
      axios.get<IBGECity[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectState}/municipios`)
        .then((response) => setCities(response.data.map((ibgeCities) => ibgeCities.nome)));
    }
  }, [selectState]);

  function handleSelectState(event: ChangeEvent<HTMLSelectElement>) {
    setSelectState(event.target.value);
  }

  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
    setSelectCity(event.target.value);
  }

  return (
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
              value={selectState}
              onChange={handleSelectState}
            >
              <option value="default">Selecione um UF</option>
              {
                states.map((state) => (
                  <option
                    key={state}
                    value={state}
                  >
                    {state}
                  </option>
                ))
              }
            </select>
          </div>
          <div className="field">
            <label htmlFor="city">Cidade</label>
            <select
              name="city"
              id="city"
              value={selectCity}
              onChange={handleSelectCity}
            >
              <option value="default">Selecione uma cidade</option>
              {
                cities.map((city) => (
                  <option
                    key={city}
                    value={city}
                  >
                    {city}
                  </option>
                ))
              }
            </select>
          </div>
        </div>
      </Fieldset>

      <Fieldset
        title="Ítens de coleta"
        subtitle="Selecione um ou mais itens abaixo"
      >
        <ul className="items-grid">
          {
            items.length === 0
              ? 'Loading...' // @TODO Criar um esqueleto de loading para essa busca
              : (
                items.map((item) => (
                  <li
                    className="selected"
                    key={item.title}
                  >
                    <img
                      src={item.image_url}
                      alt={item.title}
                    />
                    <span>{item.title}</span>
                  </li>
                )))
            }
        </ul>
      </Fieldset>

      <button type="submit">
        Cadastrar ponto de coleta
      </button>
    </form>
  );
};

export default Form;
