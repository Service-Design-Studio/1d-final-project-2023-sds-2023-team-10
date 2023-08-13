import React from 'react'
import ChatProfile from './ChatProfile'

describe('<ChatProfile />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ChatProfile />)
  })
})