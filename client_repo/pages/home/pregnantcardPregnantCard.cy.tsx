import React from 'react'
import PregnantCard from './pregnantcard'

describe('<PregnantCard />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<PregnantCard />)
  })
})