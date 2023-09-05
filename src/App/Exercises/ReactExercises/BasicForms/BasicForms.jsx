import React from 'react';
import './style.css';
import { MasterHeader } from '../../../Components/MasterHeader/MasterHeader';

export function BasicForms() {
  return (
    <div>
      <MasterHeader value="Formularz zamówienia" />
      <form className="shopping-form-container">
        <h2 className="shopping-form-heading">Zamówienie produktu</h2>
        <div className="form-input-container">
          <label htmlFor="productType" className="form-paragraph-title">
            Wybierz produkt*
          </label>
          <select className="product-select" id="productType">
            <option value="frontned">Kurs Frontend Developer</option>
            <option value="backend">Kurs Backend Developer</option>
            <option value="ux_ui">Kurs UX/UI</option>
          </select>
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
            />
            przelew tradycyjny
          </label>
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
            />
            <label htmlFor="additional-options-github">intro do GitGub</label>
          </div>
          <div className="checkbox-container">
            <input
              name="materiały dodatkowe"
              type="checkbox"
              id="additional-options-extras"
              className="check-box"
            />
            <label htmlFor="additional-options-extras">
              materiały dodatkowe
            </label>
          </div>
        </fieldset>

        <fieldset className="form-input-container form--spacing">
          <legend className="form-paragraph-title">
            Dane do zamówienia produktu
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
          />

          <label htmlFor="form-delivery-nick" className="form-paragraph-title">
            Twój pseudonim*
          </label>
          <input
            name="form-delivery-nick"
            type="text"
            id="form-delivery-nick"
            className="form-input-field"
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
            className="form-input-field"
            placeholder="adres, na który mamy wysłac zamówienie"
          />

          <label htmlFor="form-delivery-email" className="form-paragraph-title">
            Adres e-mail*
          </label>
          <input
            name="form-delivery-email"
            type="email"
            id="form-delivery-email"
            className="form-input-field"
            placeholder="jan.kowalski@gmail.com"
          />

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
            placeholder="+48 888 888 888"
          />

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
          />
        </fieldset>

        <fieldset className="form-input-container">
          <legend className="shopping-form-heading">Zakładanie konta</legend>
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
            <label htmlFor="create-account ">zakładam konto</label>
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

          <label htmlFor="confirm-password" className="form-paragraph-title">
            Powtórz hasło:
          </label>
          <input
            type="password"
            id="confirm-password"
            className="password-box"
            placeholder="56ggW457hh#$"
          />
        </fieldset>

        <fieldset className="form-input-container">
          <legend className="shopping-form-heading">
            <h2>Zgody i newsletter</h2>
          </legend>
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
        </fieldset>
        <button type="submit" className="form-button">
          Składam zmówienie
        </button>
      </form>
    </div>
  );
}
