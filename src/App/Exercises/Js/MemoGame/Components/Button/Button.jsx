import './styles.css';

export const Button = ({ value = 'button', variant = 'primary', onClick }) => {
  function getVariantsClass(input) {
    let result = '';
    switch (input) {
      case 'primary':
        result = 'memo__button--primary';
        break;
      case 'secondary':
        result = 'memo__button--secondary';
        break;
      case 'tertiary':
        result = 'memo__button--tertiary';
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
      className={`memo__button ${getVariantsClass(variant)}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};
