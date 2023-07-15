import './styles.css';

export const ImageFiles = () => {
  return (
    <article>
      <h1>Pliki graficzne</h1>
      <section>
        <h2>Formaty plików</h2>
        <ul>
          <li>
            <a href="https://en.wikipedia.org/wiki/JPEG">jpg</a>{' '}
            <cite>
              compression works by averaging out colours of nearby pixels. PEG
              typically achieves 10:1 compression with little perceptible loss
              in image quality. Doesn't supports transparency.
            </cite>
          </li>
          <li>
            <a href="https://en.wikipedia.org/wiki/PNG">png</a>{' '}
            <cite>
              No data is lost during compression and no compression artefacts
              are introduced in the image. supports transparency.
            </cite>
          </li>
          <li>
            <a href="http://">svg</a>
            <cite>
              Scalable Vector Graphics (SVG) is an XML-based vector image format
              for defining two-dimensional graphics. Gest for scalability.
            </cite>
          </li>
          <li>
            <a href="https://en.wikipedia.org/wiki/GIF">gif</a>{' '}
            <cite>
              Supports animation. GIF is unsuitable for images with transparent
              backgrounds (PNG is better).
            </cite>
          </li>
        </ul>
        <div>Ćwiczenie dodać obrazek (img) ścieżka do pliku src\App\Images</div>
        <img src="" alt="" />
      </section>
      <section>
        <h2>Extras</h2>
        <p>relative path vs absolute path</p>
        <p>
          <a href="https://tinypng.com/">tinyPNG</a>
        </p>
      </section>
    </article>
  );
};
