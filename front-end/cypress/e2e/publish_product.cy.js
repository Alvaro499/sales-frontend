describe('Publicar Producto - Escenarios de Prueba', () => {
  beforeEach(() => {
    window.localStorage.setItem('app_auth_pymeId', '320dd455-81eb-41bb-9612-5b2fa066be61');
    cy.visit('/newProduct');
  });

  it('Publica producto con datos válidos', () => {
    cy.contains('Publicar Producto');
    cy.get('form').should('exist');
    cy.get('input[name="name"]').type('Producto X');
    cy.get('textarea[name="description"]').type('Descripción de prueba');
    cy.get('input[name="price"]').clear().type('20');
    cy.get('input[name="images"]').type('https://example.com/img.jpg');
    cy.get('input[name="stock"]').clear().type('5');
    cy.get('input[name="pyme_id"]').should('be.disabled');
    cy.get('input[type="checkbox"][class="form-check-input"]').first().check();
    cy.get('input[name="available"]').check();
    cy.get('button[type="submit"]').click();
    cy.contains('¡Producto publicado!').should('be.visible');
  });

  it('El precio debe ser numérico', () => {
    cy.get('input[name="name"]').type('Producto X');
    cy.get('textarea[name="description"]').type('Descripción de prueba');
    cy.get('input[name="price"]').clear().type('abc');
    cy.get('input[name="price"]').should('have.value', ''); // El campo queda vacío si se ingresa texto no numérico
    cy.get('input[name="images"]').type('https://example.com/img.jpg');
    cy.get('input[name="stock"]').clear().type('5');
    cy.get('input[name="pyme_id"]').should('be.disabled');
    cy.get('input[type="checkbox"][class="form-check-input"]').first().check();
    cy.get('input[name="available"]').check();
    cy.get('button[type="submit"]').click();
  });

  it('Muestra error si la imagen tiene formato no permitido', () => {
    cy.get('input[name="name"]').type('Producto X');
    cy.get('textarea[name="description"]').type('Descripción de prueba');
    cy.get('input[name="price"]').clear().type('20');
    cy.get('input[name="images"]').type('https://example.com/img.txt');
    cy.get('input[name="stock"]').clear().type('5');
    cy.get('input[name="pyme_id"]').should('be.disabled');
    cy.get('input[type="checkbox"][class="form-check-input"]').first().check();
    cy.get('input[name="available"]').check();
    cy.get('button[type="submit"]').click();
    cy.contains('La imagen no cumple con las especificaciones.').should('be.visible');
  });

  it('Publica producto exitosamente con todos los campos completos', () => {
    cy.get('input[name="name"]').type('Producto Completo');
    cy.get('textarea[name="description"]').type('Descripción completa');
    cy.get('input[name="price"]').clear().type('100');
    cy.get('input[name="images"]').type('https://example.com/img.jpg');
    cy.get('input[name="stock"]').clear().type('10');
    cy.get('input[name="promotion"]').type('10');
    cy.get('input[name="pyme_id"]').should('be.disabled');
    cy.get('input[type="checkbox"][class="form-check-input"]').first().check();
    cy.get('input[name="available"]').check();
    cy.get('button[type="submit"]').click();
    cy.contains('¡Producto publicado!').should('be.visible');
  });
});