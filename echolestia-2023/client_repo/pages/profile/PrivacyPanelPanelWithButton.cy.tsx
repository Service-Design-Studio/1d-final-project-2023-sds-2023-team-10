import React from 'react'
import PanelWithButton from './PrivacyPanel'

describe('<PanelWithButton />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<PanelWithButton />)
  })
})