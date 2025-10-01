describe('Sign Up', () => {
  it('Signing Up user filled in all mandatory fields with valid data', () => {
    cy.visit('https://courses.ultimateqa.com/users/sign_up');
    cy.get('#user[first_name]').type('John');
    cy.get('#user[last_name]').type('Doe');
    cy.get('#user[email]').type('johndoe@example.com');
    cy.get('#user[password]').type('password123');
    cy.get('#user[terms]').check();
    cy.get('button[type="submit"]').click();
    cy.url().should('not.include', '/sign_up');
  });

  it('Click on Terms and Condition hyperlink should redirect to Terms and Condition page/file', () => {
    cy.visit('https://courses.ultimateqa.com/users/sign_up');

    cy.get('a[href="/pages/terms"]').invoke('removeAttr', 'target').click();

    cy.url().should('include', '/pages/terms');
  });

  it('Click on Sign Up button without filled in any fields', () => {
    cy.visit('https://courses.ultimateqa.com/users/sign_up');
    cy.get('button[type="submit"]').click();
    cy.get('.form-error__list-item').should('contain', "First name can't be blank");
    cy.get('.form-error__list-item').should('contain', "Last name can't be blank");
    cy.get('.form-error__list-item').should('contain', "Email can't be blank");
    cy.get('.form-error__list-item').should('contain', "Password can\'t be blank");
  });

  it('Signing Up user with already registered email', () => {
    cy.visit('https://courses.ultimateqa.com/users/sign_up');
    cy.get('#user[first_name]').type('Test');
    cy.get('#user[last_name]').type('User');
    cy.get('#user[email]').type('testuser@example.com');
    cy.get('#user[password]').type('password123');
    cy.get('#user[terms]').check();
    cy.get('button[type="submit"]').click();
    cy.get('.form-error__list-item').should('contain', 'Email has already been taken');
  });

  it('Signing Up user without tick the Terms and Condition checkbox', () => {
    cy.visit('https://courses.ultimateqa.com/users/sign_up');
    cy.get('#user[first_name]').type('Test');
    cy.get('#user[last_name]').type('User');
    cy.get('#user[email]').type('anotheruser@example.com');
    cy.get('#user[password]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.get('.form-error__list-item').should('contain', 'You must agree to the terms of service');
  });

  it('Signing Up user with invalid email format', () => {
    cy.visit('https://courses.ultimateqa.com/users/sign_up');
    cy.get('#user[first_name]').type('Test');
    cy.get('#user[last_name]').type('User');
    cy.get('#user[email]').type('invalid-email');
    cy.get('#user[password]').type('password123');
    cy.get('#user[terms]').check();
    cy.get('button[type="submit"]').click();
    cy.get('.form-error__list-item').should('contain', 'Email is invalid');
  });

  it('Signing Up user filled in First Name with numeric', () => {
    cy.visit('https://courses.ultimateqa.com/users/sign_up');
    cy.get('#user[first_name]').type('12345');
    cy.get('#user[last_name]').type('User');
    cy.get('#user[email]').type('numericuser@example.com');
    cy.get('#user[password]').type('password123');
    cy.get('#user[terms]').check();
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/sign_up');
  });

  it('Signing Up user filled in Last Name with numeric', () => {
    cy.visit('https://courses.ultimateqa.com/users/sign_up');
    cy.get('#user[first_name]').type('Test');
    cy.get('#user[last_name]').type('12345');
    cy.get('#user[email]').type('numericuser2@example.com');
    cy.get('#user[password]').type('password123');
    cy.get('#user[terms]').check();
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/sign_up');
  });

  it('Signing Up user with weak password format', () => {
    cy.visit('https://courses.ultimateqa.com/users/sign_up');
    cy.get('#user[first_name]').type('Test');
    cy.get('#user[last_name]').type('User');
    cy.get('#user[email]').type('weakpassword@example.com');
    cy.get('#user[password]').type('123');
    cy.get('#user[terms]').check();
    cy.get('button[type="submit"]').click();
    cy.get('.form-error__list-item').should('contain', 'Password is too short (minimum is 6 characters)');
  });
});