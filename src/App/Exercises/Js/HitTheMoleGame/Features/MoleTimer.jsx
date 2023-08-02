import { useEffect, useState } from 'react';
import { Label, Output } from '../Components';
import { formatTime } from '../Utils';

export const MoleTimer = ({ finish, duration }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  function decrementTimeBy(miliseconds) {
    setTimeLeft((prevTime) => prevTime - miliseconds);
  }

  useEffect(() => {
    if (timeLeft <= 0) {
      finish();
    }
  }, [timeLeft, finish]);

  useEffect(() => {
    let timeLeftIntervalId;

    timeLeftIntervalId = setInterval(decrementTimeBy, 100, 100);

    return () => {
      clearInterval(timeLeftIntervalId);
    };
  }, []);

  return (
    <div className="mole__row-container">
      <Label>CZAS DO KOŃCA</Label>
      <Output value={formatTime(timeLeft)} />
    </div>
  );
};
