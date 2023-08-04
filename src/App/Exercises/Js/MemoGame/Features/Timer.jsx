import { useEffect, useState } from 'react';
import { Label, Output } from '../Components';
import { formatTime } from '../Utils';

export const Timer = ({
  inheritedTime,
  status,
  shouldUpdateTime,
  updateTime,
}) => {
  const [time, setTime] = useState(inheritedTime);
  const [intervalId, setIntervalId] = useState();
  // console.log('Timer rendered');

  useEffect(() => {
    setTime(inheritedTime);
  }, [inheritedTime]);

  useEffect(() => {
    let intervalId;
    if (status === 'started')
      intervalId = setInterval(
        () => setTime((currentTime) => currentTime + 1000),
        1000
      );
    setIntervalId(intervalId);
    return () => clearInterval(intervalId);
  }, [status]);

  useEffect(() => {
    if (status === 'finished' || status === 'passed') {
      clearInterval(intervalId);
    }
  }, [intervalId, status]);

  useEffect(() => {
    if (shouldUpdateTime) {
      updateTime(time);
    }
  }, [updateTime, time, shouldUpdateTime]);

  return status === 'started' ? (
    <div className="memo__row-container">
      <Label>Czas gry</Label>
      <Output value={formatTime(time)} />
    </div>
  ) : null;
};
