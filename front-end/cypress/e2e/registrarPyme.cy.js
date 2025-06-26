describe('RegisterPymePage - Validaciones de formulario', () => {
  beforeEach(() => {
    // Simular userId en localStorage
    cy.window().then((win) => {
      win.localStorage.setItem('userId', 'test-user-id');
    });

    cy.visit('/registerPyme');
  });

  it('debería permitir phone vacío', () => {
    cy.get('input[name="pymeName"]').type('Empresa Test');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="address"]').type('Dirección');
    cy.get('textarea[name="description"]').type('Descripción');

    // Interceptar la solicitud para validar que se está enviando bien sin teléfono
    cy.intercept('POST', '/api/pymes/register').as('submit');

    cy.get('button[type="submit"]').click();

    // Validar que no haya errores
    cy.get('[data-testid="error-message"]').should('not.exist');

    // Validar que phone no se envía en el body o es string vacío
    cy.wait('@submit').its('request.body').should((body) => {
      expect(body.phone).to.be.oneOf(['', null, undefined]);
    });
  });
});
