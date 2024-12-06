import React, {useState} from 'react';

const CargoTable = ({ cargoList, updateCargoStatus }) => {
  const [filterCargo, setFilterCargo] = useState('');

  const getStatusColor = (status) => {
    switch (status) {
      case 'Ожидает отправки':
        return 'bg-warning';
      case 'В пути':
        return 'bg-primary';
      case 'Доставлен':
        return 'bg-success';
      default:
        return '';
    }
  };

  const filterStatus = (status)=>{
    if(status.length>1){
        const newCargo = cargoList.filter((e)=>e.status===status);
        return newCargo
    }else{return cargoList}
  }


  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Номер груза</th>
          <th>Название груза</th>
          <th>
          <select
                onChange={(e) => setFilterCargo(e.target.value)}
              >
                <option value="">Показать все</option>
                <option value="Ожидает отправки">Ожидает отправки</option>
                <option value="В пути">В пути</option>
                <option value="Доставлен">Доставлен</option>
              </select>
              Статус
          </th>
          <th>Пункт отправления</th>
          <th>Пункт назначения</th>
          <th>Дата отправления</th>
        </tr>
      </thead>
      <tbody>
        {filterStatus(filterCargo).map(cargo => (
          <tr key={cargo.id}>
            <td>{cargo.id}</td>
            <td>{cargo.name}</td>
            <td>
              <select
                value={cargo.status}
                onChange={(e) => {updateCargoStatus(cargo.id, e.target.value, cargo);}}
                className={`form-control ${getStatusColor(cargo.status)}`}
              >
                <option value="Ожидает отправки">Ожидает отправки</option>
                <option value="В пути">В пути</option>
                <option value="Доставлен">Доставлен</option>
              </select>
            </td>
            <td>{cargo.origin}</td>
            <td>{cargo.destination}</td>
            <td>{cargo.departureDate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CargoTable;
