import { useDispatch, useSelector } from 'react-redux';
import {
  increment,
  incrementByAmount,
  selectValue,
} from '../../../Store/counterSlice';
import { toggleDarkMode } from '../../../Store/testSlice';
export const Fisrst = () => {
  const value = useSelector(selectValue);
  const dispatch = useDispatch();
  return (
    <div className="redux-component">
      <h3>Pierwszy komponent</h3>
      <button
        className="redux-button"
        onClick={() => dispatch(toggleDarkMode())}
      >
        Toggle dark mode
      </button>
      <button className="redux-button" onClick={() => dispatch(increment())}>
        Dodaj 1
      </button>
      <button
        className="redux-button"
        onClick={() => dispatch(incrementByAmount(5))}
      >
        Dodaj 5
      </button>
      <button
        className="redux-button"
        onClick={() => dispatch(incrementByAmount(10))}
      >
        Dodaj 10
      </button>
      <div className="redux-output">{value.toString()}</div>
    </div>
  );
};
