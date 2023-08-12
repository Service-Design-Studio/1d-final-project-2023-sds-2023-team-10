import React from 'react'
import AddChatModal from './AddChatModal'

describe('<AddChatModal />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<AddChatModal />)
  })
})