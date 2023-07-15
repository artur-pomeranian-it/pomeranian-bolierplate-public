import './styles.css';

export const MediaFiles = () => {
  return (
    <article>
      <h1>Pliki multimedialne</h1>
      <section>
        <h2>Vide</h2>
        <video width="320" height="240" controls>
          <source
            src="https://images.all-free-download.com/footage_preview/mp4/cute_wild_deer_grazing_in_nature_6892279.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </section>
      <section>
        <h2>Audio</h2>
        <audio controls>
          <source
            src="https://cdn.pixabay.com/download/audio/2022/12/22/audio_fb4198257e.mp3"
            type="audio/mpeg"
          />
          Your browser does not support the audio tag.
        </audio>
      </section>
      <section>
        <h2>Youte - embed a video using iFrame</h2>
        <a href="https://www.youtube.com/watch?v=oRdxUFDoQe0">
          Link to a youtube video
        </a>
        <div>Same file but embedded</div>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/oRdxUFDoQe0"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </section>
    </article>
  );
};
