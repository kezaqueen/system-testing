/// <reference types="cypress" />

describe('CraftCrest Login – Fully Mocked (No Real Account)', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/login', (req) => {
      const { email, password } = req.body ?? {};

      if (email === 'user@craftcrest.com' && password === 'password123') {
        req.reply({
          statusCode: 200,
          body: {
            token: 'mock-jwt-12345',
            user: { email: 'user@craftcrest.com', name: 'Test User' }
          }
        });
      } else {
        req.reply({
          statusCode: 401,
          body: { message: 'Invalid email or password' }
        });
      }
    }).as('loginRequest');

    cy.visit('https://craftcrest.vercel.app/login');
    cy.viewport(1280, 720);
  });

  it('should display the login form correctly', () => {
    cy.get('h2').contains('Sign In').should('be.visible');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button[type="submit"]').contains('Sign In').should('be.visible');
  });

  it('should toggle password visibility', () => {
    cy.get('input[name="password"]').type('secret');
    cy.get('input[name="password"]').should('have.attr', 'type', 'password');

    cy.get('button[aria-label="Show password"]').click();
    cy.get('input[name="password"]').should('have.attr', 'type', 'text');

    cy.get('button[aria-label="Hide password"]').click();
    cy.get('input[name="password"]').should('have.attr', 'type', 'password');
  });

  it('should show error for invalid credentials', () => {
    cy.get('input[name="email"]').type('wrong@craftcrest.com');
    cy.get('input[name="password"]').type('wrongpass');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest').its('response.statusCode').should('eq', 401);

    cy.get('.text-red-500')
      .should('be.visible')
      .and('contain.text', 'Login failed');
  });

  it('should login successfully with mock credentials and redirect', () => {
    cy.get('input[name="email"]').type('user@craftcrest.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();

  
    cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);

 
    cy.get('.text-green-600', { timeout: 8000 })
      .should('be.visible')
      .and('contain', 'Login successful! Redirecting...');

  
    cy.url({ timeout: 10000 }).should('include', '/dashboard');

 
  });

  it('should show loading state during login', () => {
    cy.intercept('POST', '/api/login', (req) => {
      req.reply((res) => {
        res.delay(1500).send({
          statusCode: 200,
          body: { token: 'delayed-mock-token' }
        });
      });
    }).as('delayedLogin');

    cy.get('input[name="email"]').type('user@craftcrest.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    cy.get('button[type="submit"]')
      .should('be.disabled')
      .and('contain', 'Signing in...')
      .and('have.class', 'bg-gray-400');
  });
});