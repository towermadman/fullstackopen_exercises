describe('Blog app', function () {
	beforeEach(function () {
		cy.request('POST', 'http://localhost:3003/api/testing/reset')
		const user = {
			name: 'User Passer',
			username: 'User',
			password: 'Pass'
		}
		cy.request('POST', 'http://localhost:3003/api/users/', user)
		cy.visit('http://localhost:3000')
	})

	it('Login form is shown', function () {
		cy.contains('login')
	})

	describe('Login', function () {
		it('succeeds with correct credentials', function () {
			cy.contains('login').click()
			cy.get('#username').type('User')
			cy.get('#password').type('Pass')
			cy.get('#login-button').click()

			cy.contains('User Passer logged in')
		})

		it('fails with wrong credentials', function () {
			cy.contains('login').click()
			cy.get('#username').type('WrongUser')
			cy.get('#password').type('WrongPass')
			cy.get('#login-button').click()

			cy.get('.error')
				.should('contain', 'wrong username or password')
				.and('have.css', 'color', 'rgb(255, 132, 132)')

			cy.get('html').should('not.contain', 'User Passer logged in')
		})
	})

	describe('When logged in', function () {
		beforeEach(function () {
			cy.login({ username: 'User', password: 'Pass' })
		})

		it('A blog can be created', function () {
			cy.contains('new blog').click()

			cy.get('#title').type('Test Blog Title')
			cy.get('#author').type('Test Author')
			cy.get('#url').type('Test Url')

			cy.contains('create').click()

			cy.contains('Test Blog Title')
		})

		describe('and several blogs exists', function () {
			beforeEach(function () {
				cy.createBlog({
					title: 'Test Blog Title 1',
					author: 'Test Author 1',
					url: 'Test Url 1',
					likes: 5
				})
				cy.createBlog({
					title: 'Test Blog Title 2',
					author: 'Test Author 2',
					url: 'Test Url 2',
					likes: 2
				})
				cy.createBlog({
					title: 'Test Blog Title 3',
					author: 'Test Author 3',
					url: 'Test Url 3',
					likes: 4
				})
			})

			it('a user can like one', function () {
				cy.contains('Test Blog Title 1').as('testBlog')
				cy.get('@testBlog').contains('view').click()

				cy.get('@testBlog').contains('like').click()
				cy.get('@testBlog').should('contain', 'likes 6')
			})

			it('one of them can be deleted by the user who created it', function () {
				cy.contains('Test Blog Title 1').as('testBlog')
				cy.get('@testBlog').contains('view').click()

				cy.get('@testBlog').contains('remove').click()

				cy.get('html').should('not.contain', 'Test Blog Title 1')
			})

			it('it cannot be deleted by a user who did not create it', function () {
				const user = {
					name: 'John Smith',
					username: 'John123',
					password: 'Secret123'
				}
				cy.request('POST', 'http://localhost:3003/api/users/', user)
				cy.login({ username: 'John123', password: 'Secret123' })

				cy.contains('Test Blog Title 1').as('testBlog')
				cy.get('@testBlog').contains('view').click()

				cy.get('@testBlog')
					.find('div')
					.should('not.contain', 'remove')
			})

			it('they are all ordered by number of likes', function () {
				cy.get('.blog')
					.then(blogs => {
						blogs.map((index, blog) => {
							cy.wrap(blog).as('blog')
							cy.get('@blog').contains('view').click()
						})

						cy.wrap(blogs[0]).contains('Test Blog Title 1')
						cy.wrap(blogs[1]).contains('Test Blog Title 3')
						cy.wrap(blogs[2]).contains('Test Blog Title 2')
					})
			})
		})
	})

})