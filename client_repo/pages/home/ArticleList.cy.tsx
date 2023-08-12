import React from 'react'
import ArticleList from './ArticleList'

describe('<ArticleList />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ArticleList />)
  })
})