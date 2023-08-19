import { useState } from 'react';
import { LocalDevAPIClient } from '../../../../../ApiClients/LocalDevApiClient';
import { Button } from '../../Components';
import './style.css';

const ERROR_FADE_DELAY = 1000; // 1s;
const BASE_URL = 'http://localhost:3333';

const SUBMIT_ERROR_MESSAGE = 'Wystąpił błąd, spróbuj ponownie.';
const localAPI = new LocalDevAPIClient({ baseURL: BASE_URL });

export function Form({ showList }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [note, setNote] = useState('');
  const [isError, setIsError] = useState(false);

  async function handleOnSubmit(event) {
    event.preventDefault();
    console.log(title, author, note);
    const [data, error] = await localAPI.addToDo({ title, author, note });
    if (!error) {
      console.log(data);
      showList();
    } else {
      console.error(error);
      setIsError(true);
    }
  }

  function handleReset() {
    showList();
  }

  return (
    <>
      <p>Dodawanie zadania</p>
      <form className="todo-form" onSubmit={handleOnSubmit}>
        <label className="todo-form__label" htmlFor="title">
          Tytuł
        </label>
        <input
          id="title"
          className="todo-form__input"
          type="text"
          autoComplete="off"
          value={title}
          placeholder="Kupić parasol na balkon"
          onChange={(el) => setTitle(el.target.value)}
        />
        <label className="todo-form__label" htmlFor="author">
          Autor
        </label>
        <input
          id="author"
          className="todo-form__input"
          type="text"
          placeholder="Wojtek"
          autoComplete="off"
          value={author}
          onChange={(el) => setAuthor(el.target.value)}
        />
        <label className="todo-form__label" htmlFor="note">
          Autor
        </label>
        <textarea
          id="note"
          className="todo-form__input todo-form__textarea"
          type=""
          value={note}
          placeholder="Zmierzyć ile mamy miejsca na balkonie od barierki do kanapy i ile musi mieć max średnicy - miarka!!"
          onChange={(el) => setNote(el.target.value)}
        />

        <div className="todo-form__error-message">
          {isError && SUBMIT_ERROR_MESSAGE}
        </div>

        <div className="todo-form__controls">
          <Button type="reset" variant="secondary" onClick={handleReset}>
            Cofnij
          </Button>
          <Button type="submit">Dodaj</Button>
        </div>
      </form>
    </>
  );
}
