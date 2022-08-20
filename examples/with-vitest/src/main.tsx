import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ApolloProvider } from '@apollo/client'
import { client } from './ApolloClient'
import './index.css'

const setup = async () => {
  // Start the mocking conditionally.
  if (process.env.NODE_ENV === 'development') {
    const { worker } = await import('./mocks/browser')
    worker.start()
  }

  return Promise.resolve
}

setup().then(() =>
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </React.StrictMode>,
  ),
)
