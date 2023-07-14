import './styles.css';

export const SelectorsAndCascade = () => {
  return (
    <div>
      <h1>Selectors and Cascade</h1>
      <section>
        <h2>Simple selectors</h2>
        <ul>
          <li>
            Element selector <strong>example</strong>
          </li>
          <li>
            <span id="some-id-selector">Id selector</span>
          </li>
          <li>
            <span className="class-selector">Class selector</span>
          </li>
          <li>Universal selector</li>
        </ul>
      </section>
      <section>
        <h2>Combinator selectors</h2>
        <ul className="selectors">
          <li className="descendant">
            descendant selector (space) <span>example: child</span>
          </li>
          <li className="child-selector">
            child selector (&gt;) example:{' '}
            <span className="son">
              son <span className="grandson">grandson</span>
            </span>
          </li>
          <li>
            adjacent sibling selector (+) <b>1</b>
            <b>2</b>
            <b className="adjacent-sibling">3</b>
            <b>4</b>
            <b>5</b>
          </li>
          <li>
            general sibling selector (~) <b>1</b>
            <b>2</b>
            <b>3</b>
            <b>4</b>
          </li>
        </ul>
      </section>
      <section>
        <h2>Pseudo-classes</h2>
        <p>
          examples:
          <ul className="pseudo">
            <li>:first-child</li>
            <li>:last-child</li>
            <li className="hover-over-me">:hover</li>
            <li className="has-focus">:focus</li>
            <li>
              :visited{' '}
              <a className="link-visited" href="http://google.com">
                google.com
              </a>
            </li>
          </ul>
        </p>
      </section>
      <section>
        <h2>Pseudo-elements</h2>
        <ul>
          <li>::first-line</li>
          <li>::before (z content)</li>
          <li>::after (z content)</li>
        </ul>
      </section>
      <section>
        <h2>Attribute selectors</h2>
        <ul className="attribute-selector">
          <li id="example">[attribute] example:</li>
          <li>
            [attribute=value] example:
            <a href="http://google.com" className="external-link">
              google.com
            </a>
          </li>
          <li>
            [attribute*=value] example:
            <a href="http://google.com" className="external-link">
              google.com
            </a>
          </li>
          <li>
            [attribute^=value] example:
            <a href="http://google.com" className="external-link">
              google.com
            </a>
          </li>
          <li>
            [attribute$=value] example:
            <a href="http://google.com" className="external-link">
              google.com
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
};
