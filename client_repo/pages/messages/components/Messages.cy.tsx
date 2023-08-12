import React from 'react'
import Messages from './Messages'

describe('<Messages />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Messages />)
  })
})