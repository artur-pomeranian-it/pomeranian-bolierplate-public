import { useEffect, useState } from 'react';
import { LocalDevAPIClient } from '../../../../../ApiClients/LocalDevApiClient';
import { Button, Input, Label, Textarea } from '../../Components';
import './style.css';

const BASE_URL = 'http://localhost:3333';

const SUBMIT_ERROR_MESSAGE = 'Wystąpił błąd, spróbuj ponownie.';
const localAPI = new LocalDevAPIClient({ baseURL: BASE_URL });

export function Form({ showList, isAddForm, id }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [note, setNote] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!isAddForm && id) {
      let controller = new AbortController();
      const getToDoAsync = async () => {
        try {
          const { title, note, author } = await localAPI.getToDo(
            id,
            controller.signal
          );
          setTitle(title);
          setAuthor(author);
          setNote(note);
          setIsError(false);
        } catch (error) {
          console.error(error.message);
          setIsError(true);
        }
      };
      getToDoAsync();
      return () => controller.abort();
    }
  }, [id, isAddForm]);

  const getApiPromise4FormSubmit = () => {
    if (isAddForm) {
      return localAPI.addToDo({ title, author, note });
    } else {
      return localAPI.updateToDo(id, { title, author, note });
    }
  };

  async function handleOnSubmit(event) {
    event.preventDefault();
    try {
      await getApiPromise4FormSubmit();
      showList();
    } catch (error) {
      console.error(error);
      setIsError(true);
    }
  }

  function handleReset() {
    showList();
  }

  if (!isAddForm && !id)
    return (
      <div>
        W przypadku edycji wymagane jest ID elementu
        <br />
        <Button type="button" variant="secondary" onClick={handleReset}>
          Cofnij
        </Button>
      </div>
    );

  return (
    <>
      <p>{isAddForm ? 'Dodawanie' : 'Edycja'} zadania</p>
      <form className="todo-form" onSubmit={handleOnSubmit}>
        <Label htmlFor="title">Tytuł</Label>
        <Input
          id="title"
          value={title}
          placeholder="Kupić parasol na balkon"
          onChange={(el) => setTitle(el.target.value)}
        />
        {isAddForm && (
          <>
            <Label htmlFor="author">Autor</Label>
            <Input
              id="author"
              placeholder="Wojtek"
              value={author}
              onChange={(el) => setAuthor(el.target.value)}
            />
          </>
        )}

        <Label htmlFor="note">Treść</Label>
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
          <Button type="submit">{isAddForm ? 'Dodaj' : 'Zapisz'}</Button>
        </div>
      </form>
    </>
  );
}
