import React from 'react'
import NotificationsPanel from './NotificationsPanel'

describe('<NotificationsPanel />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<NotificationsPanel />)
  })
})