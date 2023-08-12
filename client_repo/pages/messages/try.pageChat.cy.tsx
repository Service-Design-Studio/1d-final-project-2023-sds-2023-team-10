import React from 'react'
import Chat from './try.page'

describe('<Chat />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Chat />)
  })
})