import React from 'react'
import AppLayout from './AppLayout'

describe('<AppLayout />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<AppLayout />)
  })
})