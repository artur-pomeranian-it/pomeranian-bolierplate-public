import './styles.css';

export const OrganizingCSS = () => {
  return (
    <article>
      <h1>Organizacja CSS</h1>
      <section>
        <h2>Zasada single responsibility</h2>
        <blockquote cite="">
          The single responsibility principle states that every class should
          have a single responsibility, and that responsibility should be
          entirely encapsulated by the class. All its services should be
          narrowly aligned with that responsibility.
        </blockquote>
        <p>
          Generalnie, chcemy dążyć do większej liczby klas z mniejszą liczbą
          ustawień.
        </p>
        <h3>Example - bad</h3>
        <div className="srp-example-bad">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi
          doloremque sint exercitationem culpa repellendus nemo debitis qui
          reiciendis placeat, vero obcaecati rem ratione voluptatum? Atque earum
          illo delectus quam omnis.
        </div>
        <div className="srp-example-bad--dark">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates
          dolor eligendi eveniet laudantium, et praesentium dolores quisquam
          numquam consectetur fuga quo dolorem assumenda! Soluta fugiat ipsum
          eius dolores, eligendi tenetur?
        </div>
        <h3>Example - good</h3>
        <div className="srp-example-good srp-example-good--light">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi
          doloremque sint exercitationem culpa repellendus nemo debitis qui
          reiciendis placeat, vero obcaecati rem ratione voluptatum? Atque earum
          illo delectus quam omnis.
        </div>
        <div className="srp-example-good  srp-example-good--dark">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates
          dolor eligendi eveniet laudantium, et praesentium dolores quisquam
          numquam consectetur fuga quo dolorem assumenda! Soluta fugiat ipsum
          eius dolores, eligendi tenetur?
        </div>
      </section>
      <section>
        <h2>Metodologie organizacji CSS</h2>
        <h3>Examples</h3>
        <ul>
          <li>
            <a href="https://getbem.com/introduction/">BEM</a>
          </li>
          <li>
            <a href="http://oocss.org/">OOCS</a>
          </li>
          <li>...and more</li>
        </ul>
      </section>
      <section>
        <h2>CSS pre-processors</h2>
        <p>
          Jako język arkuszy stylów, CSS ma pewne ograniczenia, jeśli chodzi o
          pisanie logiki, organizowanie kodu i wykonywanie innych zadań
          obliczeniowych. Preprocesory CSS zapewniają rozwiązanie tego problemu.
        </p>
        <h3>Przykłady</h3>
        <ul>
          <li>
            <a href="https://sass-lang.com/">SASS</a>
          </li>
          <li>
            <a href="https://lesscss.org/">LESS</a>
          </li>
          <li>
            <a href="https://stylus-lang.com/">Stylus</a>
          </li>
        </ul>
      </section>
      <section>
        <h2>CSS post-processors</h2>
        <h3>Przykłady</h3>
        <ul>
          <li>
            <a href="https://bestwebhostingaustralia.org/blesscss/">Bless</a>
            Bless provides an elegant solution to a lesser-known bug in Internet
            Explorer which causes CSS to be completely ignored. It runs
            server-side and on your local machine with Node.js
          </li>
          <li>
            <a href="https://cssnext.github.io/">CSS next</a>PostCSS-cssnext is
            a PostCSS plugin that helps you to use the latest CSS syntax today.
            It transforms new CSS specs into more compatible CSS so you don't
            need to wait for browser support.
          </li>
        </ul>
      </section>
      <section>
        <h2>Variables</h2>
        <h3>Prosty Przykład</h3>
        <div className="variables-example-simple">
          <ul>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
              perspiciatis quis sint fugiat qui? Magnam asperiores, illum animi,
              laboriosam eius quasi pariatur incidunt porro nemo et enim
              quisquam perferendis quae!
            </li>
            <li>
              Dolore nam, placeat laborum ut veritatis sapiente soluta
              voluptates harum laudantium sequi recusandae nostrum nisi nihil
              odio cumque reiciendis eos temporibus, deserunt quia animi. Autem
              aperiam optio blanditiis totam ipsum.
            </li>
            <li>
              Corrupti reiciendis dolor ducimus. Amet facilis inventore,
              assumenda magni tempore a laboriosam ea qui ipsam quisquam
              delectus, quas laudantium velit, dolores quam cum repudiandae quis
              asperiores sapiente. Officiis, voluptatibus nisi!
            </li>
            <li className="variables-example-simple-use">
              Enim ex nam aspernatur qui sit minus, fuga alias rem voluptatibus
              velit ut. Deserunt modi aliquid dicta dolores dolor sapiente
              explicabo qui similique debitis, dolorem iusto sit tenetur tempore
              odit!
            </li>
          </ul>
        </div>
        <h3>Przykład zaawansowany</h3>
        <div className="variables-example-complex">
          <ul>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
              perspiciatis quis sint fugiat qui? Magnam asperiores, illum animi,
              laboriosam eius quasi pariatur incidunt porro nemo et enim
              quisquam perferendis quae!
            </li>
            <li>
              Dolore nam, placeat laborum ut veritatis sapiente soluta
              voluptates harum laudantium sequi recusandae nostrum nisi nihil
              odio cumque reiciendis eos temporibus, deserunt quia animi. Autem
              aperiam optio blanditiis totam ipsum.
            </li>
            <li className="variables-example-complex-use">
              Enim ex nam aspernatur qui sit minus, fuga alias rem voluptatibus
              velit ut. Deserunt modi aliquid dicta dolores dolor sapiente
              explicabo qui similique debitis, dolorem iusto sit tenetur tempore
              odit!
            </li>
            <li>
              Corrupti reiciendis dolor ducimus. Amet facilis inventore,
              assumenda magni tempore a laboriosam ea qui ipsam quisquam
              delectus, quas laudantium velit, dolores quam cum repudiandae quis
              asperiores sapiente. Officiis, voluptatibus nisi!
            </li>
          </ul>{' '}
        </div>
      </section>
    </article>
  );
};
