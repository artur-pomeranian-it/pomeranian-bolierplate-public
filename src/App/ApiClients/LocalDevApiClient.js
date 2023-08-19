/*

  API client for the Local Server ToDo List application

  Swagger documentation under this location
  http://localhost:3333/api-docs/#/Todos/get_api_todo__id_

  Local server's source is here:
  https://github.com/pomeranianstartit-pl/pomeranian-local-dev-server

 */
export class LocalDevAPIClient {
  baseURL = '';
  #headers = {
    'Content-Type': 'application/json',
  };

  constructor({ baseURL, headers }) {
    if (!baseURL)
      console.error('LocalDevAPIClient - baseURL must NOT be empty');
    this.baseURL = baseURL;
    if (headers) {
      this.#headers = { ...this.#headers, ...headers };
      // alternative approach
      //   this.#headers = headers || this.#headers;
    }
  }

  async #internalFetch(fullPath, options) {
    let data = undefined;
    let error = undefined;
    try {
      const response = await fetch(fullPath, options);
      if (!response.ok)
        throw new Error(`${response.status} (${response.statusText})`);
      data = await response.json();
    } catch (err) {
      error = err;
      //   if (!(err instanceof Error)) error = new Error(err);
    }
    return [data, error];
  }

  async getAllToDos(signal = undefined) {
    const requestPath = '/api/todo';
    const fullPath = this.baseURL + requestPath;
    const headers = this.#headers;
    const options = { method: 'GET', headers, signal };
    return await this.#internalFetch(fullPath, options);
  }

  #validateId(id) {
    if (!id || id < 1) {
      return new Error('deleteToDO param missing or less than 1');
    }
    return undefined;
  }

  async getToDo(id, signal = undefined) {
    const validationError = this.#validateId(id);
    if (validationError) return [undefined, validationError];

    const requestPath = '/api/todo/' + id;
    const fullPath = this.baseURL + requestPath;
    const headers = this.#headers;
    const options = { method: 'GET', headers, signal };
    return await this.#internalFetch(fullPath, options);
  }

  async deleteToDo(id) {
    const validationError = this.#validateId(id);
    if (validationError) return [undefined, validationError];

    const requestPath = '/api/todo/' + id;
    const fullPath = this.baseURL + requestPath;
    const headers = this.#headers;
    const options = { method: 'DELETE', headers };
    return await this.#internalFetch(fullPath, options);
  }

  async markAsDone(id) {
    const validationError = this.#validateId(id);
    if (validationError) return [undefined, validationError];

    const requestPath = `/api/todo/${id}/markAsDone`;
    const fullPath = this.baseURL + requestPath;
    const headers = this.#headers;
    const options = { method: 'PUT', headers };
    return await this.#internalFetch(fullPath, options);
  }

  #validateToDoInput(todo) {
    if (!todo) return new Error('addToDo: missing todo object');
    const { title, note, author } = todo;

    const hasRequiredFields = !title || !note || !author;
    if (hasRequiredFields)
      return new Error('addToDo: title, note and author are mandatory');

    const requiredFieldsAreStrings = !(
      typeof title === 'string' &&
      typeof note === 'string' &&
      typeof author === 'string'
    );
    if (requiredFieldsAreStrings)
      return new Error('addToDo: title, note and author must be strings');

    const requiredFieldsAreNotEmpty =
      title.length === 0 || note.length === 0 || author.length === 0;
    if (requiredFieldsAreNotEmpty)
      return new Error("addToDo: title, note and author can't be empty");
    return undefined;
  }

  async addToDo(todo) {
    const validationError = this.#validateToDoInput(todo);
    if (validationError) return [undefined, validationError];

    const requestPath = '/api/todo';
    const fullPath = this.baseURL + requestPath;

    const headers = this.#headers;
    headers.accept = 'application/json';

    const { title, note, author } = todo;
    const body = JSON.stringify({ title, note, author });

    const options = { method: 'POST', headers, body };
    return await this.#internalFetch(fullPath, options);
  }

  async updateToDo(todo) {
    const validationError = this.#validateToDoInput(todo);
    if (validationError) return [undefined, validationError];

    const { id, title, note, author } = todo;

    const idValidationError = this.#validateId(id);
    if (idValidationError) return [undefined, idValidationError];

    const requestPath = '/api/todo/' + id;
    const fullPath = this.baseURL + requestPath;

    const headers = this.#headers;
    headers.accept = 'application/json';

    const body = JSON.stringify({ title, note, author });

    const options = { method: 'PUT', headers, body };
    return await this.#internalFetch(fullPath, options);
  }
}
