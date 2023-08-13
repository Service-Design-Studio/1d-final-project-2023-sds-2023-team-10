import React from 'react'
import ContactPanel from './ContactPanel'

describe('<ContactPanel />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ContactPanel />)
  })
})