import React from 'react'
import RecommendedArticle from './RecommendedArticle'

describe('<RecommendedArticle />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<RecommendedArticle />)
  })
})