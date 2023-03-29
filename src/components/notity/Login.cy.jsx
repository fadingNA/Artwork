import Login from "@/pages/login";

describe('<Login />', () => {
  it('renders without errors', () => {
    cy.visit('http://localhost:3000/login')
  })
})