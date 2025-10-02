const signUpPage = require('../../pages/signUpPage');

describe('Sign In', () => {
  let user;

  before(() => {
    // Sign up a new user before running the sign-in test
    user = signUpPage.signUpUser();
    // Click continue after account creation
    cy.get('[data-qa="continue-button"]').click();
    // Log out to ensure a clean state for the sign-in test
    cy.get('a[href="/logout"]').click();
  });

  it('should successfully sign in with the registered user', () => {
    signUpPage.visit();
    signUpPage.clickSignupLogin();
    signUpPage.fillLoginEmail(user.email);
    signUpPage.fillLoginPassword(user.password);
    signUpPage.clickLogin();

    // Add an assertion to verify successful login
    cy.contains('Logged in as ' + user.name).should('be.visible');
  });

  it('Sign In using unregistered email', () => {
    const randomEmail = `test${Date.now()}@test.com`;
    signUpPage.visit();
    signUpPage.clickSignupLogin();
    signUpPage.fillLoginEmail(randomEmail);
    signUpPage.fillLoginPassword('password');
    signUpPage.clickLogin();
    cy.contains('Your email or password is incorrect!').should('be.visible');
  });
});