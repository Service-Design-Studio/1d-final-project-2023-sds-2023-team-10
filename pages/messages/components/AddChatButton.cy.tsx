import React from 'react'
import AddChatButton from './AddChatButton'

describe('<AddChatButton />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<AddChatButton />)
  })
})