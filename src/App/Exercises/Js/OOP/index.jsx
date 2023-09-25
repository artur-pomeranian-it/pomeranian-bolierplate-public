export const OOP = () => {
  // Obiekty jakie do tej pory poznaliśmy
  // głównie jako key value pair
  // const obj = {
  //   speed: 0,
  // };

  // -----------------------------------------------------------------------------
  // KLASA
  // -----------------------------------------------------------------------------

  // Klasa to pewnego rodzaju szablon lub wzór do tworzenia obiektów.
  // Opisuje jakie właściwości (pola) i metody będzie miał obiekt utworzony na podstawie klasy.

  class Car {
    constructor(make, model) {
      // -----------------------------------------------------------------------------
      // THIS
      // -----------------------------------------------------------------------------
      // Słowo kluczowe this odnosi się do bieżącego obiektu, na którym jest wywoływane.
      // Wewnątrz metody this wskazuje na instancje klasy na której jest wywołana metoda.
      this.make = make;
      this.model = model;
    }

    // metoda niestatyczna
    start() {
      console.log(`${this.make} ${this.model} is starting...`);
    }
  }

  // -----------------------------------------------------------------------------
  // INSTANCJA
  // -----------------------------------------------------------------------------
  // Instancja to konkretny obiekt utworzony na podstawie określonej klasy,
  // która ma swoje własne unikalne wartości pól.
  // -----------------------------------------------------------------------------
  // OPERATOR new
  // -----------------------------------------------------------------------------
  // Operator new tworzy nową instancję klasy.
  // Tworzenie instancji za pomocą new inicjuje proces konstrukcji obiektu zgodnie z definicją klasy.
  // INSTANCJA klasy CAR
  const myToyota = new Car('Toyota', 'Corolla');
  // INSTANCJA klasy CAR
  const myAudi = new Car('Audi', 'A4');
  myToyota.start();
  myAudi.start();

  // -----------------------------------------------------------------------------
  // METODY STATYCZNE
  // -----------------------------------------------------------------------------
  // Metody statyczne to metody, które nie operują na instancji klasy, ale są zwiazane z klasą jako całością.
  // Wywołuje się je bezpośrednio na klasie, a nie na instancji klasy.
  // -----------------------------------------------------------------------------
  // POLE STATYCZNE
  // -----------------------------------------------------------------------------
  // Pole statyczne to pola, które mają wspólne wartości dla wszystkich instancji danej klasy.
  class StaticCar {
    static speed = 0;
    static start() {
      console.log("StaticCar: I'm running at speed of ", this.speed);
    }
    constructor(speed) {
      StaticCar.speed = speed;
    }
  }
  StaticCar.start();
  StaticCar.speed = 4000;
  StaticCar.start();

  // -----------------------------------------------------------------------------
  // KLASA STATYCZNA
  // -----------------------------------------------------------------------------
  // Klasa statyczna to klasa, która zawiera tylko metody statyczne i pola statyczne. np Math
  class StaticClass {
    static location = 'Poland';
    static getTime = () => new Date();
  }
  console.log(
    'StaticClass: current time in ',
    StaticClass.location,
    ' is ',
    StaticClass.getTime()
  );

  // -----------------------------------------------------------------------------
  // OPERATOR instaceof
  // -----------------------------------------------------------------------------
  // Operator instanceof sprawdza czy dany obiekt jest instancją danej klasy.

  console.log('fastCar instanceof Car:', myAudi instanceof Car);
  class NotACar {}
  const otherCar = new NotACar();
  console.log('fastCar instanceof NotACar:', myAudi instanceof NotACar);
  if (otherCar instanceof Car) {
    otherCar.start();
  }

  // -----------------------------------------------------------------------------
  // DZIEDZICZENIE
  // -----------------------------------------------------------------------------
  // klasa nadrzędna
  class AnimalParent {
    constructor(name) {
      this.name = name;
    }
    getName() {
      return this.name;
    }
  }

  // klasa podrzędna
  class Dog extends AnimalParent {
    bark() {
      return 'hał';
    }
    speak() {
      console.log(this.getName(), ' barks ', this.bark());
    }
  }
  const dog = new Dog('Reksio');
  dog.speak();

  // -----------------------------------------------------------------------------
  // POLIMORFIZM
  // -----------------------------------------------------------------------------

  // Polimorfizm to zdolność różnych klas do reagowania na te same metody w różny sposób.
  // Oznacza to, że różne obiekty mogą wykonywać te same operacje, ale w zależności od typu obiektu - zachowanie może być inne

  class AnimalPoli {
    speak() {
      console.log('Animal makes a noise');
      // throw new Error('not implemented');
    }
  }

  class DogPoli extends AnimalPoli {
    speak() {
      console.log('Dog barks');
    }
  }
  const dogPoli = new DogPoli();

  class CatPoli extends AnimalPoli {
    speak() {
      console.log('Cat mewos');
    }
  }
  const catPoli = new CatPoli();

  class CowPoli extends AnimalPoli {}
  const cowPoli = new CowPoli();

  // dogPoli.speak();
  // catPoli.speak();
  const animals = [dogPoli, catPoli, myAudi, cowPoli];
  ///--------------------
  animals.forEach((animal) => {
    if (animal instanceof AnimalPoli) {
      animal.speak();
    }
  });

  // -----------------------------------------------------------------------------
  // HERMETYZACJA
  // -----------------------------------------------------------------------------

  // Hermetyzacja odnosi się do kontrolowania dostępu do wewnętrznych składników obiektu
  // I umożliwiania dostępu tylko do tych, które powinny być publicznie dostępne.

  // -----------------------------------------------------------------------------
  //          PRIVATE VARIABLE
  // -----------------------------------------------------------------------------

  //          Właściwości i metody, do których dostęp jest ograniczony do wewnątrz obiektu, z wykorzystaniem hermetyzacji.

  // -----------------------------------------------------------------------------
  //          PUBLIC VARIABLE
  // -----------------------------------------------------------------------------

  //          Właściwości i metody, do których dostęp jest ograniczony do wewnątrz obiektu, z wykorzystaniem hermetyzacji.

  class AnimalPrivate {
    // prywatne właściwość (property)
    #name = '';
    // static private
    static #counter = 0;
    constructor(name) {
      this.#name = name;
    }
    // STATIC PUBLIC method
    getName() {
      AnimalPrivate.#counter += 1;
      console.log(
        `Name is: ${this.#name}, was called ${AnimalPrivate.#counter} times.`
      );
    }

    getStaticAge() {
      return AnimalPrivate.#counter;
    }
    // prywatna metoda
    #resetCounter() {
      AnimalPrivate.#counter = 0;
    }

    setName(newName) {
      this.#name = newName;
      this.#resetCounter();
    }
  }
  const privateAnimal = new AnimalPrivate('Reksio');
  // Private name #name is not defined.
  // privateAnimal.#name;
  privateAnimal.getName();
  privateAnimal.getName();
  privateAnimal.getName();
  privateAnimal.setName('Reksio 2');
  privateAnimal.getName();
  const otherAnimal = new AnimalPrivate('Szarik');
  otherAnimal.getName();

  // STATIC PUBLIC FIELD
  // console.log(ClassWithPrivate.publicFieldWithInitialize);

  // -----------------------------------------------------------------------------
  // HERMETYZACJA A DZIEDZICZENIE
  // -----------------------------------------------------------------------------

  // Dziedziczenie może wpływać na hermetyzację, ponieważ dziedziczące klasy uzyskują dostęp do publicznych
  // i chronionych właściwości oraz metod klasy nadrzędnej. Przy projektowaniu klasy nadrzędnej i podrzędnej,
  // ważne jest zachowanie spójności w hermetyzacji, aby uniknąć nieoczekiwanych problemów.
  // -----------------------------------------------------------------------------

  // WPŁYW NA ORGANIZACJĘ KODU:
  // -----------------------------------------------------------------------------
  // Dziedziczenie pomaga w organizacji kodu poprzez grupowanie wspólnych cech w klasach nadrzędnych
  // i umożliwiając dziedziczenie ich przez klasy podrzędne. To ułatwia zarządzanie i utrzymanie kodu,
  // ponieważ zmiany wprowadzone w klasie nadrzędnej automatycznie przenoszą się do klas podrzędnych.
  // -----------------------------------------------------------------------------

  // -----------------------------------------------------------------------------
  // PUŁAPKI I OGARNICZENIA:
  // -----------------------------------------------------------------------------
  //    Nadmierna złożoność hierarchii:
  //    Zbyt głęboka hierarchia dziedziczenia może prowadzić do skomplikowanego kodu i trudności w zrozumieniu struktury.

  //    Sztywność:
  //    Jeśli hierarchia jest źle zaprojektowana, zmiany w klasie nadrzędnej mogą wpłynąć na wiele klas podrzędnych.

  //    Rozbieżności:
  //    Dziedziczenie może prowadzić do sytuacji, w których klasy podrzędne nie pasują idealnie do koncepcji klasy nadrzędnej.

  // Dlatego też, dobrym podejściem jest stosowanie zasady kompozycji i dziedziczenia tylko tam,
  // gdzie jest to logicznie uzasadnione, a hierarchie klas są trzymane na rozsądnym poziomie.
  // -----------------------------------------------------------------------------

  // -----------------------------------------------------------------------------
  // KOPMPOZYCJA
  // -----------------------------------------------------------------------------

  // Kompozycja to proces tworzenia bardziej złożonych obiektów poprzez składanie ich z mniejszych, niezależnych komponentów.
  // W przeciwieństwie do dziedziczenia, kompozycja nie wymaga hierarchii klas, a komponenty mogą być używane wielokrotnie
  // Kompozycja skupia się na tworzeniu obiektów poprzez łączenie ich komponentów.

  // przykład z dziedziczeniem
  class AnimalInherit {
    speak() {
      console.log('Animal makes a sound');
    }
  }
  class DogInherit extends AnimalInherit {
    speak() {
      console.log('Dog barks');
    }
  }
  const dogInherit = new DogInherit();
  dogInherit.speak();

  // poprzez kompozycję
  class SpeakerComposition {
    constructor(sound) {
      this.sound = sound;
    }
    makeSound() {
      console.log(this.sound);
    }
  }
  class DogComposition {
    constructor() {
      this.speaker = new SpeakerComposition('hał');
    }
    bark() {
      this.speaker.makeSound();
    }
  }
  const dogComposition = new DogComposition();
  dogComposition.bark();
  console.log(dogComposition, dogInherit);

  // Zalety dziedziczenia:
  //    Reużywalność: Możemy dziedziczyć istniejący kod i zachowanie.
  //    Hierarchia: Pomaga tworzyć struktury klas na podstawie wspólnych cech.

  // Zalety kompozycji:
  //    Modularność: Komponenty są niezależne, co ułatwia zarządzanie i utrzymanie.
  //    Elastyczność: Możemy zmieniać i modyfikować komponenty bez wpływu na inne.
  //    Unikanie pułapek dziedziczenia: Kompozycja unika problemów związanych z głębokimi hierarchiami.

  // Kiedy używać dziedziczenia, a kiedy kompozycji
  //    Dziedziczenie: Wtedy, gdy klasy naprawdę mają relację typu nadrzędny-podrzędny, a podrzędna klasa może dziedziczyć i rozszerzać zachowanie klasy nadrzędnej.
  //    Kompozycja: Wtedy, gdy chcemy tworzyć obiekty poprzez łączenie komponentów i uniknąć związanych z dziedziczeniem pułapek.

  // Pułapki i ograniczenia związane z kompozycją:
  //    Wiele instancji: Jeśli mamy wiele instancji obiektów komponujących te same komponenty, może to prowadzić do nadmiaru pamięci.
  //    Trudniejsze śledzenie: W porównaniu do hierarchii dziedziczenia, trudniej może być zrozumieć, które komponenty są składane w obiekcie.

  // -----------------------------------------------------------------------------
  // LINKI POMOCNICZE:
  // https://javascript.info/classes

  // https://khalilstemmler.com/articles/object-oriented/programming/4-principles/
  // https://www.techtarget.com/searchapparchitecture/definition/object-oriented-programming-OOP
  // https://www.toptal.com/javascript/functional-programming-javascript
  // https://javascript.plainenglish.io/what-are-javascript-programming-paradigms-3ef0f576dfdb
  // https://www.w3schools.com/jsref/jsref_classes.asp
  // https://www.geeksforgeeks.org/polymorphism-in-javascript/
  // https://zacznijprogramowac.net/szybki-kurs-javascript/dziedziczenie-w-javascript/
  // https://hackernoon.com/inheritance-vs-composition-in-javascript
  // https://kursjs.pl/kurs/obiekty/obiekty-enkapsulacja
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes?retiredLocale=pl
  // https://www.geeksforgeeks.org/differences-between-functional-components-and-class-components/

  //   ZADANIE 1.
  //   Stworzymy klasę komputera z poniższymi właściwościami:
  //         prywatną zmienną (ulubione słowo) - faveWord = "I compute!"
  //         prywatną metodę - add(x: number, y: number) - która zwraca sumę x i y
  //         publiczną metodę compute - która przyjmuje 3 argumenty: 2 liczby, które chcemy do siebie dodać, oraz
  //         argument typu number, który pomnoży wynik dodawania dwóch poprzednich argumentów ( wewnątrz użyć metody add )
  //         publiczną metodę introduce() - która wyprintuje ulubione słowo
  //         poużywaj metod mini komputera
  //
  class Computer {
    #faveWord = 'I compute!';

    #add(x, y) {
      return x + y;
    }

    compute(x, y, z) {
      const result = this.#add(x, y) * z;
      return result;
    }

    introduce() {
      return console.log(this.#faveWord);
    }
  }
  const myComputer = new Computer();
  console.log(myComputer.compute(1, 5, 3));
  myComputer.introduce();

  //
  //
  //   ZADANIE 2.
  //   stwórz klasę Person posiadającą metodę, która wyświetli nam komunikat
  //            introduce() => "I am a Person"
  //        następnie stwórz dwie podklasy Builder i Doctor, dziedziczące metodę i wyświetlające odpowiednio komunikat
  //            introduce() => "I am a Person", "I am also a Doctor"
  //            introduce() => "I am a Person", "I am also a Builder"
  //        następnie stwórz podklasę Doctor: Pediatrician - metoda ma wyświetlić jedynie :
  //        introduce() => "I'm a Pediatrician"
  //
  class Person {
    introduce() {
      return console.log('I am a Person');
    }
  }
  class Doctor extends Person {
    introduce() {
      super.introduce();
      console.log('----', 'I am also a Doctor');
    }
  }
  class Builder extends Person {
    introduce() {
      super.introduce();
      console.log('----', 'I am also a Builder');
    }
  }
  class Pediatrician extends Doctor {
    introduce() {
      console.log('I am also a Pediatrician');
    }
  }

  const myPerson = new Person();
  myPerson.introduce();

  const personWork = [new Doctor(), new Pediatrician(), new Builder()];
  personWork.forEach((person) => {
    console.log(person);
    person.introduce();
  });

  //   ZADANIE 3.
  //   Tworzymy samochód w podejściu kompozycyjnym!
  //     + klasa Engine
  //     + start() => "engine is turned on
  //     + stop() => "engine is turned off
  //      klasa Klaxon
  //      beep() => "BEEEP!"
  //      klasa SteeringWheel
  //      turn(direction: string) => "Skręcamy w lewo/prawo
  //      klasa GPS
  //      navigate() => wyprintuje nam losowo: "turn right", "turn left", "drive straight"
  //      stwórz klasę Car, która posiada metody: start, stop, beep, turn, navigate
  //      w klasie Car powywołuj metody poszczególnych części auta

  // -----------------------------------------------------------------------------
  class Engine {
    start() {
      return 'engine is turned on';
    }
    stop() {
      return 'engine is turned off';
    }
  }

  class Klaxon {
    beep() {
      return 'BEEEP';
    }
  }

  class SteeringWheel {
    turn(direction) {
      return `Turning ${direction}`;
    }
  }

  class GPS {
    navigate() {
      const directions = ['turn right', 'turn left', 'drive straight'];
      const randomIndex = Math.floor(Math.random() * directions.length);

      return directions[randomIndex];
    }
  }

  class CarExercise {
    constructor() {
      this.engine = new Engine();
      this.klaxon = new Klaxon();
      this.steeringWheel = new SteeringWheel();
      this.gps = new GPS();
    }

    start() {
      return this.engine.start();
    }

    stop() {
      return this.engine.stop();
    }

    beep() {
      return this.klaxon.beep();
    }

    navigate() {
      return this.gps.navigate();
    }

    turn(direction) {
      return this.steeringWheel.turn(direction);
    }
  }

  // -----------------------------------------------------------------------------
  const myCar = new CarExercise();
  console.log(myCar.start());
  console.log(myCar.beep());
  console.log(myCar.navigate());
  console.log(myCar.navigate());
  console.log(myCar.navigate());
  console.log(myCar.turn('left'));
  console.log(myCar.turn('right'));
  console.log(myCar.stop());
  // -----------------------------------------------------------------------------

  return (
    <div>
      <h1>Klasy, OOP</h1>
      <h2>Paradygmaty programowania</h2>
      <p>programowanie strukturalne, funkcjonalne i obiektowe</p>
      <h2>Object Oriented Programming </h2>
      <p>
        cechy OOP: abstrakcja, hermetyzacja, polimorfizm, dziedziczenie,
        kompozycja
      </p>
      <h2>Przykłady powyżej</h2>
    </div>
  );
};
