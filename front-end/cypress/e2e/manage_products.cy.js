describe('Panel de Productos Publicados', () => {
  beforeEach(() => {
    cy.visit('/productPublishPanel');
  });

  it('Muestra la lista de productos', () => {
    cy.contains('Panel de Productos Publicados');
    cy.get('.product-card').should('have.length.at.least', 1);
  });

  it('Abre y cierra el modal de Ver producto', () => {
    cy.get('.product-card').first().contains('Ver').click();
    cy.contains('Información del producto').should('be.visible');
    cy.get('.modal.show .btn-close').click();
    cy.contains('Información del producto').should('not.be.visible');
  });

  it('Abre y cierra el modal de Despublicar producto', () => {
    cy.get('.product-card').contains('Despublicar').should('exist').click();
    cy.contains('Despublicar Producto').should('be.visible');
    cy.contains('Cancelar').click();
    cy.contains('Información del producto').should('not.be.visible');
  });

  it('Despublica un producto', () => {
    cy.get('.product-card').contains('Despublicar').should('exist').click();
    cy.contains('Despublicar Producto').should('be.visible');
    cy.get('.modal.show .btn-primary').contains('Confirmar').click();
    cy.get('.modal.show', { timeout: 10000 }).should('not.exist');
  });

  it('Abre y cierra el modal de Administrar producto', () => {
    cy.get('.product-card').filter(':has(button:contains("Administrar producto"))').first().within(() => {
      cy.contains('Administrar producto').should('be.visible').click();
    });
    cy.contains('Actualizar Stock').should('be.visible');
    cy.get('.modal.show').contains('Cancelar').click();
    cy.contains('Información del producto').should('not.be.visible');
  });

 it('Actualiza el stock de un producto', () => {
  cy.get('.product-card').filter(':has(button:contains("Administrar producto"))').first().as('targetCard');
  cy.get('@targetCard').within(() => {
    cy.contains('Administrar producto').should('be.visible').click();
  });
  cy.contains('Actualizar Stock').should('be.visible');
  cy.get('input[type="number"]').clear().type('10');
  cy.get('.modal.show').contains('Confirmar').click();
  cy.contains('Información del producto').should('not.be.visible');
  // Espera a que el stock se actualice en la misma tarjeta
  cy.get('@targetCard').should('contain', 'Stock: 10');
});

  it('No permite stock negativo', () => {
    cy.get('.product-card').filter(':has(button:contains("Administrar producto"))').first().within(() => {
      cy.contains('Administrar producto').should('be.visible').click();
    });
    cy.get('input[type="number"]').clear().type('-5');
    cy.contains('El valor ingresado no es válido.').should('be.visible');
    cy.get('.modal.show').contains('Confirmar').should('be.disabled');
    cy.get('.modal.show').contains('Cancelar').click();
  });
});