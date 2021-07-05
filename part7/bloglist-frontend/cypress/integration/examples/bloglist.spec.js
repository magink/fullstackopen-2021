describe('Bloglist app', function() {
  let user
  beforeEach(function(){
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    user = {
      name: 'Testa Testington',
      username: 'terminatorXx',
      password: 'dsgfh2332q4df',
    }
    cy.request('POST', 'http://localhost:3000/api/users', user)
    cy.visit('http://localhost:3000/')
  })
  it('login is form is visible by default', function() {
    cy.contains('Log in to application')
    cy.contains('Login')
  })
  describe('Login', function(){
    it('success with correct credentials', function () {
      cy.get('[data-cy=login-username]')
        .type(user.username)
      cy.get('[data-cy=login-password]')
        .type(user.password)
      cy.get('[data-cy=login-button]')
        .click()
      cy.contains(`${user.username} logged in`)
      cy.contains(`${user.username} successfully logged in`)
      cy.get('[data-cy=notification]')
        .should('have.css', 'color', 'rgb(0, 128, 0)')
    })
    it('fails with wrong password', function () {
      cy.get('[data-cy=login-username]')
        .type(`${user.username}`)
      cy.get('[data-cy=login-password]')
        .type('invalidPassword123')
      cy.get('[data-cy=login-button]')
        .click()
      cy.contains('invalid username or password')
      cy.contains('Log in to application')
      cy.get('[data-cy=notification]')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
  describe('when logged in', function(){
    let blog1
    beforeEach(function() {
      cy.login({ username: user.username, password: user.password })
      blog1 = {
        title: 'Why users care about how you write code',
        author: 'Kent C Dodds',
        url: 'https://kentcdodds.com/blog/why-users-care-about-how-you-write-code'
      }
    })
    it('blog can be created', function() {
      cy.contains('new blog')
        .click()
      cy.get('[data-cy=new-blog-title]')
        .type(blog1.title)
      cy.get('[data-cy=new-blog-author]')
        .type(blog1.author)
      cy.get('[data-cy=new-blog-url]')
        .type(blog1.url)
      cy.get('[data-cy=new-blog-button]')
        .click()
      cy.contains(blog1.title)
      cy.get('[data-cy=toggle-details-button]')
        .click()
      cy.contains(blog1.author)
      cy.contains(blog1.url)
    })
    describe('when blog exist', function() {
      beforeEach(function() {
        cy.createBlog({ title: blog1.title, author: blog1.author, url: blog1.url })
        cy.get('[data-cy=toggle-details-button]')
          .click()
      })
      it('blog can be liked', function() {
        cy.contains('likes: 0')
        cy.get('[data-cy=like-button]')
          .click()
        cy.contains('likes: 1')
      })
      it('blog can be deleted by creator', function(){
        cy.get('[data-cy=delete-button]')
          .click()
        cy.get(blog1.title).should('not.exist')
      })
    })
    describe('when blogs exist from many users', function() {
      let blog2
      let blog3
      let user2
      beforeEach(function(){
        user2 = {
          name: 'Gordon Freeman',
          username: 'onefreeman',
          password: 'hlalyxisnothl3',
        }
        blog2 = {
          title: 'The State Reducer Pattern with React Hooks',
          author: 'Kent C Dodds',
          url: 'https://kentcdodds.com/blog/the-state-reducer-pattern-with-react-hooks',
          likes: 3
        }
        blog3 = {
          title: 'How to Delete in Javascript',
          author: 'MDN Web Docs',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete',
          likes: 5
        }
        cy.request('POST', 'http://localhost:3000/api/users', user2)
        cy.createBlog(blog1)
        cy.login({ username: user2.username, password: user2.password })
        cy.createBlog(blog2)
        cy.createBlog(blog3)
      })
      it('blog by another user can\'t be deleted', function() {
        cy.contains(blog1.title)
          .siblings('[data-cy=toggle-details-button]')
          .click()
        cy.get('#delete-button').should('not.exist')
      })
      it('blogs are sorted by most likes', function() {
        cy.get('[data-cy=toggle-details-button]')
          .click({ multiple: true })
        cy.get('[data-cy=blog-likes]')
          .then((likes) => {
            expect(likes[0]).contain(5)
            expect(likes[1]).contain(3)
            expect(likes[2]).contain(0)
          })
      })
    })
  })
})