// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
// import '@testing-library/jest-dom/extend-expect'
import { beforeAll, beforeEach, afterEach, afterAll } from 'vitest'
import { client } from './ApolloClient'
import { server } from './mocks/server'
import { default as NodeFetch } from 'node-fetch'

window.fetch = NodeFetch

beforeAll(() => {
  // Enable the mocking in tests.
  server.listen()
})

beforeEach(() => {
  // Ensure Apollo cache is cleared between tests.
  // https://www.apollographql.com/docs/react/api/core/ApolloClient/#ApolloClient.clearStore
  return client.cache.reset()
})

afterEach(() => {
  // Reset any runtime handlers tests may use.
  server.resetHandlers()
})

afterAll(() => {
  // Clean up once the tests are done.
  server.close()
})
