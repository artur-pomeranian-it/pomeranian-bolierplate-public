import { LocalStorage } from './LocalStorage';
import { SessionStorage } from './SessionStorage';
import { CookieStorage } from './CookieStorage';
import './styles.css';

export const JsonXMLStorage = () => {
  // Parsowanie (desrializacja)
  // zamiana z tekst na obiekt JS
  const jsonString = `{ "name": "John", "surname": "Doe", "age": 30, "cars": [ "Ford", "BMW", "Fiat" ], "isAdult": true }`;
  const parsedJson = JSON.parse(jsonString);
  // Serializacja
  // zamiana obiektu JS na tekst w formacie JSON
  const obiektDoSerializacji = {
    name: 'John',
    age: 100,
    cars: [],
  };
  // przykłady inne
  const emptyValue = null;
  console.log('emptyValue po serializacji: ', JSON.stringify(emptyValue));
  console.log(
    'emptyValue po De-Serializacji: ',
    JSON.parse(JSON.stringify(emptyValue))
  );
  const undefinedValue = undefined;
  console.log(
    'undefinedValue po serializacji: ',
    JSON.stringify(undefinedValue)
  );
  // nie da się undefined deserializować
  // console.log(
  //   'undefinedValue po DE-serializacji: ',
  //   JSON.parse(JSON.stringify(undefinedValue))
  // );

  // const currencies = {
  //   lastUpdate: '2004',
  //   currencies: [
  //     {
  //       name: 'dollar',
  //       unit: 1,
  //       country: 'USA',
  //     },
  //     {
  //       name: 'eur',
  //       unit: 1,
  //       country: 'European Monetary Union',
  //     },
  //   ],
  // };

  const poSerializacji = JSON.stringify(obiektDoSerializacji);
  return (
    <div>
      <LocalStorage />
      <SessionStorage />
      <CookieStorage />
      <h1>JsonXMLStorage</h1>
      <h2>JSON kim jest JSON?</h2>
      <p>JavaScript Object Notation</p>
      <p>lekki format wymiany danych</p>
      <p>wykorzystywany może być przez różne języki programowania</p>
      <p>The JSON Format Evaluates to JavaScript Objects</p>
      <p>
        Internet Media Type = application/json (formerly known as a MIME type)
      </p>
      <p>rozszerzenie pliku .json</p>
      <h2>Parsowanie</h2>
      <p>{jsonString}</p>
      <p>parsowanie - deserializacja przykład {parsedJson.name}</p>
      <p>stringify - serializacja przykład: {poSerializacji}</p>
      <h2>XML</h2>
      <p>
        XML (ang. Extensible Markup Language, rozszerzalny język znaczników)
        uniwersalny język znaczników przeznaczony do reprezentowania różnych
        danych w strukturalizowany sposób.{' '}
      </p>
      <h2>storage</h2>
      <ul>
        <li>LocalStorage</li>
        <li>SessionStorage</li>
        <li>CookiesStorage </li>
      </ul>
    </div>
  );
};
