import React from 'react';

import './style.css';

export function LocalDevAndFetch() {
  return (
    <div className="rest-server">
      <h1>REST + Swagger + lokalny serwer</h1>
      <section>
        <h2>HTTP protocol</h2>
        <p>google HTTP go to Wikipedia, try search and use HTTP</p>
        <ul>
          <li>
            <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Status">
              HTTP response status codes
            </a>
          </li>
          <li>
            <a href="https://http.cat/">codes with Cats </a>
          </li>
          <li>
            <a href="https://httpstatusdogs.com/">codes with Dogs</a>
          </li>
        </ul>
        <h3>frequently used respnse codes</h3>
        <ul>
          <li>Information response: rarely</li>
          <li>Successful response: 200, 201, 204</li>
          <li>Redirection message: 302, 301</li>
          <li>Client error response: 400, 401, 403, 404, 405, 408, 429</li>
          <li>Server error response: 500, 501, 502, 503, 504</li>
        </ul>
      </section>
      <section>
        <h2>API</h2>
        <p>
          <abbr title="Application Programming Interface">API</abbr> - inaczej{' '}
          <strong>Interfejs</strong>, czyli zbiór regół opisujących komunikcaję
          między aplikacjami
        </p>
        Przykłady:
        <ul>
          <li>
            <a href="https://ssd-api.jpl.nasa.gov/doc/index.php">NASA</a>
          </li>
          <li>
            <a href="https://api-dbw.stat.gov.pl/apidocs/index.html">GUS pl</a>
          </li>
        </ul>
      </section>

      <section>
        <h2>REST</h2>
        <abbr title="REpresentational State Transfer">REST</abbr>
        <p>
          <strong>REST is not === HTTP</strong> to zbiór zasad dotyczących
          architektury aplikacji rozproszonych
        </p>
        <p>
          REST API - to API, zwykle wykorzystujące JSNO do komunikacji, czy
          zawsze? mozę też być XML
        </p>
      </section>
      <section>
        <h2>SOP, CORS</h2>
        <abbr title="Same-Origin-Policy">SOP</abbr>
        <br />
        <abbr title="Cross-Origin Resource Sharing">CORS</abbr>
      </section>
      <section>
        <h2>metody HTTP</h2>
        <ul>
          <li>GET - read</li>
          <li>POST - create</li>
          <li>PUT - update/replace (more common)</li>
          <li>PATCH - update/modify</li>
          <li>DELETE - ...</li>
        </ul>
      </section>
      <section>
        <h2>Other type of API: SOAP</h2>
        <p>SOAP - wykorzystuje XML do komunikacji</p>
      </section>
      <section>
        <h2>git repo with local server</h2>
        <a href="https://github.com/pomeranianstartit-pl/pomeranian-local-dev-server">
          repo
        </a>
      </section>
      <section>
        other resources
        <ul>
          <li>
            <a href="https://kursjs.pl/kurs/ajax/fetch">fetch</a>
          </li>
          <li>
            <a href="https://bykowski.pl/rest-api-efektywna-droga-do-zrozumienia/">
              REST api
            </a>
          </li>
          <li>
            <a href="https://swagger.io/">swagger.io</a>
          </li>
        </ul>
      </section>
    </div>
  );
}
