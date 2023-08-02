import { useEffect, useState } from 'react';
import { MasterHeader } from '../../../Components/MasterHeader/MasterHeader';
import { Button, Output, GameResults, Label } from './Components';
import './styles.css';

const MINUTA = 60000;
const DURATIONS = [
  { label: '1 minuta', duration: MINUTA },
  { label: '2 minuty', duration: MINUTA * 2 },
  { label: '3 minuty', duration: MINUTA * 3 },
];

const MOLES = [
  { label: '1 kret', molesNo: 1, tiles: 10, timeVisible: 1000 },
  { label: '2 krety', molesNo: 2, tiles: 15, timeVisible: 500 },
  { label: '3 krety', molesNo: 3, tiles: 20, timeVisible: 350 },
];

export const HitTheMoleGame = () => {
  const [status, setStatus] = useState('notStarted');
  const [duration, setDuration] = useState();
  const [molesNo, setMolesNo] = useState();
  const [timeLeft, setTimeLeft] = useState();
  const [score, setScore] = useState();

  function formatTime(time) {
    const timeInSeconds = Math.floor(time / 1000);

    const m = Math.floor(timeInSeconds / 60)
      .toString()
      .padStart(2, '0');

    const s = Math.floor(timeInSeconds % 60)
      .toString()
      .padStart(2, '0');

    return `${m}:${s}`;
  }

  useEffect(() => {
    if (status === 'notStarted') {
      setTimeLeft(0);
    }
    if (status === 'started') {
      setTimeLeft(duration);
    }
    if (status !== 'finished') {
      setScore(0);
    }
  }, [status, duration]);

  return (
    <div>
      <MasterHeader value="Kret" />
      <p>
        Gra polegająca na podążaniu za krecikiem i trafieniu na kwadrat, w
        którym się pojawił.
      </p>
      <div>
        Status: {status}, duration: {duration}, molesNo {molesNo}
      </div>
      <GameResults score={score} duration={formatTime(duration)} />

      <>
        <div className="mole__row-container">
          <Label>CZAS GRY</Label>
          {DURATIONS.map((item) => (
            <Button
              key={item.label}
              value={item.label}
              variant="primary"
              onClick={() => setDuration(item.duration)}
            />
          ))}
        </div>

        <div className="mole__row-container">
          <Label>LICZBA KRETÓW</Label>
          {MOLES.map((item) => (
            <Button
              key={item.label}
              value={item.label}
              variant="primary"
              onClick={() => setMolesNo(item.molesNo)}
            />
          ))}
        </div>
        <div className="mole__row-container">
          <Label>PRZYCISKI STERUJĄCE</Label>
          <Button
            value="START"
            variant="primary"
            onClick={() => setStatus('started')}
          />
        </div>
      </>
      <>
        <div className="mole__row-container">
          <Label>CZAS DO KOŃCA</Label>
          <Output value={formatTime(timeLeft)} />
        </div>
        <div className="mole__row-container">
          <Label>WYNIK</Label>
          <Output value={score} />
        </div>
        <div className="mole__row-container">
          <Label>PRZYCISKI STERUJĄCE</Label>
          <Button
            value="STOP"
            variant="tertiary"
            onClick={() => setStatus('notStarted')}
          />
        </div>
      </>
      <dir onClick={() => setScore((currentScore) => currentScore + 1)}>
        Dummy Kret
      </dir>
    </div>
  );
};
