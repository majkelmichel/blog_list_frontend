describe('Blog app', function () {
	beforeEach(function () {
		cy.request('POST', 'http://localhost:3001/api/testing/reset');
		cy.addUser({
			username: 'cypress',
			password: 'cypressSecret',
			name: 'Cypress Tester'
		});
		cy.visit('http://localhost:3000');
	});

	it('Login form is shown', function () {
		cy.get('#login-form');
	});

	describe('Login', function () {
		beforeEach(function () {
			cy.visit('http://localhost:3000');
		})
		it('succeeds with correct credentials', function () {
			cy.get('#username').type('cypress');
			cy.get('#password').type('cypressSecret');
			cy.get('#login-button').click();

			cy.get('html').contains(`cypress logged in`);
		});

		it('fails with wrong credentials', function () {
			cy.get('#username').type('cypress');
			cy.get('#password').type('wrongPassword');
			cy.get('#login-button').click();

			cy.get('.error').should('contain', 'wrong credentials')
				.and('have.css', 'color', 'rgb(255, 0, 0)')

			cy.get('html').should('not.contain', 'cypress loged in');
		});
	});

	describe('When logged in', function () {
		beforeEach(function () {
			cy.login({ username: 'cypress', password: 'cypressSecret'});
		});

		it('A blog can be created', function () {
			cy.contains('new blog').click();
			cy.get('#title').type('Testing blog');
			cy.get('#author').type('Cypress Tester');
			cy.get('#url').type('http://localhost:3000/placeholder');
			cy.get('#submitBlog').click();

			cy.get('html').should('contain', 'Testing blog');
		});
	});
});