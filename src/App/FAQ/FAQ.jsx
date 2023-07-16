import { SingleQuestion } from './SingleQuestion';
import './styles.css';

export const FAQ = () => {
  const answer = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eleifend
  rutrum ipsum, leo et in. Mattis porttitor volutpat placerat
  suspendisse ante in cursus etiam ullamcorper. Sollicitudin egestas
  aliquam, adipiscing adipiscing iaculis habitant. Viverra pretium
  tincidunt nisl pellentesque ut adipiscing non.Lorem ipsum dolor sit
  amet, consectetur adipiscing elit`;
  return (
    <article>
      <h1>&lt; FAQ</h1>
      <p>Tutaj znajdź odpowiedzi na najczęściej zadawane pytania</p>
      <SingleQuestion
        question="Jak mogę zapisać się na szkolenie?"
        answer={answer}
      />
      <SingleQuestion
        question="Jak mogę zapisać się na szkolenie?"
        answer={answer}
      />
      <SingleQuestion
        question="Jak mogę zapisać się na szkolenie?"
        answer={answer}
      />
      <SingleQuestion
        question="Jak mogę zapisać się na szkolenie?"
        answer={answer}
      />
    </article>
  );
};
