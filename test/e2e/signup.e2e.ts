describe("Signup", () => {
  it("creates new account", () => {
    const attrs = { email: "blitz@example.com", password: "superstrongpassword" }

    cy.visit("/signup").wait(300)

    cy.findByTestId("signup-email").type(attrs.email)
    cy.findByTestId("signup-password").type(attrs.password)
    cy.findAllByRole("button", { name: /create account/i })
      .click()
      .wait(300)

    cy.location("pathname").should("equal", "/")
    cy.findByText(/logout/i)
      .should("exist")
      .click()
      .wait(2000)
  })
})
