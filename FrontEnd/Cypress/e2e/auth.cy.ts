describe('Testing sigup functionality using fixtures', () => {
  let data: {
    firstName: string;
    lastName: string;
    email: string;
    phone_number: string;
    password: string;
  };
  before(() => {
    cy.fixture('register').then((info) => {
      data = info;
    });
  });
  it('registers a user', () => {
    cy.visit('http://localhost:4200/register');
    cy.get('[data-cy="fname-input"]').type(data.firstName);
    cy.get('[data-cy="lname-input"]').type(data.lastName);
    cy.get('[data-cy="email-input"]').type(data.email);
    cy.get('[data-cy="phone_number-input"]').type(data.phone_number);
    cy.get('[data-cy="password-input"]').type(data.password);
    cy.get('[data-cy="create-account-link"]')
      .click()
      .then((el) => {
        cy.wait(1000);
        cy.visit('http://localhost:4200/login');
        cy.location('pathname').should('not.equal', '/register');
        cy.location('pathname').should('equal', '/login');
      });
    // });
  });
});

describe('Sending requests to register user using fixtures', () => {
  beforeEach(() => {
    cy.visit('/register');
    cy.intercept('POST', ' POST http://localhost:3110/users', {
      body: {
        message: 'User registered successfully',
      },
    }).as('RequestToRegister');
  });

  it('Post request handling', () => {
    //   delayMs: 500,
    // }).as('RegisterRequest');

    cy.get('.submit').click();

    cy.wait('@RequestToRegister', { requestTimeout: 10000 }).then(
      (interception) => {
        console.log('Intercepted request:', interception.request);
        console.log('Intercepted response:', interception.response);
        expect(interception.request.body).to.exist;
      }
    );
  });
});

describe('Testing login functionality', () => {
  let data: { email: string; password: string };

  before(() => {
    cy.fixture('login').then((info) => {
      data = info;
    });
  });

  it('Login user using fixture data', () => {
    cy.visit('/login');

    cy.fixture('login.json').then((data) => {
      cy.get('[data-cy="email-link"]').type(data.email);
      cy.get('[data-cy="password-link"]').type(data.password);
      cy.get('[data-cy="submit-btn"]')
        .click()
        .then((el) => {
          cy.wait(1000);
          cy.visit('');
          cy.location('pathname').should('not.equal', '/login');
          cy.location('pathname').should('equal', '/');
        });
    });
  });
});

describe('Sending login requests without hitting the backend', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.intercept('POST', ' http://localhost:3110/users/login', {
      body: {
        message: 'Logged in successfully',
      },
    }).as('RequestToLogin');
  });

  it('Sends login requests without hitting the backend', () => {
    cy.get('[data-cy="submit-btn"]').click();

    cy.wait('@RequestToLogin', { requestTimeout: 5000 }).then(
      (interception) => {
        console.log('Intercepted request:', interception.request);
        console.log('Intercepted response:', interception.response);
        expect(interception.request.body).to.exist;
      }
    );
  });
});
