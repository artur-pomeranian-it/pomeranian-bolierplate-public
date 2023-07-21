import './styles.css';

export const JsObjectsBasics = () => {
  function exampleObjectDefinition() {
    let nameOfProp = 1;
    const obj = {
      property1: 'value1', // property as an identifier
      2: 'value2', // or a number
      'property 3': 'value3', // or a string
      property4: 'value4', // or a string
      propertyObj: { propIn1: 4, propIn2: 5 }, // or as an object,
      nameOfProp,
      fun() {
        return 1;
      },
    };

    return { obj };
  }

  function exampleAccessingObjects() {
    const obiekt = {
      one: 1,
      two: 'Two',
      three: [1, 2, 3],
      'property 4': 'Hello World!',
      'property delete': 'Good bye',
    };
    const { two, ...restOf } = obiekt;
    delete obiekt['property delete']; // mutates the original object
    // object assign

    return {
      dotAccess: obiekt.one,
      bracketAccess: obiekt['property 4'],
      spreadOperator: { ...obiekt }, // kopiowanie properiest obiektu
      spreadOperatorRestOf: restOf,
      deleteProperty: obiekt,
    };
  }
  function exampleAccessingObjectsPart2() {
    const obj1 = { one: 1, two: 'White' };
    const obj2 = { one: 3, million: 'Rainbow' };
    const objectAssigned = Object.assign(obj1, obj2); // mutates the original object
    const objectAssignedReversed = Object.assign(obj2, obj1);

    return {
      objectAssigned,
      // to tak łatwo nie zadziała
      objectAssignedReversed,
      // zobacz
      obj1,
      objectEntries: Object.entries(obj2),
      objectValues: Object.values(obj2),
      objectKeys: Object.keys(obj2),
    };
  }

  function exampleAccessingObjectsFreeze() {
    const obj1 = { one: 1, two: 'White' };
    const obj2 = { one: 3, million: 'Rainbow' };
    const test = { test: 'Test' };
    Object.freeze(obj1);
    Object.seal(obj2);
    // Cannot assign to read only property 'one' of object
    // Object.assign(obj1, test);
    // obj1.one = 4;
    // Cannot add property test, object is not extensible
    // Object.assign(obj2, test);
    obj2.one = 101;
    return {
      obj1,
      obj2,
      test,
      isObj1Frozen: Object.isFrozen(obj1),
      isObj2Frozen: Object.isSealed(obj2),
    };
  }

  // function exampleObjectDefinition() {}
  // function exampleAccessingObjects() {}
  // function exampleAccessingObjectsPart2() {}
  // function exampleAccessingObjectsFreeze() {}

  return (
    <article>
      <h1>Obiekty</h1>
      <section>
        <h2>Obiekt jako key:value store</h2>
        <p>Obiekty jako zbiór funkcji często wykorzystywane są w eksportach</p>
        <p>
          Zobacz zawartość <code>function exampleObjectDefinition()</code>
        </p>
        <p>
          wynik: <code>{JSON.stringify(exampleObjectDefinition())}</code>
        </p>
      </section>
      <section>
        <h2>Dostęp do obiektów</h2>
        <p>
          Zobacz zawartość <code>function exampleAccessingObjects()</code>
        </p>
        <p>
          wynik: <code>{JSON.stringify(exampleAccessingObjects())}</code>
        </p>
      </section>
      <section>
        <h2>Dostęp do obiektów c.d.</h2>
        <p>
          Zobacz zawartość <code>function exampleAccessingObjectsPart2()</code>
        </p>
        <p>
          wynik: <code>{JSON.stringify(exampleAccessingObjectsPart2())}</code>
        </p>
        <cite>
          The Object.assign() static method copies all enumerable own properties
          from one or more source objects to a target object. It returns the
          modified target object.
        </cite>
      </section>
      <section>
        <h2>Dostęp do obiektów c.d. ...</h2>
        <p>
          Zobacz zawartość <code>function exampleAccessingObjectsFreeze()</code>
        </p>
        <p>
          wynik: <code>{JSON.stringify(exampleAccessingObjectsFreeze())}</code>
        </p>
      </section>
    </article>
  );
};
