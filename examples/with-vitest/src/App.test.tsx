import { ApolloProvider } from '@apollo/client'
import { render, fireEvent, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { client } from './ApolloClient'
import App from './App'

describe('App', () => {
  it('should allow a user to log in', async () => {
    render(
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>,
    )

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'johnUser' },
    })
    fireEvent.click(screen.getByText(/submit/i))

    const userId = await screen.findByTestId('userId')
    const firstName = await screen.findByTestId('firstName')
    const lastName = await screen.findByTestId('lastName')

    expect(userId.textContent).toBe('f79e82e8-c34a-4dc7-a49e-9fadc0979fda')
    expect(firstName.textContent).toContain('John')
    expect(lastName.textContent).toContain('Maverick')
  })
})
