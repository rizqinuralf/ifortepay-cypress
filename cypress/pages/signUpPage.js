const { faker } = require('@faker-js/faker');

class SignUpPage {
  elements = {
    signupLoginLink: () => cy.get('a[href="/login"]'),
    nameInput: () => cy.get('input[data-qa="signup-name"]'),
    emailInput: () => cy.get('input[data-qa="signup-email"]'),
    signupButton: () => cy.get('button[data-qa="signup-button"]'),
    passwordInput: () => cy.get('input[data-qa="password"]'),
    daysSelect: () => cy.get('select[data-qa="days"]'),
    monthsSelect: () => cy.get('select[data-qa="months"]'),
    yearsSelect: () => cy.get('select[data-qa="years"]'),
    newsletterCheckbox: () => cy.get('#newsletter'),
    optinCheckbox: () => cy.get('#optin'),
    firstNameInput: () => cy.get('input[data-qa="first_name"]'),
    lastNameInput: () => cy.get('input[data-qa="last_name"]'),
    companyInput: () => cy.get('input[data-qa="company"]'),
    addressInput: () => cy.get('input[data-qa="address"]'),
    address2Input: () => cy.get('input[data-qa="address2"]'),
    countrySelect: () => cy.get('select[data-qa="country"]'),
    stateInput: () => cy.get('input[data-qa="state"]'),
    cityInput: () => cy.get('input[data-qa="city"]'),
    zipcodeInput: () => cy.get('input[data-qa="zipcode"]'),
    mobileNumberInput: () => cy.get('input[data-qa="mobile_number"]'),
    createAccountButton: () => cy.get('button[data-qa="create-account"]'),
    loginEmailInput: () => cy.get('input[data-qa="login-email"]'),
    loginPasswordInput: () => cy.get('input[data-qa="login-password"]'),
    loginButton: () => cy.get('button[data-qa="login-button"]'),
  };

  signUpUser() {
    const name = faker.person.firstName();
    const email = faker.internet.email();
    const password = 'password123';

    this.visit();
    this.clickSignupLogin();
    this.fillName(name);
    this.fillEmail(email);
    this.clickSignup();
    cy.contains('Enter Account Information').should('be.visible');
    this.fillAccountInformation(
      password,
      '1',
      'January',
      '2000',
      name,
      faker.person.lastName(),
      faker.company.name(),
      faker.location.streetAddress(),
      faker.location.secondaryAddress(),
      'United States',
      faker.location.state(),
      faker.location.city(),
      faker.location.zipCode(),
      faker.phone.number()
    );
    this.clickCreateAccount();
    cy.contains('Account Created!').should('be.visible');

    return { name, email, password };
  }

  visit() {
    cy.visit('https://automationexercise.com/');
  }

  clickSignupLogin() {
    this.elements.signupLoginLink().click();
  }

  fillName(name) {
    this.elements.nameInput().type(name);
  }

  fillEmail(email) {
    this.elements.emailInput().type(email);
  }

  clickSignup() {
    this.elements.signupButton().click();
  }

  fillAccountInformation(password, day, month, year, firstName, lastName, company, address, address2, country, state, city, zipcode, mobileNumber) {
    this.elements.passwordInput().type(password);
    this.elements.daysSelect().select(day);
    this.elements.monthsSelect().select(month);
    this.elements.yearsSelect().select(year);
    this.elements.newsletterCheckbox().check();
    this.elements.optinCheckbox().check();
    this.elements.firstNameInput().type(firstName);
    this.elements.lastNameInput().type(lastName);
    this.elements.companyInput().type(company);
    this.elements.addressInput().type(address);
    this.elements.address2Input().type(address2);
    this.elements.countrySelect().select(country);
    this.elements.stateInput().type(state);
    this.elements.cityInput().type(city);
    this.elements.zipcodeInput().type(zipcode);
    this.elements.mobileNumberInput().type(mobileNumber);
  }

  clickCreateAccount() {
    this.elements.createAccountButton().click();
  }

  fillLoginEmail(email) {
    this.elements.loginEmailInput().type(email);
  }

  fillLoginPassword(password) {
    this.elements.loginPasswordInput().type(password);
  }

  clickLogin() {
    this.elements.loginButton().click();
  }
}

module.exports = new SignUpPage();
