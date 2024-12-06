import React, { useState } from 'react';

const AddCargoForm = ({ addCargo, removeCargo }) => {
  const [cargo, setCargo] = useState({
    name: '',
    origin: '',
    destination: '',
    departureDate: '',
    status: 'Ожидает отправки'
  });
  const [error, setError] = useState(''); 

  const cities = ['Москва', 'Санкт-Петербург', 'Казань', 'Екатеринбург', 'Краснодар'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCargo({ ...cargo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!cargo.name.trim()) {
      setError('Название груза не должно быть пустым');
      return;
    }
    setError(''); 
    const newCargo = { id: `CARGO${Date.now()}`,...cargo,  }; 
    addCargo(newCargo);
    setCargo({
      name: '',
      origin: '',
      destination: '',
      departureDate: '',
      status: 'Ожидает отправки'
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="form-group">
        <label>Название груза</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={cargo.name}
          onChange={handleChange}
          required
        />
        {error && <div className="text-danger">{error}</div>}
      </div>
      <div className="form-group">
        <label>Пункт отправления</label>
        <select
          name="origin"
          className="form-control"
          value={cargo.origin}
          onChange={handleChange}
          required
        >
          <option value="">Выберите город</option>
          {cities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Пункт назначения</label>
        <select
          name="destination"
          className="form-control"
          value={cargo.destination}
          onChange={handleChange}
          required
        >
          <option value="">Выберите город</option>
          {cities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Дата отправления</label>
        <input
          type="date"
          className="form-control"
          name="departureDate"
          value={cargo.departureDate}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Добавить груз</button>
      <button type='button' onClick={removeCargo} className="btn btn-primary m-2">Удалить доставленные</button>
    </form>
  );
};

export default AddCargoForm;