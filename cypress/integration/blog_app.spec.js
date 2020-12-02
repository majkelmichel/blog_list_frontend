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
		});
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
				.and('have.css', 'color', 'rgb(255, 0, 0)');

			cy.get('html').should('not.contain', 'cypress loged in');
		});
	});

	describe('When logged in', function () {
		beforeEach(function () {
			cy.login({ username: 'cypress', password: 'cypressSecret' });
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

	describe('When there is a blog created', function () {
		beforeEach(function () {
			cy.login({ username: 'cypress', password: 'cypressSecret' });
			cy.createBlog({
				title: 'test blog',
				author: 'tester',
				url: 'placeholder'
			});
		});

		it('the blog is created', function () {
			cy.get('html').should('contain', 'test blog');
		});

		it('the blog can be liked', function () {
			cy.get('#blogs-container').contains('view').click();
			cy.get('#blogs-container').contains('like').click();
			cy.get('#blogs-container').contains('likes: 1');
		});

		it('the blog created by user can be deleted', function () {
			cy.get('#blogs-container').contains('view').click();
			cy.get('#blogs-container').contains('delete').click();
			cy.get('#blogs-container').should('not.contain', 'test blog');
		});
	});

	describe('When there are multiple blogs', function () {
		beforeEach(function () {
			cy.login({ username: 'cypress', password: 'cypressSecret' });
			cy.createBlog({
				title: 'test blog 1',
				author: 'tester',
				url: 'placeholder',
				likes: 20
			});
			cy.createBlog({
				title: 'test blog 2',
				author: 'tester',
				url: 'placeholder',
				likes: 25
			});
			cy.createBlog({
				title: 'test blog 3',
				author: 'tester',
				url: 'placeholder',
				likes: 10
			});
			cy.createBlog({
				title: 'test blog 4',
				author: 'tester',
				url: 'placeholder'
			});
		});

		it('blogs are sorted by likes', function () {
			let prev = Number.MAX_VALUE;
			cy.get('.likes').each(($el) => {
				expect(Boolean(Number($el.text() <= Number(prev)))).to.be.true;
				prev = Number($el.text());
			});
		});
	});
});