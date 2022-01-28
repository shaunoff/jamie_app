import "@testing-library/cypress/add-commands"

Cypress.Commands.add("login", ({ email, password }) => {
  return cy.request("POST", `/api/rpc/login`, {
    params: {
      email,
      password,
    },
  })
})

// In DEV testing redirects cause a redirect error which doesn't get logged in the console but
// is detected by Cypress
Cypress.on("uncaught:exception", (err, runnable, promise) => {
  if (err.name === "RedirectError") {
    return false
  }
})
