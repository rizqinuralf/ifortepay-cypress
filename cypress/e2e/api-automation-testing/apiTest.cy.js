describe('API Automation Testing', () => {
  it('should retrieve a post by ID', () => {
    cy.request('GET', 'https://jsonplaceholder.typicode.com/posts/1')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id', 1);
        expect(response.body).to.have.property('title');
        expect(response.body).to.have.property('body');
      });
  });

  it('should create a new post', () => {
    const newPost = {
      title: 'foo',
      body: 'bar',
      userId: 1,
    };

    cy.request('POST', 'https://jsonplaceholder.typicode.com/posts', newPost)
      .then((response) => {
        expect(response.status).to.eq(201); // 201 Created
        expect(response.body).to.have.property('id');
        expect(response.body).to.have.property('title', newPost.title);
        expect(response.body).to.have.property('body', newPost.body);
        expect(response.body).to.have.property('userId', newPost.userId);
      });
  });
});
