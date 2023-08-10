import React from 'react'
import MainLayout from './MainLayout'

describe('<MainLayout />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<MainLayout />)
  })
})