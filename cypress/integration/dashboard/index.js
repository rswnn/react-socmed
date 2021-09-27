
describe(('All page'), () => {

  const API_URL = 'https://jsonplaceholder.typicode.com/';

  let user = {};
  let posts = [];
  let albums = [];
  let comments = [];
  let photos = [];

  before(() => {
    cy.visit('/');
  });

  describe(('Dashboard'), () => {
    it(('Test response users & Dashboard page'), () => {
      cy.intercept('GET', `${API_URL}users`).as('get-user');
        
      cy.wait('@get-user', { timeout: 20000 }).then(req => {
        expect(req.response.body).to.have.length(10);
        cy.get('[data-cy=card-user]').should('have.length', req.response.body.length);
        cy.get('[data-cy=title-user]').each((element, index) => {
          cy.wrap(element).should('have.text', req.response.body[index].name);
          user = req.response.body[0];
        });
      });
        
    });
        
    it(('Test Redirect to User Detail Page'), () => {
      cy.get('[data-cy=card-user]').first()
        .click()
        .then(() => {
          cy.url().should('eq', 'http://localhost:3000/user/1');
          cy.intercept('GET', `${API_URL}users/1/posts`).as('getPosts');
          cy.intercept('GET', `${API_URL}users/1/albums`).as('getAlbums');
        });
    
      cy.wait(['@getPosts', '@getAlbums'], { timeout: 20000 }).then(
        interceptions => {
          expect(interceptions[0].response.body).to.have.length(10);
          posts = [...interceptions[0].response.body];
          expect(interceptions[1].response.body).to.have.length(10);
          albums = [...interceptions[1].response.body];
        }
      );
      cy.get('[data-cy=full-name]').should('have.text', user.name);
      cy.get('[data-cy=user-name]').should('have.text', user.username);
      cy.get('[data-cy=user-email]').should('have.text', user.email);
      cy.get('[data-cy=user-phone]').should('have.text', user.phone);
      cy.get('[data-cy=user-website]').should('have.text', user.website);
      cy.get('[data-cy=user-address]').should('have.text', `${user.address.street} ${user.address.suite} ${user.address.city} ${user.address.zipcode}`);
      cy.get('[data-cy=user-company]').should('have.text', `${user.company.name} ${user.company.catchPhrase} ${user.company.bs}`);
        
    });

  });

  describe(('User Detail'), () => {
    const testType = 'hello';
    it(('Check posts'), () => {
      cy.get('[data-cy=collapsible]').should('have.length', posts.length);
    });

    it(('Check content posts'), () => {
      cy.wrap(posts).each((_, index) => {
        cy.get('[data-cy=header-post]').eq(index)
          .should('have.text', posts[index].title);
        cy.get('[data-cy=content-post]').eq(index)
          .should('have.text', posts[index].body);
      });
    });

    it(('Add Post'), () => {
      cy.get('[data-cy=add-post]').click();
      cy.get('input[name="title"]').should('have.value', '')
        .type(testType);
      cy.get('textarea[name="body"]').should('have.value', '')
        .type(testType);
      cy.intercept('POST', `${API_URL}posts`).as('addPost');
      cy.get('.btn').should('be.enabled')
        .click();
      cy.wait('@addPost', { timeout: 20000 }).then(response => {
        expect(response.response.body.title).to.include(testType);
        expect(response.response.body.body).to.include(testType);
        cy.get('[data-cy=header-post]').first()
          .should('have.text', response.response.body.title);
        cy.get('[data-cy=content-post]').first()
          .should('have.text', response.response.body.body);
      });
    });

    it(('Edit Post'), () => {
      cy.get('#icon-dot').first()
        .click();
      cy.get('#icon-edit').first()
        .click();
      cy.get('input[name="title"]').should('have.value', testType)
        .type('bandung');
      cy.get('textarea[name="body"]').should('have.value', testType)
        .type('jakarta');
      cy.intercept('PUT', `${API_URL}posts`).as('editPost');
      cy.get('.btn').should('be.enabled')
        .click();
      cy.wait(3000, { timeout: 20000 }).then(response => {
        cy.get('[data-cy=header-post]').first()
          .should('have.text', testType + 'bandung');
        cy.get('[data-cy=content-post]').first()
          .should('have.text', testType + 'jakarta');
      });
    });

    it(('Delete Post'), () => {
      cy.get('#icon-dot').first()
        .click();
      cy.get('#icon-delete').first()
        .click();
      cy.intercept('DELETE', `${API_URL}posts/2`).as('deletePost');
      cy.get('.btn').should('be.enabled')
        .click();

      cy.wait(2000, { timeout: 20000 }).then(response => {
        cy.get(`#${testType}bandung`).should('not.exist');
      });
    });

    it(('Show Comment'), () => {
      cy.intercept('GET', `${API_URL}posts/1/comments`).as('getComments');
      cy.get('[data-cy=show-comment]').first()
        .click();
      cy.wait('@getComments').then(response => {
        expect(response.response.body).to.have.length(5);
        cy.wrap([...response.response.body]).each((_, index) => {
          cy.get('[data-cy=header-post-child]').eq(index)
            .should('have.text', response.response.body[index].name);
          cy.get('[data-cy=subheader-post-child]').eq(index)
            .should('have.text', response.response.body[index].email);
          cy.get('[data-cy=content-post-child]').eq(index)
            .should('have.text', response.response.body[index].body);
        });
      });
    });
    it(('Add Comment'), () => {
      cy.get('[data-cy=add-comment]').first()
        .click();
      cy.get('input[name="name"]').should('have.value', '')
        .type(testType);
      cy.get('input[name="email"]').should('have.value', '')
        .type(testType);
      cy.get('textarea[name="body"]').should('have.value', '')
        .type(testType);
      cy.get('.btn').should('be.enabled')
        .click();
      cy.get('[data-cy=header-post-child]').first()
        .should('have.text', testType);
    });

    it(('Edit Comment'), () => {
      cy.get('#icon-dot-child').first()
        .click();
      cy.get('#icon-edit-child').first()
        .click();
      cy.get('input[name="name"]').should('have.value', testType)
        .type('bandung');
      cy.get('input[name="email"]').should('have.value', testType)
        .type('bandung');
      cy.get('textarea[name="body"]').should('have.value', testType)
        .type('jakarta');
      cy.get('.btn').should('be.enabled')
        .click();
      cy.get('[data-cy=header-post-child]').first()
        .should('have.text', testType + 'bandung');
    });

    it(('Delete Comment'), () => {
      cy.get('#icon-dot-child').first()
        .click();
      cy.get('#icon-delete-child').first()
        .click();
      cy.get('.btn').should('be.enabled')
        .click();

      cy.wait(2000, { timeout: 20000 }).then(response => {
        cy.get(`#${testType}bandung-child`).should('not.exist');
      });
    });

    it(('Show Albums && redirect to list photo page'), () => {
      cy.get('.tabs > :nth-child(2) > a').click();
      cy.get('[data-cy=card-album]').should('have.length', albums.length);
      cy.wrap(albums).each((_, index) => {
        cy.get('[data-cy=title-album]').eq(index)
          .should('have.text', albums[index].title);
      });

      cy.intercept('GET', `${API_URL}albums/1/photos`).as('getPhotos');
      cy.get('[data-cy=expand-album]').first()
        .click();
      cy.url().should('eq', 'http://localhost:3000/user/1/album/1');
      cy.wait('@getPhotos').then(response => {
        expect(response.response.body).to.have.length(50);
        photos = [...response.response.body];
      });
    });

  });

  describe(('List Photo Page'), () => {
    it(('List Photo Page'), () => {
      cy.get('[data-cy=card-photo]').should('have.length', photos.length);
      cy.wrap(photos).each((_, index) => {
        cy.get('[data-cy=card-photo-title]').eq(index)
          .should('have.text', photos[index].title);
      });
    });

    it(('Show Image'), () => {
      cy.get('[data-cy=card-photo]').first()
        .click();
      cy.get('[data-cy=expanded-photo]')
        .should('exist');
    });
  });

});