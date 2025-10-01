const signUpPage = require('../../pages/signUpPage');
const { faker } = require('@faker-js/faker');

describe('Sign Up', () => {
  it('Signing Up user with valid data', () => {
    const name = faker.person.firstName();
    const email = faker.internet.email();

    signUpPage.visit();
    signUpPage.clickSignupLogin();
    signUpPage.fillName(name);
    signUpPage.fillEmail(email);
    signUpPage.clickSignup();
    cy.contains('Enter Account Information').should('be.visible');
    signUpPage.fillAccountInformation(
      'password123',
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
    signUpPage.clickCreateAccount();
    cy.contains('Account Created!').should('be.visible');
  });
});
