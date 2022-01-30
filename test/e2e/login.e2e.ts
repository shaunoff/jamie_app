import { User } from "test/factories"

describe("Login", () => {
  describe("with an email that doesnt exist", () => {
    it("shows an error", () => {
      const email = "nowayshouldIexist@example.com"
      const password = "test1234"

      cy.visit("/login").wait(100)

      cy.findByTestId("login-email").type(email)
      cy.findByTestId("login-password").type(password)
      cy.findAllByRole("button", { name: /login/i }).click()

      cy.findByText(/invalid/i).should("exist")
    })
  })

  describe("with valid credentials", () => {
    it("logs in", () => {
      const attrs = { password: "superstrongpassword" }

      cy.visit("/login").wait(100)

      cy.task("factory", { name: "user", attrs }).then((user: User) => {
        cy.findByTestId("login-email").type(user.email)
        cy.findByTestId("login-password").type(attrs.password)
        cy.findAllByRole("button", { name: /login/i }).click()
        cy.location("pathname").should("equal", "/")
        cy.findByText(/logout/i).should("exist")
      })
    })
  })
})
