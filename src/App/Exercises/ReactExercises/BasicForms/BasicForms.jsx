import React from 'react';
import './style.css';
import { MasterHeader } from '../../../Components/MasterHeader/MasterHeader';

export function BasicForms() {
  return (
    <div>
      <MasterHeader value="Formularz zamówienia" />
      <form className="shopping-form-container">
        <div className="form-input-container">
          <h2 className="shopping-form-heading">Zamówienie produktu</h2>
          <label htmlFor="product" className="form-paragraph-title">
            Wybierz produkt*
          </label>
          <select className="form-input" id="product">
            <option value="kurs-frontned">Kurs Frontend Developer</option>
            <option value="kurs-backend">Kurs Backend Developer</option>
          </select>

          <fieldset className="form--spacing">
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
              />
              Blik
            </label>

            <label className="checkbox-container">
              <input
                name="payment-method"
                type="radio"
                id="payment-method-paypal"
                className="radio-box"
                value="paypal"
              />
              PayPal
            </label>

            <label className="checkbox-container">
              <input
                name="payment-method"
                type="radio"
                id="payment-method-standard"
                className="radio-box"
                value="przelew-tradycyjny"
              />
              Przelew tradycyjny
            </label>
          </fieldset>

          <fieldset className="form--spacing">
            <legend className="form-paragraph-title">
              Opcje dodatkowe do zamówienia
            </legend>
            <div className="checkbox-container">
              <input
                name="ustawienie środowiska"
                type="checkbox"
                id="additional-options-env"
                className="check-box"
              />
              <label for="additional-options-env">Ustawienie środowiska</label>
            </div>
            <div className="checkbox-container">
              <input
                name="intro do GitGub"
                type="checkbox"
                id="additional-options-github"
                className="check-box"
              />
              <label for="additional-options-github">Intro do GitGub</label>
            </div>
            <div className="checkbox-container">
              <input
                name="materiały dodatkowe"
                type="checkbox"
                id="additional-options-extras"
                className="check-box"
              />
              <label for="additional-options-extras">Materiały dodatkowe</label>
            </div>
          </fieldset>
        </div>
        <div className="form-input-container">
          <h2 className="shopping-form-heading">Dane do zamówienia produktu</h2>
          <label
            htmlFor="form-delivery-fullname"
            className="form-paragraph-title"
          >
            Imię i nazwisko*
          </label>
          <input
            name="form-delivery-fullname"
            type="text"
            id="form-delivery-fullname"
            className="form-delivery-data"
            placeholder="wpisz swoje imię i nazwisko"
          />

          <label htmlFor="form-delivery-nick" className="form-paragraph-title">
            Twój pseudonim*
          </label>
          <input
            name="form-delivery-nick"
            type="text"
            id="form-delivery-nick"
            className="form-delivery-data"
            placeholder="wpisz swój pseudonim"
          />

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
            className="form-delivery-data"
            placeholder="adres, na który mamy wysłac zamówienie"
          />

          <label htmlFor="form-delivery-email" className="form-paragraph-title">
            Adres e-mail*
          </label>
          <input
            name="form-delivery-email"
            type="email"
            id="form-delivery-email"
            className="form-delivery-data"
            placeholder="jan.kowalski@gmail.com"
          />

          <label for="form-delivery-number" className="form-paragraph-title">
            Numer kontaktowy*
          </label>
          <input
            name="form-delivery-number"
            type="tel"
            id="form-delivery-number"
            className="form-delivery-data"
            placeholder="+48 888 888 888"
          />

          <label for="form-delivery-remarks" className="form-paragraph-title">
            Dodatkowe uwagi do zamówienia
          </label>
          <textarea
            name="form-delivery-remarks"
            type="text"
            id="form-delivery-remarks"
            className="form-delivery-data"
            placeholder="Jeśli masz jakieś uwagi, wpisz je tutaj..."
          />
        </div>
        <div className="form-input-container">
          <h2 className="shopping-form-heading">Zakładanie konta</h2>
          <label htmlFor="account" className="form-paragraph-title">
            Chcę założyć konto razem z zamówieniem
          </label>
          <div className="checkbox-container">
            <input
              id="create-account"
              name="account"
              type="checkbox"
              className="check-box"
            />
            <label for="create-account ">zakładam konto</label>
          </div>

          <label htmlFor="password" className="form-paragraph-title">
            Moje hasło
          </label>
          <input
            type="password"
            id="password"
            className="password-box"
            placeholder="56ggW457hh#$"
          />

          <label htmlFor="password" className="form-paragraph-title">
            Powtórz hasło:
          </label>
          <input
            type="password"
            id="password"
            className="password-box"
            placeholder="56ggW457hh#$"
          />
        </div>
        <div className="form-input-container">
          <h2 className="shopping-form-heading">Zgody i newsletter</h2>
          <div>
            <p className="form-paragraph-title">
              Realizując zamówienia, akcptujesz regulamin naszego sklepu
            </p>
            <div className="checkbox-container">
              <input type="checkbox" id="rules" className="check-box" />
              <label htmlFor="rules">akceptuję regulamin*</label>
            </div>
          </div>
          <div>
            <p className="form-paragraph-title">
              Dołącz do naszego newslettera z promocjami dla naszych klientów
            </p>
            <div className="checkbox-container">
              <input type="checkbox" id="newsletter" className="check-box" />
              <label htmlFor="newsletter">
                zapisuję się na listę mailingową
              </label>
            </div>
          </div>
        </div>
        <button type="submit" className="form-button">
          Składam zmówienie
        </button>
      </form>
    </div>
  );
}
