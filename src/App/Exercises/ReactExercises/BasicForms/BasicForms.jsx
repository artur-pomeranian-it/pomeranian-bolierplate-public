import React from 'react';
// doesn't work with react-hook-form
// import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { MasterHeader } from '../../../Components/MasterHeader/MasterHeader';
import './style.css';

/* 
  requires installation of:
  npm i react-hook-form
  npm i yup
  npm i @hookform/resolvers

 */

const schemaValidationRegex = {
  phone: /^\d{9}$/,
  password: {
    smallLetters: /[a-z]/,
    bigLetters: /[A-Z]/,
    numbers: /[0-9]/,
  },
};

const schemaValidationValues = {
  password: {
    min: 8,
  },
};

const schemaValidationMessage = {
  required: 'Pole jest wymagane',
  boolean: 'To pole musi być zaznaczone lub nie',

  email: 'Wpisz poprawny adres email',
  phone: 'Wpisz poprawny numer telefonu',
  password: {
    min: `Hasło musi mieć minimum ${schemaValidationValues.password.min} znaków`,
    smallLetters: 'Hasło musi zawierać małe litery',
    bigLetters: 'Hasło musi zawierać duże litery',
    numbers: 'Hasło musi zawierać cyfry',
    confirmPassword: 'Hasła muszą być takie same',
  },
};

const schema = yup.object().shape({
  // Zamówienie produktu
  productType: yup.string().required(schemaValidationMessage.required),
  paymentMethod: yup.string().required(schemaValidationMessage.required),
  isEnvChecked: yup.boolean(schemaValidationMessage.boolean),
  isGithubChecked: yup.boolean(schemaValidationMessage.boolean),
  isAdditionalDataChecked: yup.boolean(schemaValidationMessage.boolean),

  // Dane do realizacji zamówienia
  name: yup.string().required(schemaValidationMessage.required),
  nickname: yup.string().required(schemaValidationMessage.required),
  address: yup.string().required(schemaValidationMessage.required),
  email: yup
    .string()
    .email(schemaValidationMessage.email)
    .required(schemaValidationMessage.required),
  phone: yup
    .string()
    .matches(schemaValidationRegex.phone, schemaValidationMessage.phone)
    .required(schemaValidationMessage.required),
  description: yup.string(),

  // Zakładanie konta
  isCreatedAccountChecked: yup.boolean(schemaValidationMessage.boolean),
  password: yup.string().when('isCreatedAccountChecked', {
    is: true,
    then: () =>
      yup
        .string()
        .required(schemaValidationMessage.required)
        .min(
          schemaValidationValues.password.min,
          schemaValidationMessage.password.min
        )
        .matches(
          schemaValidationRegex.password.smallLetters,
          schemaValidationMessage.password.smallLetters
        )
        .matches(
          schemaValidationRegex.password.bigLetters,
          schemaValidationMessage.password.bigLetters
        )
        .matches(
          schemaValidationRegex.password.numbers,
          schemaValidationMessage.password.numbers
        ),
  }),

  confirmPassword: yup.string().when('isCreatedAccountChecked', {
    is: true,
    then: () =>
      yup
        .string()
        .required(schemaValidationMessage.required)
        .oneOf(
          [yup.ref('password')],
          schemaValidationMessage.password.confirmPassword
        ),
  }),

  // Zgody i newsletter
  isTermsChecked: yup
    .boolean(schemaValidationMessage.boolean)
    .oneOf([true], schemaValidationMessage.required),
  isNewsletterChecked: yup.boolean(schemaValidationMessage.boolean),
});

