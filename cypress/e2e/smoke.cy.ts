// Cypress types are assumed to be available in the Cypress test environment.
// Remove redundant global declarations to fix redeclaration errors.

describe('AuraOS Smoke Test', () => {
  const testUser = {
    email: `test-${Date.now()}@example.com`,
    password: 'password123',
    phone: '1234567890'
  };

  it('successfully registers a new user, logs out, and logs back in', () => {
    // Visit the landing page
    cy.visit('/');

    // --- Registration ---
    cy.contains('Sign Up').click();
    cy.get('input[id="email-register"]').should('be.visible').type(testUser.email);
    cy.get('input[id="phone-register"]').type(testUser.phone);
    cy.get('input[id="password-register"]').type(testUser.password);
    cy.get('input[id="confirm-password-register"]').type(testUser.password);
    cy.contains('button', 'Create Account').click();

    // --- Welcome Modal ---
    cy.get('h1').contains('Welcome to AuraOS').should('be.visible');
    cy.get('input[id="name"]').type('Test User');
    cy.contains('button', 'Start First Mission').click();

    // --- Dashboard ---
    cy.get('h1').contains('Mission Control').should('be.visible');
    cy.contains('p', `Welcome, Test User.`).should('be.visible');

    // --- Logout ---
    cy.get('button[aria-label="Logout"]').click();
    cy.contains('Sign Up').should('be.visible'); // Back on landing page

    // --- Login ---
    cy.contains('Login').click();
    cy.get('input[id="email-login"]').should('be.visible').type(testUser.email);
    cy.get('input[id="password-login"]').type(testUser.password);
    cy.contains('button', 'Login').click();

    // --- Verify Login ---
    cy.get('h1').contains('Mission Control').should('be.visible');
    cy.contains('p', `Welcome, Test User.`).should('be.visible');
  });
});
