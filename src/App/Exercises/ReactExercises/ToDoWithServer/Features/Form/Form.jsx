import { useState } from 'react';
import { LocalDevAPIClient } from '../../../../../ApiClients/LocalDevApiClient';
import { Button, Input, Label, Textarea } from '../../Components';
import './style.css';

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
        <Label htmlFor="title">Tytuł</Label>
        <Input
          id="title"
          value={title}
          placeholder="Kupić parasol na balkon"
          onChange={(el) => setTitle(el.target.value)}
        />
        <Label htmlFor="author">Autor</Label>
        <Input
          id="author"
          placeholder="Wojtek"
          value={author}
          onChange={(el) => setAuthor(el.target.value)}
        />
        <Label htmlFor="note">Autor</Label>
        <Textarea
          id="note"
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
