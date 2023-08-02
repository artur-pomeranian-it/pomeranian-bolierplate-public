import './styles.css';

export const Button = ({ value = 'button', variant = 'primary', onClick }) => {
  function getVariantsClass(input) {
    let result = '';
    switch (input) {
      case 'primary':
        result = 'mole__button--primary';
        break;
      case 'secondary':
        result = 'mole__button--secondary';
        break;
      case 'tertiary':
        result = 'mole__button--tertiary';
        break;
      default:
        result = '';
        break;
    }
    if (result === '') {
      console.warn(
        'Incorrect variant provided to Button component; or variant missing.'
      );
    }
    return result;
  }
  return (
    <button
      className={`mole__button ${getVariantsClass(variant)}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};
