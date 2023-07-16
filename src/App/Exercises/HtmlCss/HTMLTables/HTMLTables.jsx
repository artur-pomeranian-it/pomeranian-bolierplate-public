import './styles.css';

export const HTMLTables = () => {
  return (
    <article>
      <h1>Pierwsze tabelki</h1>
      <section>
        <h2>przykładowa tebela na stronie w3c</h2>
        <a href="https://www.w3schools.com/html/tryit.asp?filename=tryhtml_table_intro">
          tabelka w3c
        </a>
      </section>
      <section>
        <h2>Ćwiczenie 1</h2>
        <img
          src="https://wgbh.brightspotcdn.com/ce/c3/68fbc2ec4892a5aaaf5bdc053dcd/291.jpg"
          alt="simple table"
        />
        <table className="first-table">
          <tr>
            <th>Plastic</th>
            <th>Acetone</th>
            <th>Flame test</th>
            <th>Heat</th>
            <th>Crease color</th>
          </tr>
          <tr>
            <td>1</td>
            <td>No effect</td>
            <td>Green color</td>
            <td>Softens</td>
            <td>None</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Softened</td>
            <td>No change</td>
            <td>No change</td>
            <td>White</td>
          </tr>
          <tr>
            <td>3</td>
            <td>No effect</td>
            <td>Red color</td>
            <td>Softens</td>
            <td>None</td>
          </tr>
          <tr>
            <td>4</td>
            <td>No effect</td>
            <td>Green color</td>
            <td>Softens</td>
            <td>None</td>
          </tr>
        </table>
      </section>
      <section>
        <h2>Stylowanie tabeli</h2>
        <a href="https://mdn.github.io/learning-area/css/styling-boxes/styling-tables/punk-bands-complete.html">
          przykład tabelki
        </a>
        <br />
        <a href="https://www.w3schools.com/css/css3_gradients.asp">
          jak działa linear gradient
        </a>
        <table className="table-with-styling">
          <tr>
            <th>Plastic</th>
            <th>Acetone</th>
            <th>Flame test</th>
            <th>Heat</th>
            <th>Crease color</th>
          </tr>
          <tr>
            <td>1</td>
            <td>No effect</td>
            <td>Green color</td>
            <td>Softens</td>
            <td>None</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Softened</td>
            <td>No change</td>
            <td>No change</td>
            <td>White</td>
          </tr>
          <tr>
            <td>3</td>
            <td>No effect</td>
            <td>Red color</td>
            <td>Softens</td>
            <td>None</td>
          </tr>
          <tr>
            <td>4</td>
            <td>No effect</td>
            <td>Green color</td>
            <td>Softens</td>
            <td>None</td>
          </tr>
        </table>
      </section>
    </article>
  );
};
