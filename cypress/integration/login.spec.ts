describe('Loginspecs', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-cy=username-input]').as('usernameInput');
    cy.get('[data-cy=password-input]').as('passwordInput');
    cy.get('[data-cy=submit-button]').as('loginButton');
  });

  it('visit login and form login visible', () => {
    cy.get('@usernameInput').should('be.visible');
    cy.get('@passwordInput').should('be.visible');
    cy.get('@loginButton').should('be.visible');
  });

  it('should display 2 error message when click login button and userName and login input are empty', () => {
    cy.get('@loginButton').click();
    cy.findAllByText('Debe informar el campo').as('errorMessage');
    cy.get('@errorMessage').should('be.length', 2);
  });

  it('should display error message when username is incorrect', () => {
    const username = 'username';
    const password = 'test';

    cy.get('@usernameInput').type(username);
    cy.get('@passwordInput').type(password);
    cy.get('@loginButton').click();


    cy.findByText('Usuario y/o password no válidos').as('errorMessage');
    cy.get('@errorMessage').should('be.visible');
  });

  it('should display error message when password is incorrect', () => {
    const username = 'admin';
    const password = 'password';

    cy.get('@usernameInput').type(username);
    cy.get('@passwordInput').type(password);
    cy.get('@loginButton').click();


    cy.findByText('Usuario y/o password no válidos').as('errorMessage');
    cy.get('@errorMessage').should('be.visible');
  });

  it('should display error message when username and password are incorrect', () => {
    const username = 'username';
    const password = 'password';

    cy.get('@usernameInput').type(username);
    cy.get('@passwordInput').type(password);
    cy.get('@loginButton').click();


    cy.findByText('Usuario y/o password no válidos').as('errorMessage');
    cy.get('@errorMessage').should('be.visible');
  });


  it('should navigate to main dashboard when correct login', () => {
    const username = 'admin';
    const password = 'test';

    cy.get('@usernameInput').type(username);
    cy.get('@passwordInput').type(password);
    cy.get('@loginButton').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/submodule-list`);
  });
});