export function BasicForms() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log('submit', data);
  };

  // console.log(errors);

  return (
    <div>
      <MasterHeader value="Formularz zamówienia" />
      <form
        className="shopping-form-container"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-input-container">
          <h2 className="shopping-form-heading">Zamówienie produktu</h2>
          <label htmlFor="productType" className="form-paragraph-title">
            Wybierz produkt*
          </label>

          <select
            className="product-select"
            id="productType"
            {...register('productType')}
          >
            <option value="frontned">Kurs Frontend Developer</option>
            <option value="backend">Kurs Backend Developer</option>
            <option value="ux_ui">Kurs UX/UI</option>
          </select>
          <p className="form-error-mess">{errors.productType?.message}</p>
        </div>

        <fieldset className="form-input-container">
          <legend className="form-paragraph-title">
            Wybierz formę płatności*
          </legend>
          <label className="checkbox-container">
            <input
              name="payment-method"
              type="radio"
              id="payment-method-blik"
              className="radio-box"
              value="blik"
              defaultChecked
              {...register('paymentMethod')}
            />
            blik
          </label>

          <label className="checkbox-container">
            <input
              name="payment-method"
              type="radio"
              id="payment-method-paypal"
              className="radio-box"
              value="paypal"
              {...register('paymentMethod')}
            />
            paypal
          </label>

          <label className="checkbox-container">
            <input
              name="payment-method"
              type="radio"
              id="payment-method-standard"
              className="radio-box"
              value="przelew-tradycyjny"
              {...register('paymentMethod')}
            />
            przelew tradycyjny
          </label>
          <p className="form-error-mess">{errors.paymentMethod?.message}</p>
        </fieldset>

        <fieldset className="form-input-container">
          <legend className="form-paragraph-title">
            Opcje dodatkowe do zamówienia
          </legend>
          <div className="checkbox-container">
            <input
              name="ustawienie środowiska"
              type="checkbox"
              id="additional-options-env"
              className="check-box"
              {...register('isEnvChecked')}
            />
            <label htmlFor="additional-options-env">
              ustawienie środowiska
            </label>
          </div>
          <div className="checkbox-container">
            <input
              name="intro do GitGub"
              type="checkbox"
              id="additional-options-github"
              className="check-box"
              defaultChecked
              {...register('isGithubChecked')}
            />
            <label htmlFor="additional-options-github">intro do GitGub</label>
          </div>
          <div className="checkbox-container">
            <input
              name="materiały dodatkowe"
              type="checkbox"
              id="additional-options-extras"
              className="check-box"
              {...register('isAdditionalDataChecked')}
            />
            <label htmlFor="additional-options-extras">
              materiały dodatkowe
            </label>
          </div>
        </fieldset>

        <fieldset className="form-input-container">
          <legend className="form-paragraph-title">
            <h3>Dane do zamówienia produktu</h3>
          </legend>

          <label htmlFor="fullname" className="form-paragraph-title">
            Imię i nazwisko*
          </label>
          <input
            name="fullname"
            type="text"
            id="fullname"
            className="form-input-field"
            placeholder="wpisz swoje imię i nazwisko"
            defaultValue="Jan Kowalski"
            aria-invalid={errors.name ? true : false}
            {...register('name')}
          />
          <p className="form-error-mess">{errors.name?.message}</p>

          <label htmlFor="form-delivery-nick" className="form-paragraph-title">
            Twój pseudonim*
          </label>
          <input
            name="form-delivery-nick"
            type="text"
            id="form-delivery-nick"
            className="form-input-field"
            placeholder="wpisz swój pseudonim"
            defaultValue="JanKow"
            aria-invalid={errors.nickname ? true : false}
            {...register('nickname')}
          />
          <p className="form-error-mess">{errors.nickname?.message}</p>

          <label
            htmlFor="form-delivery-adress"
            className="form-paragraph-title"
          >
            Adres do wysyłki*
          </label>
          <input
            name="form-delivery-adress"
            type="text"
            id="form-delivery-adress"
            className="form-input-field"
            placeholder="adres, na który mamy wysłac zamówienie"
            defaultValue="rondo ONZ, Warszawa"
            aria-invalid={errors.address ? true : false}
            {...register('address')}
          />
          <p className="form-error-mess">{errors.address?.message}</p>

          <label htmlFor="form-delivery-email" className="form-paragraph-title">
            Adres e-mail*
          </label>
          <input
            name="form-delivery-email"
            type="email"
            id="form-delivery-email"
            className="form-input-field"
            placeholder="jan.kowalski@gmail.com"
            defaultValue="jan@gmail.com"
            aria-invalid={errors.email ? true : false}
            {...register('email')}
          />
          <p className="form-error-mess">{errors.email?.message}</p>

          <label
            htmlFor="form-delivery-number"
            className="form-paragraph-title"
          >
            Numer kontaktowy*
          </label>
          <input
            name="form-delivery-number"
            type="tel"
            id="form-delivery-number"
            className="form-input-field"
            placeholder="888888888"
            defaultValue="888888888"
            aria-invalid={errors.phone ? true : false}
            {...register('phone')}
          />
          <p className="form-error-mess">{errors.phone?.message}</p>

          <label
            htmlFor="form-delivery-remarks"
            className="form-paragraph-title"
          >
            Dodatkowe uwagi do zamówienia
          </label>
          <textarea
            name="form-delivery-remarks"
            type="text"
            id="form-delivery-remarks"
            className="form-input-field"
            placeholder="Jeśli masz jakieś uwagi, wpisz je tutaj..."
            style={{ minHeight: '4rem' }}
            aria-invalid={errors.description ? true : false}
            {...register('description')}
          />
          <p className="form-error-mess">{errors.description?.message}</p>
        </fieldset>

        <fieldset className="form-input-container">
          <legend className="shopping-form-heading">
            <h3>Zakładanie konta</h3>
          </legend>
          <span className="form-paragraph-title">
            Chcę założyć konto razem z zamówieniem
          </span>
          <label className="checkbox-container">
            <input
              name="account"
              type="checkbox"
              className="check-box"
              defaultChecked
              {...register('isCreatedAccountChecked')}
            />
            zakładam konto
          </label>

          <label htmlFor="password" className="form-paragraph-title">
            Moje hasło
          </label>
          <input
            type="password"
            id="password"
            className="password-box"
            placeholder="56ggW457hh#"
            defaultValue="56ggW457hh#"
            aria-invalid={errors.password ? true : false}
            {...register('password')}
          />
          <p className="form-error-mess">{errors.password?.message}</p>

          <label htmlFor="confirm-password" className="form-paragraph-title">
            Powtórz hasło:
          </label>
          <input
            type="password"
            id="confirm-password"
            className="password-box"
            placeholder="56ggW457hh#"
            defaultValue="56ggW457hh#"
            aria-invalid={errors.confirmPassword ? true : false}
            {...register('confirmPassword')}
          />
          <p className="form-error-mess">{errors.confirmPassword?.message}</p>
        </fieldset>

        <fieldset className="form-input-container">
          <legend className="shopping-form-heading">
            <h3>Zgody i newsletter</h3>
          </legend>
          <div>
            <p className="form-paragraph-title">
              Realizując zamówienia, akcptujesz regulamin naszego sklepu
            </p>
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="rules"
                className="check-box"
                defaultChecked
                aria-invalid={errors.isTermsChecked ? true : false}
                {...register('isTermsChecked')}
              />
              <label htmlFor="rules">akceptuję regulamin*</label>
            </div>
            <p className="form-error-mess">{errors.isTermsChecked?.message}</p>
          </div>
          <div>
            <p className="form-paragraph-title">
              Dołącz do naszego newslettera z promocjami dla naszych klientów
            </p>
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="newsletter"
                className="check-box"
                {...register('isNewsletterChecked')}
              />
              <label htmlFor="newsletter">
                zapisuję się na listę mailingową
              </label>
            </div>
          </div>
        </fieldset>
        <button type="submit" className="form-button">
          Składam zmówienie
        </button>
      </form>
    </div>
  );
}
