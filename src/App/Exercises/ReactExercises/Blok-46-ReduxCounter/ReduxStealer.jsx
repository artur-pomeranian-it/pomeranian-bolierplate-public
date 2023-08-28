import { useDispatch, useSelector } from 'react-redux';
import {
  decrement,
  decrementByAmount,
  decrementWithEnsure,
  reset,
  selectErrorMessage,
} from '../../../Store/counterSlice';

export const ReduxStealer = () => {
  const dispatch = useDispatch();
  const errorMessage = useSelector(selectErrorMessage);
  return (
    <div className="redux-component">
      <h3>Drugi komponent</h3>
      <button className="redux-button" onClick={() => dispatch(decrement())}>
        Odejmij
      </button>
      <button
        className="redux-button"
        onClick={() => dispatch(decrementByAmount(7))}
      >
        Odejmij 7
      </button>
      <button
        className="redux-button"
        onClick={() => dispatch(decrementByAmount(14))}
      >
        Odejmij 14
      </button>
      <button className="redux-button" onClick={() => dispatch(reset())}>
        Reset
      </button>
      <button
        className="redux-button"
        onClick={() => dispatch(decrementWithEnsure(10))}
      >
        Odejmij Bezpiecznie
      </button>
      <div className="redux-output">{errorMessage}</div>
    </div>
  );
};
