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
    }
  }

  async myFetch(fullPath, options) {
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
    return await this.myFetch(fullPath, options);
  }

  async deleteToDo(id) {
    if (!id || id < 1) {
      return [undefined, new Error('deleteToDO param missing or less than 1')];
    }
    const requestPath = '/api/todo/' + id;
    const fullPath = this.baseURL + requestPath;
    const headers = this.#headers;
    const options = { method: 'DELETE', headers };
    return await this.myFetch(fullPath, options);
  }

  async markAsDone(id) {
    if (!id || id < 1) {
      return [undefined, new Error('deleteToDO param missing or less than 1')];
    }
    const requestPath = `/api/todo/${id}/markAsDone`;
    const fullPath = this.baseURL + requestPath;
    const headers = this.#headers;
    const options = { method: 'PUT', headers };
    return await this.myFetch(fullPath, options);
  }
}
