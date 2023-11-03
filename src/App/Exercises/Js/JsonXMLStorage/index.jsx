import './styles.css';
import { LocalStorage } from './LocalStorage';
import { SessionStorage } from './SessionStorage';
import { CookiesStorage } from './CookiesStorage';
import { ExampleSOAP } from './ExampleSOAP';

export const JsonXMLStorage = () => {
  // -----------------------------------------------------------------------------
  // JSON
  // -----------------------------------------------------------------------------

  // -----------------------------------------------------------------------------
  // PARSOWANIE
  // -----------------------------------------------------------------------------

  const jsonString = '{"name":"John", "age":30, "car":null}';
  const jsonBoolean = 'true';

  const parsedJson = JSON.parse(jsonString);
  const jsonBooleanParsed = JSON.parse(jsonBoolean);

  // -----------------------------------------------------------------------------
  // EVAL() - wykonuje dowolny kod JavaScript - co może być niebezpieczne,
  // ponieważ może wykonać złośliwy kod co stwarza ryzyko ataków XSS
  // https://sekurak.pl/czym-jest-xss/
  // -----------------------------------------------------------------------------

  // -----------------------------------------------------------------------------
  // SERIALIZACJA
  // -----------------------------------------------------------------------------

  const objForSerialization = {
    name: 'John',
    surname: 'Doe',
    age: 30,
    cars: ['Ford', 'BMW', 'Fiat'],
    isAdult: true,
  };

  const serializedObj = JSON.stringify(objForSerialization);

  // -----------------------------------------------------------------------------
  // DESERIALIZACJA (JSON.parse a nie JSON.deserialize)
  // -----------------------------------------------------------------------------

  const array = [1, 2, 3];
  const arraySerialized = JSON.stringify(array);
  console.log('arraySerialized', arraySerialized);

  const arrayDeserialized = JSON.parse(arraySerialized);
  console.log('arrayDeserialized', arrayDeserialized);

  const emptyValue = null;
  const emptyValueSerialized = JSON.stringify(emptyValue);
  console.log('emptyValueSerialized', emptyValueSerialized);

  const emptyValueDeserialized = JSON.parse(emptyValueSerialized);
  console.log('emptyValueDeserialized', emptyValueDeserialized);

  const undefinedValue = undefined;
  const undefinedValueSerialized = JSON.stringify(undefinedValue);
  console.log('undefinedValueSerialized', undefinedValueSerialized);

  // JSON obsługuje tylko podstawowe typy danych:
  // string, number, boolean, object, array, null
  // w JSONie nazwy właściwości muszą być w cudzysłowiu np "name": "John"

  // -----------------------------------------------------------------------------
  // LINKI POMOCNICZE
  // -----------------------------------------------------------------------------

  // https://www.oracle.com/pl/database/what-is-json/
  // https://developer.mozilla.org/en-US/docs/Glossary/XML
  // https://appmaster.io/blog/json-vs-xml
  // https://www.w3schools.com/js/js_json_stringify.asp
  // https://frontstack.pl/czym-jest-local-storage-i-jak-uzywac/
  // https://www.w3schools.com/jsref/prop_win_sessionstorage.asp
  // https://www.geeksforgeeks.org/difference-between-local-storage-session-storage-and-cookies
  // https://www.w3schools.com/js/js_cookies.asp
  // https://javascript.info/eval
  // https://javascript.info/json
  // https://developer.mozilla.org/en-US/docs/Web/Guide/Parsing_and_serializing_XML
  // https://geshan.com.np/blog/2022/11/nodejs-xml-parser/

  return (
    <div>
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
      <p>
        parsowanie - deserializacja przykład {parsedJson.name}, boolean:{' '}
        {jsonBooleanParsed}
      </p>
      <p>stringify - serializacja przykład: {serializedObj}</p>
      <h2>XML</h2>
      <p>
        XML (ang. Extensible Markup Language, rozszerzalny język znaczników)
        uniwersalny język znaczników przeznaczony do reprezentowania różnych
        danych w strukturalizowany sposób.{' '}
      </p>
      <p>
        XML vs. JSON: trudniejszy do nauczenia, bardziej skąplikowany, większy
        rozmiar, wolniejszy, większa kontrola nad strukturą wymienianych danych,
        wbudowana walidacja
      </p>
      <p>Powiązany termin WSDL - web schema definition language (IBM)</p>
      <ExampleSOAP />
      <h2>SOAP vs REST - todo</h2>
      <p>SOAP - single object access protocol</p>
      <p>REST - representative state transfer</p>
      <h2>storage</h2>
      <ul>
        <li>LocalStorage</li>
        <li>SessionStorage</li>
        <li>CookiesStorage </li>
      </ul>
      JSON XML STORAGE
      <LocalStorage />
      <SessionStorage />
      <CookiesStorage />
    </div>
  );
};
