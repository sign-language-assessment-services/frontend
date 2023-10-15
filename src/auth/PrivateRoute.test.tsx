import { screen, waitFor } from '@testing-library/react'
import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderWithRouter } from '../testutils/renderWithRouter'
import PrivateRoute from './PrivateRoute'
import { useAuthentication } from './useAuthentication'
import { useSettings } from '../settings/useSettings'

vi.mock('./useAuthentication')
vi.mock('../settings/useSettings')

const AUTH = {
  authenticationEnabled: true,
  authenticated: true,
  initialized: true,
  logout: () => {
    return
  },
  accountManagement: () => {
    return
  },
  userHasRole: () => true,
  user: null,
}

describe('PrivateRoute', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    vi.mocked(useSettings).mockReturnValue({
      authEnabled: true,
      keycloakClientId: 'KEYCLOAK_CLIENT_ID',
      keycloakRealm: 'KEYCLOAK_REALM',
      keyCloakUrl: 'KEYCLOAK_URL',
    })
  })

  it('renders child element when user has required role', async () => {
    vi.mocked(useAuthentication).mockReturnValueOnce({
      ...AUTH,
      userHasRole: () => true,
    })

    renderWithRouter(<PrivateRoute requiredRole="role">TEST</PrivateRoute>)
    await waitFor(() => expect(screen.getByText('TEST')).toBeInTheDocument())
  })

  it('does not render children when auth is not initialized', async () => {
    vi.mocked(useAuthentication).mockReturnValueOnce({
      ...AUTH,
      initialized: false,
    })

    const { container } = renderWithRouter(<PrivateRoute requiredRole="role">TEST</PrivateRoute>)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders error modal "forbidden" when user does not have required role', async () => {
    vi.mocked(useAuthentication).mockReturnValueOnce({
      ...AUTH,
      userHasRole: () => false,
    })

    renderWithRouter(<PrivateRoute requiredRole="role">TEST</PrivateRoute>)
    await waitFor(() => expect(screen.getByText('Keine Berechtigung')).toBeInTheDocument())
  })
})
