import './styles.css';

export const PromiseAndMe = () => {
  /* 
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise?retiredLocale=pl
 */

  const promiseFunction = (size) => (resolve, reject) => {
    const LIMIT = 10000;
    let reusult = 0;
    for (let i = 0; i <= size; i++) {
      reusult += 1;
    }

    if (size <= LIMIT) {
      resolve(reusult);
    } else {
      reject('REQUEST REJECTED! Size limit is ' + LIMIT);
    }
  };

  const pFirst = new Promise(promiseFunction(1000000));
  pFirst
    .then((res) => console.log('pFirst success! result = ', res))
    .catch(console.warn);

  const pAlfa = Promise.resolve('pAlfa resolved');

  pAlfa.then(console.log);

  const pResolve = Promise.resolve({
    then(onFulfill, onReject) {
      onFulfill('fulfilled!');
    },
  });
  console.log('pResolve instanceof Promise: ', pResolve instanceof Promise);

  const pBeta = Promise.reject('pBeta rejected');
  pBeta.then(console.log).catch(console.warn);

  // pending, fulfilled, rejected
  // is settled when fulfilled or rejected

  const pChain = new Promise(promiseFunction(2000));

  pChain
    .then((input) => {
      console.log('pChain initial result:', input);
      // throw new Error('Coś poszło nie tak');
    })
    .catch((err) => {
      console.log('pChain error: ', err);
      return 'Error message was printed';
    })
    .then((input) => console.log('pChain last:', input))
    .finally(() => console.log('pChain settled, cleaning up...'));

  // const pChainThen = new Promise(promiseFunction);

  pChain
    .then((input) => {
      console.log('pChain2 initial result:', input);
      throw new Error('Coś poszło nie tak');
    })
    .then(
      (input) => console.log('pChain2 last:', input),
      (err) => {
        console.log('pChain2 error: ', err);
        return 'Error message was printed';
      }
    )
    .finally(() => console.log('pChain2 settled, cleaning up...'));

  pChain
    .then((input) => {
      console.log('pChain3 initial result:', input);
      throw new Error('Coś poszło nie tak');
    })
    .then((input) => console.log('pChain3 last:', input))
    .catch((err) => {
      console.log('pChain3 error: ', err);
      return 'Error message was printed';
    })
    .finally(() => console.log('pChain3 settled, cleaning up...'));

  return (
    <>
      <h1>Promisy w javascripcie</h1>
      <section></section>
    </>
  );
};
