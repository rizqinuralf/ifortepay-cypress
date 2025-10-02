const signUpPage = require('../../pages/signUpPage');
const { faker } = require('@faker-js/faker');

describe('Sign Up', () => {
  it('Signing Up user with valid data', () => {
    signUpPage.signUpUser();
  });

  it('Signing Up user without filled in any fields', () => {
    const name = faker.person.firstName();
    const email = faker.internet.email();

    signUpPage.visit();
    signUpPage.clickSignupLogin();
    signUpPage.fillName(name);
    signUpPage.fillEmail(email);
    signUpPage.clickSignup();
    // Now on the account information page
    // Instead of trying to click and check for an error that is not in the DOM,
    // we can check that the input fields have the 'required' attribute.
    signUpPage.elements.passwordInput().should('have.attr', 'required');
  });
});