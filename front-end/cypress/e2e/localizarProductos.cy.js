describe('Buscar productos', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('GET', '/api/products/search**').as('searchProducts');
  });

  it('Encuentra productos por nombre: "bluetooth"', () => {
    cy.get('input[placeholder="Buscar productos..."]').type('bluetooth');

    cy.wait('@searchProducts');
    cy.wait(1000); // Espera adicional para visibilidad

    cy.get('.product-card')
      .should('exist')
      .and('be.visible');

    cy.contains('.product-card', 'bluetooth', { matchCase: false })
      .should('exist');

    cy.wait(1000); // Pausa antes de finalizar
  });

  it('Filtra productos por categoría', () => {
    cy.wait(1000); // Espera antes de aplicar filtro

    cy.get('select.form-select').select('2'); // Asegúrate que "2" es un value válido

    cy.wait('@searchProducts');
    cy.wait(1000); // Espera adicional para visibilidad

    cy.get('.product-card')
      .should('exist')
      .and('be.visible');

    cy.wait(1000); // Pausa antes de finalizar
  });

  it('Filtra productos por rango de precio', () => {
    cy.wait(1000); // Espera antes de comenzar

    cy.get('input[placeholder="Precio mínimo"]').type('10000');
    cy.wait(500); // Pausa entre inputs
    cy.get('input[placeholder="Precio máximo"]').type('20000');

    cy.wait('@searchProducts');
    cy.wait(1000); // Espera adicional para visibilidad

    cy.get('.product-card')
      .should('exist')
      .and('be.visible');

    cy.wait(1000); // Pausa final
  });
});