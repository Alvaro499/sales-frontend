describe('Publicar Producto', () => {
  beforeEach(() => {
    cy.visit('/newProduct');
  });

  it('Renderiza el formulario de publicación', () => {
    cy.contains('Publicar Producto');
    cy.get('form').should('exist');
    cy.get('input[name="name"]').should('exist');
    cy.get('input[name="price"]').should('exist');
    cy.get('input[name="stock"]').should('exist');
    cy.get('select[name="category_id"]').should('exist');
    cy.get('input[name="pyme_id"]').should('exist');
  });

  it('No permite publicar con campos obligatorios vacíos', () => {
    cy.get('button[type="submit"]').click();
    cy.get('.text-danger').should('exist');
  });

  it('Publica un producto correctamente', () => {
      cy.window().then((win) => {
    cy.stub(win, 'alert').as('alert');
  });
    cy.get('input[name="name"]').type('Producto de prueba');
    cy.get('textarea[name="description"]').type('Descripción de prueba');
    cy.get('input[name="price"]').clear().type('99.99');
    cy.get('input[name="url_img"]').type('https://example.com/img.jpg');
    cy.get('input[name="stock"]').clear().type('10');
    cy.get('input[name="promotion"]').type('10%');
    cy.get('input[name="pyme_id"]').type('a1aa');
    cy.get('select[name="category_id"]').select(1); // Selecciona la primera categoría disponible
    cy.get('input[name="available"]').check();
    cy.get('button[type="submit"]').click();

  cy.get('button[type="submit"]').click();

  cy.get('@alert').should('have.been.calledWith', 'Producto publicado con éxito!');
  });
});