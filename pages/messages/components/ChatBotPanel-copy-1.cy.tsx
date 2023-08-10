import React from 'react'
import ChatBotPanel from './ChatBotPanel'

describe('<ChatBotPanel />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ChatBotPanel />)
  })
})