import { getDomainLocale } from "next/dist/shared/lib/router/router"
import { ResetToken } from "test/factories"
import Chance from "chance"

const chance = new Chance()

describe("Reset Password", () => {
  const newPassword = "SuperDuperPassword"
  const errorMessage = "Reset password link is invalid or it has expired."
  it("creates an error if there is wrong token", () => {
    cy.visit("/reset-password?token=badResetToken").wait(1000)

    cy.findByTestId("reset-email").type(newPassword)
    cy.findByTestId("reset-email-confirm").type(newPassword)
    cy.findByText("Reset Password").click().wait(300)
    cy.findByText(errorMessage).should("exist")
  })
  it("creates an error if the token is expired", () => {
    const attrs = { email: chance.email(), type: "past", token: "badPastToken" }
    cy.task("factory", { name: "resetToken", attrs }).then((token: ResetToken) => {
      cy.visit(`/reset-password?token=${token}`).wait(300)

      cy.findByTestId("reset-email").type(newPassword)
      cy.findByTestId("reset-email-confirm").type(newPassword)
      cy.findByText("Reset Password").click().wait(300)
      cy.findByText(errorMessage).should("exist")
    })
  })
  it("signs the user in if the token is eligible", () => {
    const attrs = { email: chance.email(), type: "future", token: "goodFutureToken" }
    cy.task("factory", { name: "resetToken", attrs }).then((token: ResetToken) => {
      cy.visit(`/reset-password?token=${token}`).wait(300)

      cy.findByTestId("reset-email").type(newPassword)
      cy.findByTestId("reset-email-confirm").type(newPassword)
      cy.findByText("Reset Password").click().wait(300)

      cy.location("pathname").should("equal", "/")
      cy.findByText(/logout/i)
        .should("exist")
        .click()
        .wait(2000)
    })
  })
})
