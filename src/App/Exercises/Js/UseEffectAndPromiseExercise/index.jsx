import './styles.css';

export const UseEffectAndPromiseExercise = () => {
  function loadUser() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id: 1, name: 'John Doe' });
      }, 2000);
    });
  }

  function loadUserDetails(useId) {
    // { id: userId, age: 30, country: "Poland" }
  }
  return (
    <div>
      <h1>UseEffectAndPromiseExercise</h1>
    </div>
  );
};
