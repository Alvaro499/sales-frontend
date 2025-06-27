describe('Panel de Productos Publicados', () => {
  beforeEach(() => {
    window.localStorage.setItem('app_auth_pymeId', '320dd455-81eb-41bb-9612-5b2fa066be61');
    cy.visit('/productPublishPanel');
  });

  it('Muestra listado de productos con stock y disponibilidad', () => {
    cy.contains('Panel de Productos Publicados');
    cy.get('.product-card')
    .filter(':contains("Stock:")')
    .first()
    .should('exist')
    .and('contain.text', 'Stock:');
  });

  it('Abre y cierra el modal de Ver producto', () => {
    cy.get('.product-card').first().contains('Ver').click();
    cy.contains('Información del producto').should('be.visible');
    cy.get('.modal.show .btn-close').click();
    cy.contains('Información del producto').should('not.be.visible');
  });

  it('Actualiza el stock del producto', () => {
    cy.get('.product-card').filter(':has(button:contains("Administrar producto"))').first().as('targetCard');
    cy.get('@targetCard').within(() => {
      cy.contains('Administrar producto').should('be.visible').click();
    });

    cy.contains('Actualizar Stock').should('be.visible');
    cy.get('.modal.show input[name="stock"]')
      .should('have.attr', 'type', 'number')
      .and('have.attr', 'min', '0')
      .and('be.visible').clear()
      .type('10');
    cy.get('.modal.show').contains('Confirmar').click();
    cy.contains('Información del producto').should('not.be.visible');
    cy.wait(1000);
    cy.get('@targetCard').should($card => {
      expect($card.text()).to.include('Stock: 10');
    });
  });

  it('Actualiza el stock del producto a cero y lo marca como no disponible', () => {
    cy.get('.product-card').filter(':has(button:contains("Administrar producto"))')
    .filter(':contains("Stock:")').first().as('targetCard');
    cy.get('@targetCard').within(() => {
      cy.contains('Administrar producto').should('be.visible').click();
    });
    cy.contains('Actualizar Stock').should('be.visible');
    cy.get('.modal.show input[name="stock"]')
      .should('have.attr', 'type', 'number').should('be.visible').clear().type('0');
    cy.get('.modal.show').contains('Confirmar').click();
    cy.contains('Información del producto').should('not.be.visible');
    cy.get('@targetCard').should($card => {
      expect($card.text()).to.include('Stock: 0');
      expect($card.text().toLowerCase()).to.include('no disponible');
    });
  });

  it('Muestra error si se intenta actualizar el stock con valor negativo', () => {
    cy.get('.product-card').filter(':has(button:contains("Administrar producto"))')
    .filter(':contains("Stock:")').first().within(() => {
      cy.contains('Administrar producto').should('be.visible').click();
    });
    cy.get('.modal.show input[name="stock"]')
      .should('have.attr', 'type', 'number').should('be.visible').clear().type('-5');
    cy.contains('El valor ingresado no es válido.').should('be.visible');
    cy.get('.modal.show').contains('Confirmar').should('be.disabled');
    cy.get('.modal.show').contains('Cancelar').click();
  });

  it('Aplica una promoción a un producto', () => {
    cy.get('.product-card')
      .filter(':has(button:contains("Promoción"))')
      .filter(':contains("Stock:")')
      .first()
      .as('targetCard');
    cy.get('@targetCard').within(() => {
      cy.get('button').contains('Promoción').should('be.visible').click();
    });
    cy.contains('Aplicar Promoción').should('be.visible');
    cy.get('.modal.show input[name="discountValue"]').should('be.visible').clear().type('15');
    cy.get('.modal.show button[type="submit"]').should('not.be.disabled').click();
    cy.get('@targetCard').should($card => {
      expect($card.text()).to.include('Promoción actual: 15%');
    });
  });

  it('Despublica un producto', () => {
    cy.get('.product-card').contains('Despublicar').should('exist').click();
    cy.contains('Despublicar Producto').should('be.visible');
    cy.get('.modal.show .btn-primary').contains('Confirmar').click();
    cy.get('.modal.show', { timeout: 10000 }).should('not.exist');
  });
});