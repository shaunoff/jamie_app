describe("Forgot Password", () => {
  it("shows that request has been submitted", () => {
    const email = "nowayshouldIexist@example.com"

    cy.visit("/forgot-password").wait(300)

    cy.findByTestId("forgot-password-email").type(email)
    cy.findByText("Send Reset Password Instructions").click()

    cy.findByText("Request Submitted").should("exist")
  })
})
