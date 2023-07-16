import React, { useState } from 'react';

export function SingleQuestion({ question, answer }) {
  const [visible, setVisible] = useState(false);

  function onClickHandle(event) {
    setVisible(!visible);
  }
  let arrowClass = '';
  if (visible) {
    arrowClass = 'question-arrow question-arrow--rotated';
  } else {
    arrowClass = 'question-arrow';
  }

  return (
    <section className="single-question-section" onClick={onClickHandle}>
      <h2 className="question-header">
        <div className={arrowClass} />
        {question}
      </h2>
      {visible && (
        <div className="question-answer">
          <hr />
          <p>{answer}</p>
        </div>
      )}
    </section>
  );
}
