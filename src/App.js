import React, { useState } from 'react';
import CargoTable from './components/CargoTable';
import AddCargoForm from './components/AddCargoForm';
import 'bootstrap/dist/css/bootstrap.min.css';
const App = () => {
  const [cargoList, setCargoList] = useState([
    {
      id: "CARGO001",
      name: "Строительные материалы",
      status: "В пути",
      origin: "Москва",
      destination: "Казань",
      departureDate: "2024-12-24"
    },
    {
      id: "CARGO002",
      name: "Хрупкий груз",
      status: "Ожидает отправки",
      origin: "Санкт-Петербург",
      destination: "Екатеринбург",
      departureDate: "2024-12-01"
    }
  ]);

  const addCargo = (newCargo) => {
    setCargoList([...cargoList, newCargo]);
  };

  const updateCargoStatus = (id, newStatus, el) => {
    const updatedCargoList = cargoList.map(cargo =>
      cargo.id === id ? { ...cargo, status: newStatus } : cargo
    );
    if(newStatus === 'Доставлен'){
      const NowDate = Date.now();
      let dateCargo = Date.parse(new Date(el.departureDate.split('-').join(',')));
      if(dateCargo>NowDate){
        alert('груз не может быть доставлен')
        return;
      }
    }
    setCargoList(updatedCargoList);
  };


  const removeCargo = ()=>{
    const newCargoList = cargoList.filter(e => e.status!=='Доставлен');
    setCargoList(newCargoList)
  }
  return (
    <div className="container">
      <h1 className="my-4">Отслеживание грузов</h1>
      <AddCargoForm 
      addCargo={addCargo} 
      removeCargo={removeCargo}
      />
      <CargoTable cargoList={cargoList} 
          updateCargoStatus={updateCargoStatus}
      />
    </div>
  );
}

export default App;