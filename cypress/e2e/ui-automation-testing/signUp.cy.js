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
    signUpPage.elements.passwordInput().should('have.attr', 'required');
  });

  it('Signing Up user with already registered email', () => {
    // First sign up
    const user = signUpPage.signUpUser();
    cy.get('[data-qa="continue-button"]').click();

    // Log out
    cy.get('a[href="/logout"]').click();

    // Attempt to sign up again with the same email
    signUpPage.clickSignupLogin();
    signUpPage.fillName(user.name);
    signUpPage.fillEmail(user.email);
    signUpPage.clickSignup();
    cy.contains('Email Address already exist!').should('be.visible');
  });
});