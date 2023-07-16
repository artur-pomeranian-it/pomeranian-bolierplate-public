import React from 'react';
import './styles.css';

export const ArrayRendering = () => {
  const tablica = ['Saab', 'Volvo', 'BMW', 'Skoda', 'Mercedes'];

  function mapowanie(element) {
    return <li key={element}>{element}</li>;
  }

  // tablica obiektów
  const carData = [
    { id: 1, make: 'Saab', model: '92B', year: 1953, owner: 'Jon' },
    { id: 2, make: 'Volvo', model: 'C40', year: 2021, owner: 'Jenny' },
    { id: 3, make: 'Audi', model: 'A3', year: 2019, owner: 'Michael' },
    { id: 4, make: 'Tesla', model: 'Model S', year: 2022, owner: 'Sarah' },
  ];

  function mapowanieTablicyObiektow(jedenObiekt) {
    return (
      <li key={jedenObiekt.id} value={jedenObiekt.id}>
        {jedenObiekt.make}
      </li>
    );
  }

  // {React.createElement('div', {}, ['hello'])}
  // {React.createElement('div', { className: 'moja-klasa' }, ['Z klasą'])}

  return (
    <div>
      <h1>Renderowanie w Reakcie z tablicy i obiektu </h1>
      <section>
        <h2>Renderowanie z tablicy</h2>
        <ul>{tablica.map(mapowanie)}</ul>
      </section>
      <section>
        <h2>Renderowanie z tablicy obiektów</h2>
        <ul>{carData.map(mapowanieTablicyObiektow)}</ul>
      </section>
    </div>
  );
};
