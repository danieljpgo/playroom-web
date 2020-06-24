import React, {
  useEffect, useState, ChangeEvent, FormEvent, useCallback,
} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { LeafletMouseEvent } from 'leaflet';
import api from '../../../common/services/api';
import Modal from '../../../common/components/Modal';
import Dropzone from '../../../common/components/Dropzone';
import Fieldset from './Fieldset';
import Item from './Item';
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
  const [form, setForm] = useState({ name: '', email: '', whatsapp: '' });
  const [items, setItems] = useState<Item[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectState, setSelectState] = useState<string>('default');
  const [selectCity, setSelectCity] = useState<string>('default');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [currentPosition, setCurrentPosition] = useState<[number, number]>([0, 0]);
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File>();

  const history = useHistory();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentPosition([latitude, longitude]);
    });
  }, []);

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

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  function handleSelectState(event: ChangeEvent<HTMLSelectElement>) {
    setSelectState(event.target.value);
  }

  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
    setSelectCity(event.target.value);
  }

  function handleMapSelection(event: LeafletMouseEvent) {
    setSelectedPosition([
      event.latlng.lat,
      event.latlng.lng,
    ]);
  }

  const handleSelectItem = useCallback((id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  }, [selectedItems]);

  const handleSelectFile = useCallback((file: File) => {
    setSelectedFile(file);
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const { name, email, whatsapp } = form;
    const state = selectState;
    const city = selectCity;
    const [latitude, longitude] = selectedPosition;
    const items = selectedItems;

    const data = new FormData();

    data.append('name', name);
    data.append('email', email);
    data.append('whatsapp', whatsapp);
    data.append('state', state);
    data.append('city', city);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('items', items.join(','));

    if (selectedFile) data.append('image', selectedFile);

    await api.post('points', data);
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
      history.push('/');
    }, 2000);
  }

  const itemsLoading = [1, 2, 3, 4, 5, 6].map((item) => (
    <Item
      key={item}
      id={item}
      onSelect={() => null}
      loading
    />
  ));

  return (
    <form onSubmit={handleSubmit}>
      <h1>
        Cadastro do
        <br />
        Ponto de Doação
      </h1>

      <Dropzone onFileUploaded={handleSelectFile} />

      <Fieldset title="Dados">
        <div className="field">
          <label htmlFor="name">Nome da entidade</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={handleInputChange}
          />
        </div>

        <div className="field-group">
          <div className="field">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={handleInputChange}
            />
          </div>
          <div className="field">
            <label htmlFor="whatsapp">Whatsapp</label>
            <input
              id="whatsapp"
              name="whatsapp"
              type="text"
              onChange={handleInputChange}
            />
          </div>
        </div>
      </Fieldset>

      <Fieldset
        title="Endereço"
        subtitle="Selecione o endereço no mapa"
      >
        <Map
          selectedPosition={selectedPosition}
          currentPosition={currentPosition}
          mapSelection={handleMapSelection}
        />
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
        title="Ítens para doação"
        subtitle="Selecione um ou mais itens abaixo"
      >
        <ul className="items-grid">
          {
            items.length === 0
              ? itemsLoading
              : (
                items.map((item) => (
                  <Item
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    selected={selectedItems.includes(item.id)}
                    imageUrl={item.image_url}
                    onSelect={handleSelectItem}
                  />
                )))
            }
        </ul>
      </Fieldset>

      <button type="submit">
        Cadastrar ponto de doação
      </button>

      <Modal show={showModal} />
    </form>
  );
};

export default Form;
