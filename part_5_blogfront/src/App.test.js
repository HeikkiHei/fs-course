import React from 'react'
import { render, waitForElement } from 'react-testing-library'
import App from './App'
jest.mock('./services/blogs')

describe('App ', () => {
  test('if no user is logged, no blogs are rendered', async () => {
    const component = render(<App />)
    component.rerender(<App />)

    await waitForElement(() => component.getByText('Please log in.'))

    expect(component.container).not.toHaveTextContent('React patterns')
  })
})
