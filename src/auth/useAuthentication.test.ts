import { renderHook } from '@testing-library/react'
import { useAuthentication } from './useAuthentication'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useSettings } from '../settings/useSettings'
import { useKeycloak } from '@react-keycloak/web'
import Keycloak from 'keycloak-js'

vi.mock('../settings/useSettings')
vi.mock('@react-keycloak/web')

describe('useAuthentication', () => {
  describe('authentication disabled', () => {
    beforeEach(() => {
      vi.mocked(useSettings).mockReturnValue({
        authEnabled: false,
        keycloakClientId: '',
        keycloakRealm: '',
        keyCloakUrl: '',
      })
    })

    it('should provide dummy authentication object', () => {
      vi.mocked(useKeycloak).mockReturnValue({
        keycloak: new Keycloak(),
        initialized: true,
      })

      const { result } = renderHook(() => useAuthentication())
      expect(result.current.initialized).toEqual(true)
      expect(result.current.authenticationEnabled).toEqual(false)
      expect(result.current.authenticated).toEqual(true)
      expect(result.current.user).toBeNull()
      expect(result.current.logout()).toBeUndefined()
      expect(result.current.accountManagement()).toBeUndefined()
      expect(result.current.userHasRole('')).toEqual(true)
    })
  })

  describe('authentication enabled', () => {
    beforeEach(() => {
      vi.mocked(useSettings).mockReturnValue({
        authEnabled: true,
        keycloakClientId: '',
        keycloakRealm: '',
        keyCloakUrl: '',
      })
    })

    it('should return correct properties from keycloak', () => {
      // Given
      const keycloak = new Keycloak()
      keycloak.authenticated = true
      keycloak.idTokenParsed = {
        name: 'name',
        sub: 'id',
      }

      vi.mocked(useKeycloak).mockReturnValue({
        keycloak: keycloak,
        initialized: true,
      })

      // When
      const { result } = renderHook(() => useAuthentication())

      // Then
      expect(result.current.initialized).toEqual(true)
      expect(result.current.authenticationEnabled).toEqual(true)
      expect(result.current.authenticated).toEqual(true)
      expect(result.current.user).toEqual({ name: 'name', id: 'id' })
    })

    it('should check if user has role', () => {
      // Given
      const keycloak = new Keycloak()
      keycloak.hasRealmRole = vi.fn(() => true)

      vi.mocked(useKeycloak).mockReturnValue({
        keycloak: keycloak,
        initialized: true,
      })

      // When
      const { result } = renderHook(() => useAuthentication())
      const userHasRole = result.current.userHasRole('role')

      // Then
      expect(userHasRole).toEqual(true)
      expect(keycloak.hasRealmRole).toHaveBeenCalledOnce()
      expect(keycloak.hasRealmRole).toHaveBeenCalledWith('role')
    })

    it('should delegate logout call to keycloak', () => {
      // Given
      const keycloak = new Keycloak()
      keycloak.logout = vi.fn()

      vi.mocked(useKeycloak).mockReturnValue({
        keycloak: keycloak,
        initialized: true,
      })

      // When
      const { result } = renderHook(() => useAuthentication())
      result.current.logout()

      // Then
      expect(keycloak.logout).toHaveBeenCalledOnce()
    })

    it('should delegate account management call to keycloak', () => {
      // Given
      const keycloak = new Keycloak()
      keycloak.accountManagement = vi.fn()

      vi.mocked(useKeycloak).mockReturnValue({
        keycloak: keycloak,
        initialized: true,
      })

      // When
      const { result } = renderHook(() => useAuthentication())
      result.current.accountManagement()

      // Then
      expect(keycloak.accountManagement).toHaveBeenCalledOnce()
    })
  })
})
